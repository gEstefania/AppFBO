import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList, Image } from "react-native";
import { PrimaryText, SecondaryText } from '@common';
import styles from './styles/companyScreen';

const CompanyScreen = () => {
  const dataList = [
    {
      image: require('../../assets/img/company_logos/logo_fundacion_once.jpeg'),
    },
    {
      image: require('../../assets/img/company_logos/logo_fundacion_mapfre.jpeg'),
    },
    {
      image: require('../../assets/img/company_logos/fcaser-logo-new.png'),
    },
    {
      image: require('../../assets/img/company_logos/logo_AC_Hotels.png'),
    },
    {
      image: require('../../assets/img/company_logos/logo_OZEIN.jpeg'),
    },
    {
      image: require('../../assets/img/company_logos/logo_academia_talent_heart.png'),
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
            <PrimaryText color={'gray'} style={styles.title}>Empresas Colaboradoras</PrimaryText>
            <FlatList
                data={dataList}
                numColumns={2}
                renderItem={renderList}
                //keyExtractor={item => item.id}
                style={styles.companyList}
                columnWrapperStyle={{justifyContent: 'space-between'}}
            />
        </View>
    )
}

export default CompanyScreen;