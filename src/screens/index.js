import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ImageBackground, Image } from "react-native";
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/index';

const Index = () => {
 return(
     <View style={styles.mainContainer}>
         <View style={styles.imgContainer}>
             <Image
                //source={}
             />
         </View>
         <View style={styles.textContainer}>
             <PrimaryText style={styles.title}>Fundación</PrimaryText>
             <PrimaryText style={styles.title}>Bertín Osborne</PrimaryText>
             <SecondaryText color={'gray'} style={styles.textIntro}>Toda la Información y formación que necesitas</SecondaryText>
             <TouchableOpacity style={styles.btnSignUp}>
                 <PrimaryText color={'#fff'} type={'Regular'}>SIGN UP</PrimaryText>
             </TouchableOpacity>
             <SecondaryText color={'gray'}>YA TIENES CUENTA? <SecondaryText color={'skyblue'}>ENTRA</SecondaryText></SecondaryText>
         </View>
     </View>
 )
}

export default Index;