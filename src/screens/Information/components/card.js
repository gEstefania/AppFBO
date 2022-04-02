import { FlatList, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {PrimaryText} from '@common';
import {getDataFromCategory} from '@firestore/category';
import styles from './styles/card';

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
        console.log('ARTICULOS: ', articles)
        
    }catch(e){
        console.log('error en get data en card',e)
    }
  }

  const onButtonPress= (item) => {
    if(item.type== 'article'){
      navigation.navigate("Article", {
        title: item.title,
        body: item.body,
        color: cardColor,
        ...item
        }
      )
    }
    if(item.type== 'subcategory'){
      navigation.navigate("Subcategory", {
        title: item.name,
        color: cardColor,
        catId: catId,
        subCatId: item.id,
        ...item
        }
      )
    }
  }

  const renderList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onButtonPress(item)}
        style={[styles.cardView, {backgroundColor: cardColor}]}
      >
        <PrimaryText type={'Regular'} color={'#fff'} style={styles.cardTitle}>{item.title || item.name}</PrimaryText>
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
            }
          )}
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