import { FlatList, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {PrimaryText} from '@common';
import {getSubCategory} from '@firestore/subCategory';
import styles from './styles/card';

const Card = ({title, catId, catDesc, cardColor, navigation}) => {
  const [ subCategory, setSubCategory ] = useState([]);

  useEffect(() => { 
    getData() 
  }, []);

  const getData=async()=>{
    try {
        let res = await getSubCategory(catId)
        let subCategoryList = []
        res.forEach(doc=>{
          subCategoryList.push({id:doc.id,...doc.data()})
        })
        setSubCategory(subCategoryList)
    }catch(e){
        console.log(e)
    }
  }

  const renderList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Subcategory", {
          title: item.name,
          color: cardColor,
          catId: catId,
          subCatId: item.id
          }
        )}
        style={[styles.cardView, {backgroundColor: cardColor}]}
      >
        <PrimaryText type={'Regular'} color={'#fff'} style={styles.cardTitle}>{item.name}</PrimaryText>
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
            data: subCategory,
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
          data={subCategory}
          renderItem={renderList}
          //keyExtractor={item => item.id}
        />
    </View>
  )
}

export default Card;