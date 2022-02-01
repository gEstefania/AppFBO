import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList, Image } from "react-native";
import { PrimaryText, SecondaryText } from '@common';
import styles from './styles/companyScreen';

const CompanyScreen = () => {
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
                <Image source={require('../../assets/img/icons/icono-app.jpg')} style={styles.image}/>
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