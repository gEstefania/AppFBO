import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/intro';

const Intro = () => {
    const { height, width } = useWindowDimensions();
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Index")
        }, 1500);

        //time()
    }, []);

    return (
        <View style={styles.mainContainer}>
            <ImageBackground
                resizeMode="cover"
                style={[styles.imageBackground, {paddingTop: width*0.25}]}
                source={require('../assets/img/FBO-intro.png')}>
                    <View style={styles.header}>
                        <PrimaryText color={'#fff'} type={'Regular'} style={styles.title}>Hola,</PrimaryText>
                        <PrimaryText color={'#fff'} type={'Regular'} style={styles.title}>Bienvenido a <PrimaryText color={'#fff'}>App FBO</PrimaryText></PrimaryText>
                        <SecondaryText color={'#ff5f00'} style={styles.textIntro}>Explora nuestra app y encuentra todo lo que necesitas</SecondaryText>
                    </View>
            </ImageBackground>
        </View>
    )
}

export default Intro;