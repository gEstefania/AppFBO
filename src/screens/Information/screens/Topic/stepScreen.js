import { FlatList, Text, TouchableOpacity, View, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import {PrimaryText} from '@common';
import styles from './styles/stepScreen';

const StepScreen = ({route, navigation}) => {
  const color = route.params.color;
  const dataList = [
    {
      id: 1,
      name: 'Lorem ipsum',
    },
    {
      id: 2,
      name: 'Lorem ipsum',
    },
    {
      id: 3,
      name: 'Lorem ipsum',
    },
    {
      id: 4,
      name: 'Lorem ipsum',
    },
    {
      id: 5,
      name: 'Lorem ipsum',
    },
    {
      id: 6,
      name: 'Lorem ipsum',
    },
    {
      id: 7,
      name: 'Lorem ipsum',
    },
    {
      id: 8,
      name: 'Lorem ipsum',
    },
  ];

  const renderList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Post", { title: item.name, color: color} )}
        style={styles.btnStep}
      >
        <View style={[styles.circle, {backgroundColor: color}]}></View>
        <PrimaryText color={'#000'}>{item.name}</PrimaryText>
        <Image/>
      </TouchableOpacity>
    );
  };
  return(
    <View style={styles.mainContainer}>
      <View style={[styles.banner, {backgroundColor: color}]}>
        <PrimaryText color={'#fff'} style={styles.bannerTitle}>{route.params.title}</PrimaryText>
      </View>
      <FlatList
        data={dataList}
        renderItem={renderList}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default StepScreen;