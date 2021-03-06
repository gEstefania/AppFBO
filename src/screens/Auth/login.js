import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore'
import { View, TouchableOpacity, Image, TextInput, ScrollView, SafeAreaView, Alert, ActivityIndicator, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { PrimaryText, SecondaryText } from '@common';
import { ShowAlertMessage } from '@components';
import styles from './styles/login';
import {createUserSocialRegiter} from '@firestore/user' 
import { login } from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import {IconInvitado, IconFacebook, IconGoogle} from '@icons';

GoogleSignin.configure({
    webClientId: '87191973761-ar8m75fg58jijj3evhsvr2vsbmnj34d9.apps.googleusercontent.com',
});

const Login = (props) => {
    const [user, setUser] = useState({ email: '', password: '' });
    const navigation = useNavigation();

    async function onSignInButtonPress() {
        if (user.email !== '' && user.password !== '') {
            try {
                let getUserEnable = await firestore().collection("Users").where('email','==',user.email).get()
                let userEnable = getUserEnable.docs[0].data().enabled
                console.log('userEnable:', userEnable);
                if (userEnable == true) {
                    auth()
                    .signInWithEmailAndPassword(user.email, user.password)
                    .then(async() => {
                        console.log('User signed in!');
                        const userData={
                            email:user.email,   
                        }
                        let res = await insertUser(userData)
                        if(res.data()){
                            if(res.data().myTags){
                                if(res.data().myTags.length===0){
                                    navigation.navigate("TagsPreferences")
                                }
                            }
                        }else{
                            navigation.navigate("Home")
                        }
                    })
                    .catch(error => {
                        if (error.code === 'auth/user-not-found') {
                            ShowAlertMessage('Usuario inexistente', '', 'warning');
                        }
                        if (error.code === 'auth/invalid-email') {
                            ShowAlertMessage('Email inv??lido', 'Por favor intentar de nuevo', 'warning');
                        }
                        if (error.code === 'auth/wrong-password') {
                            ShowAlertMessage('Contrase??a incorrecta', '', 'warning');
                        }
                        console.error(error);
                    });
                }else{
                    ShowAlertMessage('Usuario inexistente', '', 'warning');
                }
            } catch (e) {
                console.log('Login Error: ', e);
                ShowAlertMessage('Algo sali?? mal', 'Por favor intentar de nuevo', 'warning');
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
    const insertUser=async (userProfile)=>{
        const userData={
            email:userProfile.email,
            name:userProfile.name,
            picture: {
                url:userProfile?.picture?.data?userProfile?.picture.data.url:userProfile?.picture
            },
            role:"user",
            group:[],
        }
        let res = await createUserSocialRegiter(userData)
        if(res.data()){
            props.loginUser({id:res.id,...res.data()})
        }else{
            console.log("res.data() no definido.")
        }
        
        return res
    }
    async function onGoogleButtonPress() {
        // Get the users ID token
        const { idToken,  } = await GoogleSignin.signIn();
        console.log('Google idToken: ', idToken);

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        try {
            // Sign-in the user with the credential
            let userCredentials = await auth().signInWithCredential(googleCredential);
            let userProfile = userCredentials.additionalUserInfo?.profile
            if(userProfile){
                let res = await insertUser(userProfile)
                await AsyncStorage.setItem('@token', idToken);
                if(res.data()){
                    if(res.data().myTags){
                        if(res.data().myTags.length===0){
                            navigation.navigate("TagsPreferences")
                        }
                    }
                }else{
                    navigation.navigate("Home")
                }
                
                
                
            }
            
        } catch (error) {
            console.log('Error login with Google: ', error)
        }
    }

    async function onFacebookButtonPress (){
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

        try {
            // Sign-in the user with the credential
            const authFacebook = await auth().signInWithCredential(facebookCredential);

            if(authFacebook){
                console.log("FACEBOOK ", authFacebook)
                let userProfile = authFacebook.additionalUserInfo?.profile

                let res = await insertUser(userProfile)
                await AsyncStorage.setItem('@token', data.accessToken);
                
                if(res.data()){
                    if(res.data().myTags){
                        if(res.data().myTags.length===0){
                            navigation.navigate("TagsPreferences")
                        }
                    }
                }else{
                    navigation.navigate("Home")
                }
                
            }
        } catch (error) {
            ShowAlertMessage('Algo sali?? mal', '', 'warning');
            console.log('Login Error: ', error);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <SafeAreaView></SafeAreaView>
            <View style={styles.welcome}>
                <PrimaryText style={styles.welcomeText}>Bienvenida Familia</PrimaryText>
            </View>
            <TouchableOpacity
                onPress={() => onGuestButtonPress()}
                style={styles.btnGuestView}
            >
                <IconInvitado width={30} height={30} />
                <View style={{flex: 1, alignItems: 'center'}}>
                    <PrimaryText type={'Regular'}>INVITADO</PrimaryText>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onFacebookButtonPress()}
                style={styles.btnFacebookContainer}
            >
                <IconFacebook width={30} height={30} />
                <View style={{flex: 1, alignItems: 'center'}}>
                    <SecondaryText color='#fff'>CONTIN??A CON FACEBOOK</SecondaryText>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onGoogleButtonPress()}
                style={styles.btnGoogleContainer}
            >
                <IconGoogle width={30} height={30} />
                <View style={{flex: 1, alignItems: 'center'}}>
                    <SecondaryText>CONTIN??A CON GOOGLE</SecondaryText>
                </View>
            </TouchableOpacity>
            <View style={styles.titleSignIn}>
                <SecondaryText color={'gray'}>INICIA SESI??N CON TU EMAIL</SecondaryText>
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
                    placeholder={'Contrase??a'}
                    placeholderTextColor="#000"
                    autoCapitalize={'none'}
                    value={user.password}
                    secureTextEntry={true}
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
                    <SecondaryText>??Olvidaste tu contrase??a?</SecondaryText>
                </TouchableOpacity>
            </View>
            <View style={styles.btnSingInContainer}>
                <SecondaryText>??NO TIENES CUENTA? </SecondaryText>
                <TouchableOpacity
                    onPress={() => navigation.navigate("SignUp")}
                >
                    <SecondaryText color={'blue'}>REG??STRATE</SecondaryText>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
const dispatchStateToProps={
    loginUser:login
}
export default connect(null,dispatchStateToProps)(Login) ;