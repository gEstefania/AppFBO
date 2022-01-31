import * as React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { PrimaryText, SecondaryText } from '@common';
import styles from './styles/login';

const Login = () => {
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
                onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
               >
                   <Text>Continúa con facebook</Text>
               </TouchableOpacity>
           </View>
           <View style={styles.btnContainer}>
               <TouchableOpacity>
                   <Text>Continúa con google</Text>
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