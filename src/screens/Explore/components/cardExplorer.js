import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ImageBackground } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { PrimaryText, SecondaryText } from '@common'
import { getTopGeneralArticles } from '../../../firestore/article';
import styles from './styles/cardExplorer';
// import ShowAlertMessage from '@components/showAlertMessage';

const CardExplorer = () => {
  // const [ category, setCategory ] = useState([]);
  const [ colorPalette, setColorPalette ] = useState([]);
  const [ topArticles, setTopArticles ] = useState([]);
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
    // getData() 
    getArticles()
  }, []);

  const getArticles = async() => {
    try {
      let getTopGeneral = await getTopGeneralArticles();
      // console.log('Los articulos>',articles)
      setTopArticles(getTopGeneral);
    } catch (e) {
      console.log('Error al traer los articulos: ',e)
    }
  }

  // const getData=async()=>{
  //   try {
  //     let res = await getAllCategories()
  //     console.log('respuesta card', res);
  //     let categoryList = []
  //     res.forEach(doc=>{
  //       categoryList.push({id:doc.id,...doc.data()})
  //     })
  //     setCategory(categoryList)
  //   }catch(e){
  //       console.log(e)
  //   }
  // }

  const renderList = ({item, index}) => {
    //console.log('item>>>', item.coverImage.url)
    return (
      <TouchableOpacity 
        style={{...styles.btnCard, backgroundColor: colorPalette[index]}}
        onPress={() => {
          // console.log('item>>>', item)
          navigation.navigate("Article", {
            title: item.title,
            body: item.body,
            color: colorPalette[index],
            ...item
            }) 
          }
          } 
        >
          <ImageBackground
            resizeMode="cover"
            source={{uri:item.coverImage?.url}}
            imageStyle={{ borderRadius: 14}}
            style={styles.backgroundImage}>
            <PrimaryText color={'#fff'} style={styles.cardTitle}>{item.title}</PrimaryText>
          </ImageBackground>
        
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
        data={topArticles}
        renderItem={renderList}
        //keyExtractor={item => item.id}
        style={styles.cardsList}
      />
    </View>
  )
}
export default CardExplorer;