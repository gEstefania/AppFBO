import { FlatList, Text, TouchableOpacity, View, ImageBackground} from 'react-native';
import React, { useEffect, useState } from 'react';
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/subcategoryScreen';

const Category = ({route, navigation}) => {
  const color = route.params.color;
  const dataList = route.params.data;
  const description = route.params.catDesc;
  const catId = route.params.catId;
  const subCatId = route.params.subCatId;

  const renderList = ({item}) => {
    
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Subcategory", {
          title: item.name,
          color: color,
          catId: catId,
          subCatId: item.id,
          }
        )}
        style={[styles.btnArticle, {backgroundColor: color}]}
      >
        <PrimaryText color={'#fff'} style={styles.btnText}>{item.name}</PrimaryText>
      </TouchableOpacity>
    );
  };
  return(
    <View style={styles.mainContainer}>
      <PrimaryText style={styles.topicTitle}>Ayuda <Text style={{color: color}}>{route.params.title}</Text></PrimaryText>
      <ImageBackground
      resizeMode="cover"
      style={styles.imageBackground}
      source={require('../../../assets/img/FBO-bannerSocial.jpg')}>
      <SecondaryText color={'#fff'} style={styles.imageText}>{description}</SecondaryText>
      </ImageBackground>
      <FlatList
        data={dataList}
        renderItem={renderList}
        //keyExtractor={item => item.id}
        style={styles.bntList}
      />
    </View>
  )
}

export default Category;