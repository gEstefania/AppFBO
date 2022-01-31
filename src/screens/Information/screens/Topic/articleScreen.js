import { FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {PrimaryText} from '@common';
import styles from './styles/articleScreen';
import Colors from '@common';

const Article = ({route, navigation}) => {
  
  const color = route.params?.color || Colors.CORPORATE_ORANGE;

  const dataList = [
    {
      name: 'Lorem ipsum',
    },
    {
      name: 'Lorem ipsum',
    },
    {
      name: 'Lorem ipsum',
    },
    {
      name: 'Lorem ipsum',
    },
    {
      name: 'Lorem ipsum',
    },
    {
      name: 'Lorem ipsum',
    },
    {
      name: 'Lorem ipsum',
    },
    {
      name: 'Lorem ipsum',
    },
  ];

  const renderList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Step", { title: item.name, color: color} )}
        style={[styles.btnSteps, {backgroundColor: color,}]}
      >
        <PrimaryText color={'#fff'} style={styles.btnText}>{item.name}</PrimaryText>
      </TouchableOpacity>
    );
  };
  return(
    <View style={styles.mainContainer}>
      <PrimaryText color={color} style={styles.titleArticle}>{route.params?.title}</PrimaryText>
      <FlatList
        data={dataList}
        renderItem={renderList}
        //keyExtractor={item => item.id}
        numColumns={2}
        style={styles.btnList}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
    </View>
  )
}

export default Article;