import { FlatList, Text, TouchableOpacity, View, ImageBackground} from 'react-native';
import React, { useEffect, useState } from 'react';
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/subcategoryScreen';
import { ScrollView } from 'react-native-gesture-handler';
import {getDataFromSubCategory} from '@firestore/category';
import { countWords } from '../../../utils/tools';

const Category = ({route, navigation}) => {
  const color = route.params.color;
  const dataSubCategories = route.params.subCategories;
  const dataArticles = route.params.articles;
  const description = route.params.catDesc;
  const catId = route.params.catId;
  const subCatId = route.params.subCatId;

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

      // que me haga la navegacion tal cual a la categoria pero enviando un parametro extra
      if (articlesList.length > 0) {
        navigation.navigate("Topic", {
          title: itemName,
          color: color,
          catId: catId,
          subCatId: subCategoryId,
          isArticle: true,
          articles: articlesList
          }
        )
      } else {
        navigation.navigate("Subcategory", {
          title: itemName,
          color: color,
          catId: catId,
          subCatId: subCategoryId,
          isArticle: false,
          }
        )
      }
    }catch(e){
      console.log(e)
    }
  }

  const onButtonPress= (item) => {
    // console.log('ITEM: ',item)
    if(item.type== 'article'){
      navigation.navigate("Article", {
        title: item.title,
        body: item.body,
        color: color,
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
        style={[styles.btnArticle, {backgroundColor: color}]}
      >
        {countWords(item.name || item.title) > 6 ? (
          <PrimaryText color={'#fff'} style={styles.btnText}>{ item.name.substring(0,25) || item.name.substring(0,25) }...</PrimaryText>
        ) : (
          <PrimaryText color={'#fff'} style={styles.btnText}>{item.name || item.title}</PrimaryText>
        )}
      </TouchableOpacity>
    );
  };

  return(
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainContainer}>
      <PrimaryText style={styles.topicTitle}><Text style={{color: color}}>{route.params.title}</Text></PrimaryText>
      {/* <ImageBackground
        resizeMode="cover"
        style={styles.imageBackground}>
        <SecondaryText color={'#fff'} style={styles.imageText}>{description}</SecondaryText>
      </ImageBackground> */}
      <FlatList
        data={dataArticles.concat(dataSubCategories)}
        renderItem={renderList}
        //keyExtractor={item => item.id}
        style={styles.bntList}
      />
    </ScrollView>
  )
}

export default Category;