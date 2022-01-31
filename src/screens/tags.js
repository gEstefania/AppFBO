import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, useWindowDimensions } from "react-native";
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/tags';

const Tags = ({navigation}) => {
    const [selectedTags, setSelectedTags] = useState([]);
    const {width} = useWindowDimensions();

    const dataList = [
        {
            id: 1,
            name: 'Familia',
        },
        {
            id: 2,
            name: 'Salud',
        },
        {
            id: 3,
            name: 'Mente',
        },
        {
            id: 4,
            name: 'Educacion',
        },
        {
            id: 5,
            name: 'Legal',
        },
        {
            id: 6,
            name: 'Prestaciones',
        },
        {
            id: 7,
            name: 'Hermanos',
        },
        {
            id: 8,
            name: 'Sucesiones',
        },
        {
            id: 9,
            name: 'Talleres',
        },
        {
            id: 10,
            name: 'Embarazo',
        },
        {
            id: 11,
            name: 'Formacion',
        },
        {
            id: 12,
            name: 'Ayuda',
        },
        {
            id: 13,
            name: 'Laboral',
        },
        {
            id: 14,
            name: 'Movilidad',
        },
        {
            id: 15,
            name: 'Fiscal',
        },
        {
            id: 16,
            name: 'Actualidad',
        },
      ];

    const renderList = ({item, index}) => {
            const itemFound = selectedTags.find(tag => tag.id === item.id);
            return (
                <TouchableOpacity
                    onPress={() => onSelectTag(item)}
                    activeOpacity={0.8}
                    style={{
                    marginBottom: 10,
                    marginRight: index % 2 !== 0 ? 0 : 10,
                    flexGrow: 1,
                    backgroundColor:  itemFound?.selected ? 'red' : 'orange',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 10,
                    //maxWidth: width / 2 - 20,
                    width: item.name?.length <= 5 ? width / 2 - 100 : width / 2 - 30,
                    }}>
                    <PrimaryText color={'#fff'} style={{textAlign: 'center'}}>{item.name}</PrimaryText>
                </TouchableOpacity>
            );
    };

        const onSelectTag = (tag) => {
            const idxFound = selectedTags.findIndex(item => item.id === tag.id);
        
            if(idxFound >= 0) {
                setSelectedTags(prevState => prevState.filter(item => item.id !== selectedTags[idxFound].id))
            } else {
                setSelectedTags(prevState => prevState.concat({...tag, selected: true}));
            }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <SecondaryText>¿Qué te interesa?</SecondaryText>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Inicio")}
                >
                    <SecondaryText>Saltar</SecondaryText>
                </TouchableOpacity>
            </View>
            <FlatList
                data={dataList}
                contentContainerStyle={{flexGrow: 1}}
                numColumns={2}
                keyExtractor={item => item.id}
                renderItem={renderList}
            />
        </View>
    )
}

export default Tags;