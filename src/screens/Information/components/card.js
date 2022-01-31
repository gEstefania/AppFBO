import { FlatList, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {PrimaryText} from '@common';
import styles from './styles/card';

const Card = ({title, cardColor, navigation}) => {
  const dataList = [
    {
      name: 'Conceptos básicos',
    },
    {
      name: 'Conceptos básicos',
    },
    {
      name: 'Conceptos básicos',
    },
    {
      name: 'Conceptos básicos',
    },
    {
      name: 'Conceptos básicos',
    },
  ];

  const renderList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Article", { title: item.name, color: cardColor} )}
        style={[styles.cardView, {backgroundColor: cardColor}]}
      >
        <PrimaryText type={'Regular'} color={'#fff'} style={styles.cardTitle}>{item.name}</PrimaryText>
      </TouchableOpacity>
        
    );
  };

  return(
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
      <PrimaryText style={styles.titleSection}>{title}</PrimaryText>
        <TouchableOpacity
        onPress={() => navigation.navigate("Topic", { title: title, color: cardColor, data: dataList} )}
        >
          <PrimaryText color={cardColor} style={styles.cardText}>Ver todo</PrimaryText>
        </TouchableOpacity>
      </View>
        <FlatList
          horizontal
          data={dataList}
          renderItem={renderList}
          //keyExtractor={item => item.id}
        />
    </View>
  )
}

export default Card;