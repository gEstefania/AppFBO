import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { PrimaryText, SecondaryText } from '@common'
import {getAllCategories} from '@firestore/category';
import styles from './styles/cardExplorer';

const CardExplorer = () => {
  const [ category, setCategory ] = useState([]);
  const navigation = useNavigation();

  useEffect(() => { 
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

  const renderList = ({item}) => {
    return (
      <TouchableOpacity style={styles.btnCard}>
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