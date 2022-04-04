import { FlatList, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {PrimaryText} from '@common';
import { getDataFromCategory, getDataFromSubCategory, getTopCategoryArticles } from '@firestore/category';
import styles from './styles/card';
import { countWords } from '../../../utils/tools';
import { BackgroundImage } from 'react-native-elements/dist/config';

const Card = ({title, catId, catDesc, cardColor, navigation, img}) => {
  const [ subCategory, setSubCategory ] = useState([]);
  const [ articles, setArticles ] = useState([]);

  useEffect(() => { 
    getData() 
  }, []);

  const getData=async()=>{
    try {
        let response = await getTopCategoryArticles(catId)
        setArticles(response)
        let res = await getDataFromCategory(catId)
        //Set Subcategories:
        let subcategoryList = []
        res[0].data.forEach(doc=>{
          subcategoryList.push({id:doc.id,...doc.data(), type: 'subcategory'})
        })
        setSubCategory(subcategoryList)
        
    }catch(e){
        console.log('error en get data en card',e)
    }
  }

  const getSubcategoryData=async(categoryId, subCategoryId, itemName,item)=>{
    try {
      let res = await getDataFromSubCategory(categoryId, subCategoryId)
      //Set Subcategories:
      let topicList = []
      res[0].data.forEach(doc=>{
        topicList.push({id:doc.id,...doc.data(), type: 'topic'})
      })
      // console.log('topics...: ', topicList)

      //Set Articles:
      let articlesList = []
      res[1].data.forEach(doc=>{
        articlesList.push({id:doc.id,...doc.data(), type: 'article'})
      })

      // que me haga la navegacion tal cual a la categoria pero enviando un parametro extra
      if (articlesList.length > 0) {
        navigation.navigate("Topic", {
          title: itemName,
          color: cardColor,
          catId: catId,
          subCatId: subCategoryId,
          isArticle: true,
          articles: articlesList,
          ...item
          }
        )
      } else {
        navigation.navigate("Subcategory", {
          title: itemName,
          color: cardColor,
          catId: catId,
          subCatId: subCategoryId,
          isArticle: false,
          ...item
          }
        )
      }
    }catch(e){
      console.log(e)
    }
  }

  const whereToGo = () => {
      navigation.navigate("Category", {
        title: title,
        color: cardColor,
        subCategories: subCategory,
        catDesc: catDesc,
        catId: catId,
        subCatId: '',
        img: img,
        })
  }

  const onButtonPress= (item) => {
      navigation.navigate("Article", {
        title: item.title,
        body: item.body,
        color: cardColor,
        ...item
        }
      )
  }

  const renderList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onButtonPress(item)}
        style={[styles.cardView, {backgroundColor: cardColor}]}
      >
        <BackgroundImage
          source={{uri: item.coverImage?.url}}
          style={styles.cardImage}
          imageStyle={{borderRadius: 15}}
        >
         {countWords(item.name || item.title) > 3 ? (
          <PrimaryText type={'Regular'} color={'#fff'} style={styles.cardTitle}>{ item.name?.substring(0,25) || item.title?.substring(0,25) }...</PrimaryText>
          ) : (
            <PrimaryText type={'Regular'} color={'#fff'} style={styles.cardTitle}>{item.title || item.name}</PrimaryText>
          )}
        </BackgroundImage>
      </TouchableOpacity>
        
    );
  };

  return(
    <View style={styles.mainContainer}>

      <View style={styles.titleContainer}>
      <PrimaryText color={cardColor} style={styles.titleSection}>{title}</PrimaryText>
        <TouchableOpacity
          onPress={() => whereToGo(articles)}
        >
          <PrimaryText color={'gray'} style={styles.cardText}>Ver todo</PrimaryText>
        </TouchableOpacity>
      </View>
        <FlatList
          horizontal
          data={articles}
          renderItem={renderList}
          //keyExtractor={item => item.id}
        />
    </View>
  )
}

export default Card;