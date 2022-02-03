import * as React from 'react';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { PrimaryText, SecondaryText } from '@common';
import styles from './styles/login';

const Login = () => {

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
               <TouchableOpacity style={styles.btnGuest}>
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
               <TouchableOpacity>
                   <SecondaryText color={'#fff'}>CONTNÚA CON GOOGLE</SecondaryText>
               </TouchableOpacity>
           </View>
           <View style={styles.btnSignUp}>
                <SecondaryText color={'gray'}>REGÍSTRATE CON TU EMAIL</SecondaryText>
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
               <TouchableOpacity>
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
                   <SecondaryText>¿NO TIENES CUENTA? REGISTRARSE</SecondaryText>
               </TouchableOpacity>
           </View>
        </View>
    )
}

export default Login;