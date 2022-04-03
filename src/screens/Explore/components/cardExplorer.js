import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { PrimaryText, SecondaryText } from '@common'
import { getAllCategories, getDataFromCategory } from '@firestore/category';
import styles from './styles/cardExplorer';
import ShowAlertMessage from '@components/showAlertMessage';

const CardExplorer = () => {
  const [ category, setCategory ] = useState([]);
  const [ colorPalette, setColorPalette ] = useState([]);
  const navigation = useNavigation();

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
    getData() 
  }, []);

  const getData=async()=>{
    try {
      let res = await getAllCategories()
      console.log('respuesta card', res);
      let categoryList = []
      res.forEach(doc=>{
        categoryList.push({id:doc.id,...doc.data()})
      })
      setCategory(categoryList)
    }catch(e){
        console.log(e)
    }
  }

  const whereToGo = () => {
    if (articles.length > 0) {
      navigation.navigate("Topic", {
        title: title,
        color: cardColor,
        catId: catId,
        subCatId: subCategory,
        isArticle: true,
        articles: articles
        }
      )
    } else {
      navigation.navigate("Category", {
        title: title,
        color: cardColor,
        subCategories: subCategory,
        articles: articles,
        catDesc: catDesc,
        catId: catId,
        subCatId: '',
        })
    }
  }

  const getDataSubArticles=async(data)=>{
    try {
      let res = await getDataFromCategory(data.catId)
      //Set Subcategories:
      let subcategoryList = []
      res[0].data.forEach(doc=>{
        subcategoryList.push({id:doc.id,...doc.data(), type: 'subcategory'})
      })
      
      //Set Articles:
      let articlesList = []
      res[1].data.forEach(doc=>{
        articlesList.push({id:doc.id,...doc.data(), type: 'article'})
      })

        if (articlesList.length > 0) {
          navigation.navigate("Topic", {
            title: data.title,
            color: data.color,
            catId: data.catId, // realmente no necesario pero lo dejo por si acaso
            subCatId: '', // realmente no necesario ya que envio abajo la lista de articulos
            isArticle: true,
            articles: articlesList,
            }
          )
        } else {
          navigation.navigate("Category", {
            title: data.title,
            color: data.color,
            subCategories: subcategoryList,
            articles: articlesList,
            catDesc: data.catDesc,
            catId: data.catId,
            subCatId: '',
            })
        }
      
    }catch(e){
        console.log('error en get data en card',e)
        ShowAlertMessage('Error', 'Error al cargar la información')
    }
  }

  const renderList = ({item, index}) => {
    return (
      <TouchableOpacity 
        style={{...styles.btnCard, backgroundColor: colorPalette[index]}}
        onPress={() => {
          const data = {
            title: item.name,
            color: colorPalette[index],
            catId: item.id,
            catDesc: item.description,
          }
          getDataSubArticles(data)
        }}
        >
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