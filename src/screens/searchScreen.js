import React, { useEffect, useState } from 'react';
import { View, Image, TextInput } from "react-native";
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/searchScreen';
import {IconBuscar} from '@icons';

const SearchScreen = () => {
    const [searchText, setSearchText] = useState('');
    
    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <IconBuscar width={30} height={30} />
                <PrimaryText>Buscar</PrimaryText>
            </View>
            <View style={styles.shadow}></View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Busca un tema"
                    placeholderTextColor='gray'
                    style={styles.input}
                    onChangeText={text => setSearchText(text)}
                    autoCapitalize={'none'}
                    value={searchText}
                    //onSubmitEditing={() => navigation.navigate('Search', {searchText: searchText})}
                />
            </View>
            <View style={styles.resultContainer}>

            </View>
        </View>
    )
}

export default SearchScreen;