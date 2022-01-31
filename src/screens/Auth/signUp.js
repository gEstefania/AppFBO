import * as React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { PrimaryText, SecondaryText } from '@common'
import styles from './styles/signUp';

const SignUp = () => {
    return(
        <View style={styles.mainContainer}>
            <View style={styles.welcome}>
                <PrimaryText style={styles.welcomeText}>Crea tu cuenta</PrimaryText>
            </View>
           <View style={styles.btnContainer}>
               <TouchableOpacity>
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
                    placeholder={'Password'}
                    placeholderTextColor="#000"
                />
           </View>
           <View style={styles.btnLogin}>
               <TouchableOpacity>
                   <SecondaryText color={'#fff'}>ENTRAR</SecondaryText>
               </TouchableOpacity>
           </View>
           <View style={styles.btnCount}>
               <TouchableOpacity>
                   <SecondaryText>Acepto la Politica de Privacidad</SecondaryText>
               </TouchableOpacity>
           </View>
           <View style={styles.btnCount}>
               <TouchableOpacity>
                   <SecondaryText>¿YA TIENES CUENTA? ENTRA</SecondaryText>
               </TouchableOpacity>
           </View>
        </View>
    )
}

export default SignUp;