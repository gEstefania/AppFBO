import { FlatList, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {PrimaryText} from '@common';
import {getDataFromCategory, getDataFromSubCategory} from '@firestore/category';
import styles from './styles/card';
import { countWords } from '../../../utils/tools';

const Card = ({title, catId, catDesc, cardColor, navigation}) => {
  const [ subCategory, setSubCategory ] = useState([]);
  const [ articles, setArticles ] = useState([]);

  useEffect(() => { 
    getData() 
  }, []);

  const getData=async()=>{
    try {
        let res = await getDataFromCategory(catId)
        //Set Subcategories:
        let subcategoryList = []
        res[0].data.forEach(doc=>{
          subcategoryList.push({id:doc.id,...doc.data(), type: 'subcategory'})
        })
        setSubCategory(subcategoryList)
        
        //Set Articles:
        let articlesList = []
        res[1].data.forEach(doc=>{
          articlesList.push({id:doc.id,...doc.data(), type: 'article'})
        })
        setArticles(articlesList)
        // console.log('ARTICULOS: ', articles)
        console.log('Datos veeeeeer: ', res[0].data);
        
    }catch(e){
        console.log('error en get data en card',e)
    }
  }

  const getSubcategoryData=async(categoryId, subCategoryId, itemName)=>{
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

      if (articlesList.length > 0) {
        navigation.navigate("Article", {
          title: itemName,
          body: articlesList[0].body,
          color: cardColor,
          }
        )
      } else {
        navigation.navigate("Subcategory", {
          title: itemName,
          color: cardColor,
          catId: catId,
          subCatId: subCategoryId
          }
        )
      }
    }catch(e){
      console.log(e)
    }
  }

  const onButtonPress= (item) => {
    // console.log('ITEM component article: ',item)
    if(item.type== 'article'){
      navigation.navigate("Article", {
        title: item.title,
        body: item.body,
        color: cardColor,
        }
      )
    }
    if(item.type== 'subcategory'){
      getSubcategoryData(catId, item.id, item.name)
    }
  }

  const renderList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onButtonPress(item)}
        style={[styles.cardView, {backgroundColor: cardColor}]}
      >
         {countWords(item.name) > 6 ? (
          <PrimaryText type={'Regular'} color={'#fff'} style={styles.cardTitle}>{ item.name.substring(0,25) || item.name.substring(0,25) }...</PrimaryText>
        ) : (
          <PrimaryText type={'Regular'} color={'#fff'} style={styles.cardTitle}>{item.title || item.name}</PrimaryText>
        )}
      </TouchableOpacity>
        
    );
  };

  return(
    <View style={styles.mainContainer}>

      <View style={styles.titleContainer}>
      <PrimaryText color={cardColor} style={styles.titleSection}>{title}</PrimaryText>
        <TouchableOpacity
          onPress={() => navigation.navigate("Category", {
            title: title,
            color: cardColor,
            subCategories: subCategory,
            articles: articles,
            catDesc: catDesc,
            catId: catId,
            subCatId: '',
            })
            }
        >
          <PrimaryText color={cardColor} style={styles.cardText}>Ver todo</PrimaryText>
        </TouchableOpacity>
      </View>
        <FlatList
          horizontal
          data={articles.concat(subCategory)}
          renderItem={renderList}
          //keyExtractor={item => item.id}
        />
    </View>
  )
}

export default Card;