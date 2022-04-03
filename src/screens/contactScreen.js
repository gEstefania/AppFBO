import React, { useEffect, useState } from 'react';
import { Linking } from "react-native";

const ContactScreen = ({navigation}) => {
    useEffect(() => {

        const unsubscribe = navigation.addListener('tabPress', (e) => {
            console.log("Entro aqui")

            const open=()=>{
                let url = 'https://fundacionbertinosborne.org/hablamos-app/';
                Linking.openURL(url) 
            }
        open();
        });
        return unsubscribe;
      }, [navigation]);
    return(
        <></>
    )
}
export default ContactScreen;