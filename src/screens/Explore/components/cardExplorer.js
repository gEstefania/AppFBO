import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { PrimaryText, SecondaryText } from '@common'
import {getAllCategories, getDataFromCategory} from '@firestore/category';
import styles from './styles/cardExplorer';

const CardExplorer = () => {
  const [ category, setCategory ] = useState([]);
  const [ subCategory, setSubCategory ] = useState([]);
  const [ articles, setArticles ] = useState([]);
  const navigation = useNavigation();
  const [ colorPalette, setColorPalette ] = useState([]);

  useEffect(() => { 
    setColorPalette(
      [
        '#e55773',
        '#5f40d5',
        '#ff5f00',
        '#11b2d8',
        '#e55773',
        '#5f40d5',
        '#ff5f00',
        '#11b2d8',
      ]
    )
    getCategories()
    getData() 
  }, []);

  const getCategories=async()=>{
    try {
      let res = await getAllCategories()
      console.log('respuesta card explorer', res);
      let categoryList = []
      res.forEach(doc=>{
        categoryList.push({id:doc.id,...doc.data()})
      })
      setCategory(categoryList)
    }catch(e){
        console.log(e)
    }
  }

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

    }catch(e){
        console.log('error en get data en card',e)
    }
  }
  
  const navigateTo = () => {
    const art = articles.map(item=> item.type='article')
    console.log('art',art);
    if (art.length!==0) {
      navigation.navigate("Topic", {
        title: title,
        color: cardColor,
        articles: articles,
        catId: catId,
        subCatId: '',
        }
      )
    }
    const subs = subCategory.map(item => item.type='subcategory')
    //console.log('subs',subCategory[0].id);
    if (subs.length!==0) {
      navigation.navigate("Topic", {
        title: title,
        color: cardColor,
        subCategories: subCategory,
        catDesc: catDesc,
        catId: catId,
        //subCatId: subCategory[0].id,
        }
      )
    }
  
  }

  const renderList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigateTo()}
        style={styles.btnCard}>
        <PrimaryText color={'#fff'} style={styles.cardTitle}>{item.name}</PrimaryText>
      </TouchableOpacity>
    );
  };
  return(
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <SecondaryText color={'gray'}>Recomendado</SecondaryText>
        <TouchableOpacity
          onPress={() => navigation.navigate("Información")}
        >
          <PrimaryText color={'gray'} style={styles.cardText}>Ver todo</PrimaryText>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={category}
        renderItem={renderList}
        //keyExtractor={item => item.id}
        style={styles.cardsList}
      />
    </View>
  )
}
export default CardExplorer;