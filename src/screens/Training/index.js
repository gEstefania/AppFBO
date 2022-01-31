import { View, Image, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import styles from './styles/index';
import {PrimaryText, SecondaryText} from '@common';

const Index = ({navigation}) => {
  const dataList = [
    {
      name: 'Desde cero',
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
        onPress={() => navigation.navigate("TopMenu", { courseTitle: item.name})}
        style={styles.btnCard}
      >
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <PrimaryText style={styles.cardTitle}>{item.name}</PrimaryText>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.row}>
              <Image source={require('../../assets/img/icons/home.jpg')} style={styles.icon}/>
              <View style={styles.columnText}>
                <PrimaryText type={'Regular'} style={styles.infoText}>6 videos</PrimaryText>
              </View>
            </View>
            <View style={styles.row}>
              <Image source={require('../../assets/img/icons/home.jpg')} style={styles.icon}/>
              <View style={styles.columnText}>
                <PrimaryText type={'Regular'}  style={styles.infoText}>40 minutos</PrimaryText>
              </View>
            </View>
            <View style={styles.row}>
              <Image source={require('../../assets/img/icons/home.jpg')} style={styles.icon}/>
              <View style={styles.columnText}>
                <PrimaryText type={'Regular'}  style={styles.infoText}>2,122 inscritos</PrimaryText>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <SecondaryText>Autem vel eum iriuere dolor in hendreit in vulpurate velit</SecondaryText>
        </View>
      </TouchableOpacity>
    );
  };

  return(
    <View style={styles.mainContainer}>
      <Image/>
      <View style={styles.titleContainer}>
        <PrimaryText style={styles.title}>#Construcciones</PrimaryText>
        <SecondaryText>Ver todo</SecondaryText>
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

export default Index;