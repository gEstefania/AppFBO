import * as React from 'react';
import { View, Text, TouchableOpacity } from "react-native"
import { FlatList } from 'react-native-gesture-handler';
import { PrimaryText, SecondaryText } from '@common'
import styles from './styles/cardExplorer';

const CardExplorer = () => {
  const dataList = [
    {
      name: 'Destacados',
    },
    {
      name: 'Etiquetas',
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
          //onPress={() => navigation.navigate("Topic")}
        >
          <PrimaryText color={'gray'} style={styles.cardText}>Ver todo</PrimaryText>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={dataList}
        renderItem={renderList}
        //keyExtractor={item => item.id}
        style={styles.cardsList}
      />
    </View>
  )
}
export default CardExplorer;