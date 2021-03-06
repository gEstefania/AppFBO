import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity } from "react-native";
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/suggestionScreen';
import {IconSugerencias} from '@icons';

const Suggestions = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <IconSugerencias width={30} height={30} style={{marginBottom: 5}} />
                <PrimaryText style={styles.titleSize}>Sugerencias</PrimaryText>
            </View>
            <View style={styles.shadow}></View>
            <View style={styles.descContainer}>
                <View style={styles.titleContainer}>
                    <PrimaryText color={'gray'}>Queremos que participes en este proyecto.</PrimaryText>
                    <PrimaryText color={'gray'}>¿Qué te gustaría ver o mejorar en la APP?</PrimaryText>
                </View>
                
                <SecondaryText color={'gray'}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</SecondaryText>
            </View>
            <View>
                <TouchableOpacity style={styles.btnSend}>
                    <SecondaryText color={'#fff'}>ENVIAR</SecondaryText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Suggestions;