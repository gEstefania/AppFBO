import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import base64 from 'react-native-base64'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux'
import { View, TouchableOpacity, Image, TextInput, ScrollView, SafeAreaView, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { PrimaryText, SecondaryText } from '@common';
import userAction from '../../redux/actions/userActions';
import {axiosApi} from '@http';
import axios from 'axios';
import styles from './styles/login';

GoogleSignin.configure({
    webClientId: '87191973761-ar8m75fg58jijj3evhsvr2vsbmnj34d9.apps.googleusercontent.com',
});

const Login = () => {
    const [user, setUser] = useState({email: '', password: ''});
    const dispatch = useDispatch()
    const navigation = useNavigation();

    useEffect(()=>{
        
    },[])
    
    async function onSignInButtonPress() {
        if (user.email !== '' && user.password !== '') {
            try {
                const {data} = await axios.post('https://backend-fbo.herokuapp.com/auth',
                    {
                        email: user.email,
                        password: user.password,
                    },
                    {
                        headers: {
                            Authorization: `Basic ${base64.encode(`${user.email}:${user.password}`)}`,
                        },
                    },
                );
                if (data?.token) {
                    await AsyncStorage.setItem('@token', JSON.stringify(data.token));
                    navigation.navigate("Home")
                } else{
                   // Alert.alert('Oops Algo salió mal')
                }
                console.log('Login Success! token: ', data.token)
            } catch (e) {
                console.log('Login Error: ', e);
                //Alert.alert('Credenciales incorrectas', 'Por favor intentar de nuevo', 'warning');
            }
        } else {
            //Alert.alert('Campos vacíos', 'Por favor ingrese sus datos.', 'warning');
        }
    }
    async function onGuestButtonPress() {
        auth()
        .signInAnonymously()
        .then(() => {
            console.log('User signed in anonymously');
        })
        .catch(error => {
            if (error.code === 'auth/operation-not-allowed') {
                console.log('Enable anonymous in your firebase console.');
            }
            console.error(error);
        });
    }
    async function onGoogleButtonPress() {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
        console.log('Google token: ', idToken);

        try {
            const {data} = await axiosApi.post('/auth/google',
                {
                    token: idToken
                },
            );
            if (data?.token) {
                await AsyncStorage.setItem('@token', JSON.stringify(data.token));
                navigation.navigate("Inicio")
            } else{
                //Alert.alert('Oops Algo salió mal')
            }
            console.log('Login Success! token: ', data.token)
        } catch (error) {
            console.log('Login Error: ', error);
        }

        // Create a Google credential with the token
        //const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        //return auth().signInWithCredential(googleCredential);
    }

    async function onFacebookButtonPress() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      
        if (result.isCancelled) {
          throw 'User cancelled the login process';
        }
      
        // Once signed in, get the users AccesToken
        const fbResponse = await AccessToken.getCurrentAccessToken();
        console.log('facebook token: ', fbResponse);

        if (!fbResponse) {
          throw 'Something went wrong obtaining access token';
        }
      
        try {
            const {data} = await axiosApi.post('/auth/facebook',
                {
                    token: fbResponse.accessToken
                },
                {
                    headers: {
                        //Authorization: `Basic ${base64.encode(`${user.email}:${user.password}`)}`,
                    },
                },
            );
            if (data?.token) {
                await AsyncStorage.setItem('@token', JSON.stringify(data.token));
                navigation.navigate("Inicio")
            } else{
                //Alert.alert('Oops Algo salió mal')
            }
            console.log('Login Success! token: ', data.token)
        } catch (error) {
            console.log('Login Error: ', error);
        }

        // Create a Firebase credential with the AccessToken
        //const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      
        // Sign-in the user with the credential
        //return auth().signInWithCredential(facebookCredential);
      }

    return(
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <SafeAreaView></SafeAreaView>
            <View style={styles.welcome}>
                <PrimaryText style={styles.welcomeText}>Bienvenida Familia</PrimaryText>
            </View>
           <View style={styles.btnGuestView}>
                <TouchableOpacity 
                    onPress={() => onGuestButtonPress()}
                    style={styles.btnGuest}
                >
                    <Image source={require('../../assets/img/icons/home.jpg')} style={styles.icon}/>
                    <View style={styles.textContainer}>
                        <PrimaryText type={'Regular'}>INVITADO</PrimaryText>
                    </View>
                </TouchableOpacity>
           </View>
           <View style={styles.btnFacebookContainer}>
                <TouchableOpacity
                    onPress={() => onFacebookButtonPress()}
                >
                    <SecondaryText color={'#fff'}>CONTINÚA CON FACEBOOK</SecondaryText>
               </TouchableOpacity>
           </View>
           <View style={styles.btnGoogleContainer}>
               <TouchableOpacity
                    onPress={() => onGoogleButtonPress()}
               >
                   <SecondaryText>CONTNÚA CON GOOGLE</SecondaryText>
               </TouchableOpacity>
           </View>
           <View style={styles.titleSignIn}>
                <SecondaryText color={'gray'}>INICIA SESIÓN CON TU EMAIL</SecondaryText>
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
            <TouchableOpacity
                style={styles.btnLogin}
                onPress={() => onSignInButtonPress()}
            >
                <SecondaryText color={'#fff'}>ENTRAR</SecondaryText>
            </TouchableOpacity>
           <View style={styles.btnPassword}>
               <TouchableOpacity>
                   <SecondaryText>¿Olvidaste tu contraseña?</SecondaryText>
               </TouchableOpacity>
           </View>
           <View style={styles.btnSingInContainer}>
                <SecondaryText>¿NO TIENES CUENTA? </SecondaryText>
                <TouchableOpacity
                    onPress={() => navigation.navigate("SignUp")}
                >
                    <SecondaryText color={'blue'}>REGÍSTRATE</SecondaryText>
                </TouchableOpacity>
           </View>
        </ScrollView>
    )
}

export default Login;