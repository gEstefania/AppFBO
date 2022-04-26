import * as React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { PrimaryText, SecondaryText } from '@common'
import styles from './styles/cardCompany';

const CardCompanies = () => {
  const navigation = useNavigation();
  const dataList = [
    {
      image: require('../../../assets/img/company_logos/fcaser-logo-new.png'),
    },
    {
      image: require('../../../assets/img/company_logos/logo_konecta.png'),
    },
    {
      image: require('../../../assets/img/company_logos/logo_academia_talent_heart.png'),
    },
    {
      image: require('../../../assets/img/company_logos/logo_fundacion_mapfre.jpeg'),
    },
    {
      image: require('../../../assets/img/company_logos/logo_telefonica.jpg'),
    },
    {
      image: require('../../../assets/img/company_logos/logo_AC_Hotels.png'),
    },
    {
      image: require('../../../assets/img/company_logos/logo_dial_cieca.png'),
    },
  ];

  const renderList = ({item}) => {
    return (
      <TouchableOpacity style={styles.btnCard}>
        <Image source={item.image} style={styles.image}/>
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