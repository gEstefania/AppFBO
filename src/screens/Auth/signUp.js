import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import base64 from 'react-native-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { View, TouchableOpacity, Image, TextInput, ScrollView, SafeAreaView, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';
import { PrimaryText, SecondaryText } from '@common';
import userAction from '../../redux/actions/userActions';
import { ShowAlertMessage } from '@components';
import {axiosApi} from '@http';
import styles from './styles/signUp';

const SignUp = () => {
    const [user, setUser] = useState({email: '', password: '', name: ''});
    const [checkPolicy, setCheckPolicy] = useState(false);
    const navigation = useNavigation();

    async function onSignUpButtonPress() {
        if (user.email !== '' && user.password !== '') {
            if(checkPolicy){
                try {
                    const {data} = await axiosApi.post('/users/all',
                        {
                            email: user.email,
                            password: user.password,
                            name: user.name,
                        },
                    );
                    console.log(data)
                    if (data?.token) {
                        await AsyncStorage.setItem('@token', JSON.stringify(data.token));
                        navigation.navigate("Home")
                    } else{
                        ShowAlertMessage('Oops algo salió mal', 'Intente nuevamente.',);
                    }
                    console.log('Login Success! token: ', data.token)
                } catch (e) {
                    console.log('Login Error: ', e);
                    ShowAlertMessage('Credenciales incorrectas', 'Por favor intentar de nuevo', 'warning');
                }
            } else {
                console.log('No checked')
                ShowAlertMessage('Revise las políticas de privacidad', 'Por favor marcar campo', 'warning');
            }
        } else {
            console.log('Campos vacios')
            ShowAlertMessage('Campos vacios', 'Por favor intentar de nuevo', 'warning');
        }
    }
    async function onGoogleButtonPress() {
         // Get the users ID token
         const { idToken,  } = await GoogleSignin.signIn();
         console.log('Google idToken: ', idToken);
 
         //if(statusCodes.IN_PROGRESS) {
         //    setIsLoading(true);
         //} else if(statusCodes.SIGN_IN_CANCELLED) {
         //    setIsLoading(false);
         //}
 
         let googleToken = '';
         if (idToken) {
             const { accessToken } = await GoogleSignin.getTokens();
             googleToken = accessToken;
             console.log('Google accessToken: ', googleToken);
         }
 
         try {
             const { data } = await axios.post('https://backend-fbo.herokuapp.com/auth/google',
                 {
                     access_token: googleToken
                 },
             );
             if (data?.token) {
                 await AsyncStorage.setItem('@token', JSON.stringify(data.token));
                 setIsLoading(false);
                 navigation.navigate("Home");
             } else {
                 ShowAlertMessage('Algo salió mal', '', 'warning');
             }
             console.log('Login Success! token: ', data.token)
         } catch (error) {
             ShowAlertMessage('Algo salió mal', '', 'warning');
             console.log('Login Error: ', error);
         }
    }

    async function onFacebookButtonPress() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const { accessToken } = await AccessToken.getCurrentAccessToken();
        console.log('facebook token: ', accessToken);

        try {
            const { data } = await axiosApi.post('/auth/facebook',
                {
                    access_token: accessToken
                },
            );
            if (data?.token) {
                await AsyncStorage.setItem('@token', JSON.stringify(data.token));
                navigation.navigate("Inicio")
            } else {
                ShowAlertMessage('Algo salió mal', '', 'warning');
            }
            console.log('Login Success! token: ', data.token)
        } catch (error) {
            ShowAlertMessage('Algo salió mal', '', 'warning');
            console.log('Login Error: ', error);
        }
    }

    return(
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <SafeAreaView></SafeAreaView>
            <View style={styles.welcome}>
                <PrimaryText style={styles.welcomeText}>Crea tu cuenta</PrimaryText>
            </View>
            <View style={styles.btnFacebookContainer}>
                <TouchableOpacity
                    onPress={() => onFacebookButtonPress()}
                >
                   <SecondaryText color='#fff'>CONTINÚA CON FACEBOOK</SecondaryText>
               </TouchableOpacity>
            </View>
            <View style={styles.btnGoogleContainer}>
                <TouchableOpacity
                    onPress={() => onGoogleButtonPress()}
                >
                   <SecondaryText>CONTINÚA CON GOOGLE</SecondaryText>
               </TouchableOpacity>
            </View>
            <View style={styles.titleSignIn}>
                <SecondaryText color={'gray'}>REGÍSTRATE CON TU EMAIL</SecondaryText>
            </View>
            <View style={styles.input}>
                <TextInput
                    style={styles.loginInput}
                    placeholder={'Nombre'}
                    placeholderTextColor="#000"
                    autoCapitalize={'none'}
                    value={user.name}
                    onChangeText={text => setUser({...user, name: text})}
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    style={styles.loginInput}
                    placeholder={'Email'}
                    placeholderTextColor="#000"
                    autoCapitalize={'none'}
                    value={user.email}
                    onChangeText={text => setUser({...user, email: text})}
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    style={styles.loginInput}
                    placeholder={'Contraseña'}
                    placeholderTextColor="#000"
                    autoCapitalize={'none'}
                    value={user.password}
                    onChangeText={text => setUser({...user, password: text})}
                />
            </View>
            <View style={styles.btnPolicyContainer}>
                <SecondaryText>Acepto la </SecondaryText>
                <TouchableOpacity>
                    <SecondaryText color={'blue'}>Política de Privacidad*</SecondaryText>
                </TouchableOpacity>
                <CheckBox
                    containerStyle={{padding: 0}}
                    checked={checkPolicy}
                    onPress={() => setCheckPolicy(!checkPolicy)}
                />
            </View>
            <TouchableOpacity
                style={styles.btnLogin}
                onPress={() => onSignUpButtonPress()}
            >
                <SecondaryText color={'#fff'}>REGISTRARME</SecondaryText>
            </TouchableOpacity>
            <View style={styles.btnSingInContainer}>
                <SecondaryText>¿YA TIENES CUENTA? </SecondaryText>
                <TouchableOpacity
                    onPress={() => navigation.navigate("SignIn")}
                >
                    <SecondaryText color={'blue'}>ENTRA</SecondaryText>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default SignUp;