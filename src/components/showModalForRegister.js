import React, { useEffect, useState } from 'react'
import {PrimaryText, SecondaryText} from '@common';
import { View, TouchableOpacity } from 'react-native'
import Modal from "react-native-modal";
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import styles from './styles/modal';

export const ShowModalForRegister = ({isVisible, setModalVisible, style} ) => {

  const navigation = useNavigation();

    const onSignUpButtonPress = () => {
        try {
            auth().signOut()
        } catch (error) {
            console.log(error);
        }
    }

  return (
      <Modal
        isVisible={isVisible}
        onBackdropPress={setModalVisible}
        swipeDirection="left"
      >
        <View style={style.modal}>
          <PrimaryText style={styles.title}>¿No tienes cuenta?</PrimaryText>
          <SecondaryText style={style.modalDetail}>Regístrate para poder vizualizar todo nuestro contenido</SecondaryText>
          <TouchableOpacity
            onPress={() => onSignUpButtonPress()}
            style={style.btnModal}
          >
            <PrimaryText color={'#fff'}>REGÍSTRATE</PrimaryText>
          </TouchableOpacity>
        </View>
      </Modal>
  )
}

export default ShowModalForRegister;
