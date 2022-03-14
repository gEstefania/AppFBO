import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, TextInput, SafeAreaView} from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/contactScreen'; 
import {IconHablemos} from '@icons';

const ContactScreen = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userSubject, setUserSubject] = useState('');

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView></SafeAreaView>
            <View style={styles.headerContainer}>
                <IconHablemos width={30} height={30} />
                <PrimaryText>Hablemos</PrimaryText>
            </View>
            <View style={styles.shadow}></View>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <PrimaryText>Nombre</PrimaryText>
                    <TextInput
                        placeholder=""
                        placeholderTextColor='gray'
                        style={styles.input}
                        onChangeText={text => setUserName(text)}
                        autoCapitalize={'none'}
                        value={userName}
                        //onSubmitEditing={() => navigation.navigate('Search', {searchText: searchText})}
                    />
                </View>
                <View style={styles.bar}></View>
                <View style={styles.inputContainer}>
                    <PrimaryText>Email</PrimaryText>
                    <TextInput
                        placeholder=""
                        placeholderTextColor='gray'
                        style={styles.input}
                        onChangeText={text => setUserEmail(text)}
                        autoCapitalize={'none'}
                        value={userEmail}
                        //onSubmitEditing={() => navigation.navigate('Search', {searchText: searchText})}
                    />
                </View>
                <View style={styles.bar}></View>
                <View style={styles.inputContainer}>
                    <PrimaryText>Asunto</PrimaryText>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        placeholder=""
                        placeholderTextColor='gray'
                        style={styles.input}
                        onChangeText={text => setUserSubject(text)}
                        autoCapitalize={'none'}
                        value={userSubject}
                        //onSubmitEditing={() => navigation.navigate('Search', {searchText: searchText})}
                    />
                </View>
            </View>
            <View>
                <TouchableOpacity style={styles.btnSend}>
                    <SecondaryText color={'#fff'}>ENVIAR</SecondaryText>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default ContactScreen;