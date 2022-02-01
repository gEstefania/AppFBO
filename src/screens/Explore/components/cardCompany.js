import * as React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { PrimaryText, SecondaryText } from '@common'
import styles from './styles/cardCompany';

const CardCompanies = () => {
  const navigation = useNavigation();
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
        <Image source={require('../../../assets/img/icons/icono-app.jpg')} style={styles.image}/>
      </TouchableOpacity>
    );
  };
  return(
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <SecondaryText color={'gray'}>Empresas Colaboradoras</SecondaryText>
        <TouchableOpacity
          onPress={() => navigation.navigate("Empresas")}
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
export default CardCompanies;