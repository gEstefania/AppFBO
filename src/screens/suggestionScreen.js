import React, { useEffect, useState } from 'react';
import { Linking } from "react-native";

const Suggestions = ({navigation}) => {
    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            e.preventDefault();
            const open=()=>{
                let url = 'https://fundacionbertinosborne.org/buzon-sugerencias-app/';
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

export default Suggestions;