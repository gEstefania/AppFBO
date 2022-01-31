import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ImageBackground, Image } from "react-native";
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/intro';

const Intro = ({navigation}) => {
    return (
        <View style={styles.mainContainer}>
            <ImageBackground
                resizeMode="cover"
                style={styles.imageBackground}
                source={require('../assets/img/FBO-intro.jpg')}>
                    <View style={styles.header}>
                        <Image
                        style={styles.logo}
                            source={require('../assets/img/logo.png')}
                        />
                        <PrimaryText color={'#fff'} type={'Regular'} style={styles.title}>Hola,</PrimaryText>
                        <PrimaryText color={'#fff'} type={'Regular'} style={styles.title}>Bienvenido a <PrimaryText color={'#fff'}>App FBO</PrimaryText></PrimaryText>
                        <SecondaryText color={'#ff000a'} style={styles.textIntro}>Explora nuestra app y encuentra todo lo que necesitas</SecondaryText>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btnGo}>
                            <PrimaryText type={'Regular'}>¡VAMOS!</PrimaryText>
                        </TouchableOpacity>
                    </View>
                
            </ImageBackground>
        </View>
    )
}

export default Intro;