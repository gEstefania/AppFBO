import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/index';

const Index = () => {
    const navigation = useNavigation();
 return(
     <View style={styles.mainContainer}>
         <ImageBackground
                resizeMode="cover"
                style={styles.imageBackground}
<<<<<<< HEAD
                source={require('../../assets/img/APP-FBO-pantallaRegistrate.png')}>
=======
                source={require('../../assets/img/FBO-signin.png')}>
>>>>>>> 5796a333fb6848e209d3c843de17e5b133efa5e6
         <View style={styles.textContainer}>
             <PrimaryText style={styles.title}>Fundación</PrimaryText>
             <PrimaryText style={styles.title}>Bertín Osborne</PrimaryText>
             <SecondaryText color={'gray'} style={styles.textIntro}>Toda la Información y formación que necesitas</SecondaryText>
             <TouchableOpacity
                style={styles.btnSignUp}
                onPress={() => navigation.navigate("SignUp")}
                >
                    <PrimaryText color={'#fff'} type={'Regular'}>REGÍSTRATE</PrimaryText>
             </TouchableOpacity>
             <View style={styles.btnSingInContainer}>
                <SecondaryText color={'gray'}>¿YA TIENES CUENTA? </SecondaryText>
                <TouchableOpacity
                    onPress={() => navigation.navigate("SignIn")}
                >
                    <SecondaryText color={'skyblue'}>INICIAR SESIÓN</SecondaryText>
                </TouchableOpacity>
            </View>
         </View>
         </ImageBackground>
     </View>
 )
}

export default Index;