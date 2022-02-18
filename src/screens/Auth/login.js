import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { View, TouchableOpacity, Image, TextInput, ScrollView, SafeAreaView, Alert, ActivityIndicator, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { PrimaryText, SecondaryText } from '@common';
import { ShowAlertMessage } from '@components';
import styles from './styles/login';

GoogleSignin.configure({
    webClientId: '87191973761-ar8m75fg58jijj3evhsvr2vsbmnj34d9.apps.googleusercontent.com',
});

const Login = () => {
    const [user, setUser] = useState({ email: '', password: '' });
    const navigation = useNavigation();

    async function onSignInButtonPress() {
        if (user.email !== '' && user.password !== '') {
            try {
                auth()
                .signInWithEmailAndPassword(user.email, user.password)
                .then(() => {
                    console.log('User signed in!');
                    //AsyncStorage.setItem('@token', JSON.stringify(data.token));
                    navigation.navigate("Home")
                })
                .catch(error => {
                    if (error.code === 'auth/user-not-found') {
                        ShowAlertMessage('Usuario inexistente', '', 'warning');
                    }
                    if (error.code === 'auth/invalid-email') {
                        ShowAlertMessage('Email inválido', 'Por favor intentar de nuevo', 'warning');
                    }
                    console.error(error);
                });
            } catch (e) {
                console.log('Login Error: ', e);
                ShowAlertMessage('Algo salió mal', 'Por favor intentar de nuevo', 'warning');
            }
        } else {
            console.log('Campos vacios')
            ShowAlertMessage('Campos vacios', 'Por favor intentar de nuevo', 'warning');
        }
    }
    async function onGuestButtonPress() {
        auth()
            .signInAnonymously()
            .then(() => {
                navigation.navigate("Home")
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
        const { idToken,  } = await GoogleSignin.signIn();
        console.log('Google idToken: ', idToken);

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        try {
            // Sign-in the user with the credential
            auth().signInWithCredential(googleCredential);
            await AsyncStorage.setItem('@token', idToken);
            navigation.navigate("Home")
            console.log('Login with Google Success')
        } catch (error) {
            console.log('Error login with Google: ', error)
        }
    }

    async function onFacebookButtonPress() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
          throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        console.log(facebookCredential)

        try {
            // Sign-in the user with the credential
            const authFacebook = auth().signInWithCredential(facebookCredential);
            if(authFacebook){
                await AsyncStorage.setItem('@token', data.accessToken);
                navigation.navigate("Home")
                console.log('Login Success!')
            }
        } catch (error) {
            ShowAlertMessage('Algo salió mal', '', 'warning');
            console.log('Login Error: ', error);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            {isLoading && <View style={{ backgroundColor: 'rgba(0,0,0,0.25)', height: Dimensions.get('window').height, width: Dimensions.get('window').width, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="blue" />
            </View>}
            <SafeAreaView></SafeAreaView>
            <View style={styles.welcome}>
                <PrimaryText style={styles.welcomeText}>Bienvenida Familia</PrimaryText>
            </View>
            <View style={styles.btnGuestView}>
                <TouchableOpacity
                    onPress={() => onGuestButtonPress()}
                    style={styles.btnGuest}
                >
                    <Image source={require('../../assets/img/icons/home.jpg')} style={styles.icon} />
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
                    onChangeText={text => setUser({ ...user, email: text })}
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    style={styles.loginInput}
                    placeholder={'Contraseña'}
                    placeholderTextColor="#000"
                    autoCapitalize={'none'}
                    value={user.password}
                    onChangeText={text => setUser({ ...user, password: text })}
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