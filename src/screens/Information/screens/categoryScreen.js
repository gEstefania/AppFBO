import { FlatList, Text, TouchableOpacity, View, ImageBackground} from 'react-native';
import React, { useEffect, useState } from 'react';
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/subcategoryScreen';
import { ScrollView } from 'react-native-gesture-handler';

const Category = ({route, navigation}) => {
  const color = route.params.color;
  const dataSubCategories = route.params.subCategories;
  const dataArticles = route.params.articles;
  const description = route.params.catDesc;
  const catId = route.params.catId;
  const subCatId = route.params.subCatId;

  const onButtonPress= (item) => {
    console.log('ITEM: ',item)
    if(item.type== 'article'){
      navigation.navigate("Article", {
        title: item.title,
        body: item.body,
        color: color,
        }
      )
    }
    if(item.type== 'subcategory'){
      navigation.navigate("Subcategory", {
        title: item.name,
        color: color,
        catId: catId,
        subCatId: item.id
        }
      )
    }
  }

  const renderList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onButtonPress(item)}
        style={[styles.btnArticle, {backgroundColor: color}]}
      >
        <PrimaryText color={'#fff'} style={styles.btnText}>{item.name || item.title}</PrimaryText>
      </TouchableOpacity>
    );
  };

  return(
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainContainer}>
      <PrimaryText style={styles.topicTitle}>Ayuda <Text style={{color: color}}>{route.params.title}</Text></PrimaryText>
      <ImageBackground
        resizeMode="cover"
        style={styles.imageBackground}
        source={require('../../../assets/img/FBO-bannerSocial.jpg')}>
        <SecondaryText color={'#fff'} style={styles.imageText}>{description}</SecondaryText>
      </ImageBackground>
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