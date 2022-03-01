import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, SafeAreaView } from "react-native";
import auth from '@react-native-firebase/auth';
import {unsubscribeUser} from '@firestore/user';
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/profileScreen';

const ProfileScreen = () => {

    const onUnsubscribeButtonPress = async () => {
        try {
            await unsubscribeUser()
            auth().signOut().then(() => console.log('User signed out!'));
        }catch(e){
            console.log(e)
        }
    }

    async function onLogOutButtonPress() {
        try {
            //await GoogleSignin.revokeAccess();
            //await GoogleSignin.signOut();
            auth().signOut().then(() => console.log('User signed out!'));
        } catch (error) {
            console.error(error);
        }
        
    }

    return (
        <View style={styles.mainContainer}>
            <SafeAreaView></SafeAreaView>
            <View style={styles.headerContainer}>
                <Image source={require('../assets/img/icons/home.jpg')} style={styles.headerIcon}/>
                <PrimaryText style={styles.title}>Mi perfil</PrimaryText>
            </View>
            <View style={styles.shadow}></View>
            <View style={styles.userData}>
                <View style={styles.row}>
                    <View style={styles.sectionTitle}>
                        <Image source={require('../assets/img/icons/home.jpg')} style={styles.icon}/>
                        <PrimaryText style={styles.title}>Datos</PrimaryText>
                    </View>
                    <TouchableOpacity>
                        <Image source={require('../assets/img/icons/home.jpg')} style={styles.icon}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <SecondaryText color={'gray'}>Ana Silvero</SecondaryText>
                    <SecondaryText color={'gray'}>ana@silvero.com</SecondaryText>
                </View>
            </View>
            <View style={styles.bar}></View>
            <View style={styles.userTags}>
                <View style={styles.row}>
                    <View style={styles.sectionTitle}>
                        <Image source={require('../assets/img/icons/home.jpg')} style={styles.icon}/>
                        <PrimaryText style={styles.title}>Intereses</PrimaryText>
                    </View>
                    <TouchableOpacity>
                        <Image source={require('../assets/img/icons/home.jpg')} style={styles.icon}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.tagsContainer}>
                    
                </View>
            </View>
            <View style={styles.bar}></View>
            <TouchableOpacity 
                style={styles.btnRow}
                onPress={() => onUnsubscribeButtonPress()}
                >
                <Image source={require('../assets/img/icons/home.jpg')} style={styles.icon}/>
                <PrimaryText style={styles.title}>Darme de baja</PrimaryText>
            </TouchableOpacity>
            <View style={styles.bar}></View>
            <TouchableOpacity
                style={styles.btnRow}
                onPress={() => onLogOutButtonPress()}
            >
                <Image source={require('../assets/img/icons/home.jpg')} style={styles.icon}/>
                <PrimaryText style={styles.title}>Cerrar sesión</PrimaryText>
            </TouchableOpacity>
            <View style={styles.bar}></View>
        </View>
    )
}

export default ProfileScreen;