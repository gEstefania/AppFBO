import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions, ImageBackground,Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/intro';

const Intro = () => {
    const { height, width } = useWindowDimensions();
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Index")
        }, 4500);

        //time()
    }, []);

    return (
        <Pressable 
            onPress={()=>navigation.navigate("Index")}
            style={styles.mainContainer}>
            <ImageBackground
                resizeMode="cover"
                imageStyle={ styles.imageBackground }
                style={{ flex: 1 }}
                source={require('../assets/img/FBO-intro.png')}>
                    <View style={styles.header}>
                        <PrimaryText color={'#fff'} type={'Regular'} style={styles.title}>Hola,</PrimaryText>
                        <PrimaryText color={'#fff'} type={'Regular'} style={styles.title}>Bienvenido a <PrimaryText color={'#fff'}>App FBO</PrimaryText></PrimaryText>
                        <SecondaryText color={'#ff5f00'} style={styles.textIntro}>Explora nuestra app y encuentra todo lo que necesitas</SecondaryText>
                    </View>
            </ImageBackground>
        </Pressable>
    )
}

export default Intro;