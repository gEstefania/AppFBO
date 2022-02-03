import * as React from 'react';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { View, TouchableOpacity, Image, TextInput } from "react-native";
import { PrimaryText, SecondaryText } from '@common';
import styles from './styles/login';

GoogleSignin.configure({
    webClientId: '87191973761-ar8m75fg58jijj3evhsvr2vsbmnj34d9.apps.googleusercontent.com',
});

const Login = () => {
    async function onSignInButtonPress() {
        console.log('Email');
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
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
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
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
      }

    return(
        <View style={styles.mainContainer}>
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
           <View style={styles.btnContainer}>
                <TouchableOpacity
                    onPress={() => onFacebookButtonPress()}
                >
                    <SecondaryText color={'#fff'}>CONTINÚA CON FACEBOOK</SecondaryText>
               </TouchableOpacity>
           </View>
           <View style={styles.btnContainer}>
               <TouchableOpacity
                    onPress={() => onGoogleButtonPress()}
               >
                   <SecondaryText color={'#fff'}>CONTNÚA CON GOOGLE</SecondaryText>
               </TouchableOpacity>
           </View>
           <View style={styles.btnSignUp}>
                <SecondaryText color={'gray'}>INICIA SESIÓN CON TU EMAIL</SecondaryText>
           </View>
           <View style={styles.input}>
                <TextInput
                    style={styles.loginInput}
                    placeholder={'Email'}
                    placeholderTextColor="#000"
                />
           </View>
           <View style={styles.input}>
                <TextInput
                    style={styles.loginInput}
                    placeholder={'Password'}
                    placeholderTextColor="#000"
                />
           </View>
           <View style={styles.btnLogin}>
                <TouchableOpacity
                    onPress={() => onSignInButtonPress()}
                >
                   <SecondaryText color={'#fff'}>ENTRAR</SecondaryText>
               </TouchableOpacity>
           </View>
           <View style={styles.btnPassword}>
               <TouchableOpacity>
                   <SecondaryText>¿Olvidaste tu contraseña?</SecondaryText>
               </TouchableOpacity>
           </View>
           <View style={styles.btnCount}>
               <TouchableOpacity>
                   <SecondaryText>¿NO TIENES CUENTA? REGÍSTRATE</SecondaryText>
               </TouchableOpacity>
           </View>
        </View>
    )
}

export default Login;