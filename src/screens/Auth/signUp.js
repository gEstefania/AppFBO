import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { View, TouchableOpacity, Image, TextInput } from "react-native";
import { CheckBox } from 'react-native-elements';
import { PrimaryText, SecondaryText } from '@common'
import styles from './styles/signUp';

const SignUp = () => {

    const [checkDownload, setCheckDownload] = useState(false);

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
                <PrimaryText style={styles.welcomeText}>Crea tu cuenta</PrimaryText>
            </View>
           <View style={styles.btnFacebookContainer}>
               <TouchableOpacity>
                   <SecondaryText color='#fff'>CONTINÚA CON FACEBOOK</SecondaryText>
               </TouchableOpacity>
           </View>
           <View style={styles.btnGoogleContainer}>
               <TouchableOpacity>
                   <SecondaryText>CONTINÚA CON GOOGLE</SecondaryText>
               </TouchableOpacity>
           </View>
           <View style={styles.btnSignUp}>
                <SecondaryText color={'gray'}>REGÍSTRATE CON TU EMAIL</SecondaryText>
           </View>
           <View style={styles.input}>
                <TextInput
                    style={styles.loginInput}
                    placeholder={'Nombre'}
                    placeholderTextColor="#000"
                />
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
                    placeholder={'Contraseña'}
                    placeholderTextColor="#000"
                />
           </View>
           <View style={styles.btnPolicyContainer}>
                <SecondaryText>Acepto la </SecondaryText>
                <TouchableOpacity>
                    <SecondaryText color={'blue'}>Politica de Privacidad*</SecondaryText>
                </TouchableOpacity>
                <CheckBox
                    containerStyle={{padding: 0}}
                    checked={checkDownload}
                    onPress={() => setCheckDownload(!checkDownload)}
                />
           </View>
           <View style={styles.btnLogin}>
               <TouchableOpacity>
                   <SecondaryText color={'#fff'}>REGISTRARME</SecondaryText>
               </TouchableOpacity>
           </View>
           <View style={styles.btnSingInContainer}>
                <SecondaryText>¿YA TIENES CUENTA? </SecondaryText>
                <TouchableOpacity>
                    <SecondaryText color={'blue'}>ENTRA</SecondaryText>
                </TouchableOpacity>
           </View>
        </View>
    )
}

export default SignUp;