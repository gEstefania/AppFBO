import { View, Image, Text, TouchableOpacity, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import styles from './styles/index';
import {PrimaryText, SecondaryText} from '@common';

const Index = () => {
  const [user, setUser] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  function onAuthStateChanged(user) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const dataList = [
    {
      name: 'Desde cero',
    },
    {
      name: 'Lorem ipsum',
    },
    {
      name: 'Lorem ipsum',
    },
    {
      name: 'Lorem ipsum',
    },
    {
      name: 'Lorem ipsum',
    },
    {
      name: 'Lorem ipsum',
    },
    {
      name: 'Lorem ipsum',
    },
    {
      name: 'Lorem ipsum',
    },
  ];

  const onViewAllButtonPress = () => {
    if(user.isAnonymous == true){
      setModalVisible(!isModalVisible);
    }
  }

  const onSignUpButtonPress = () => {
    try {
      auth().signOut()
    } catch (error) {
      console.log(error);
    }
  }

  const renderList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("TopMenu", { courseTitle: item.name})}
        style={styles.btnCard}
      >
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <PrimaryText style={styles.cardTitle}>{item.name}</PrimaryText>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.row}>
              <Image source={require('../../assets/img/icons/home.jpg')} style={styles.icon}/>
              <View style={styles.columnText}>
                <PrimaryText type={'Regular'} style={styles.infoText}>6 videos</PrimaryText>
              </View>
            </View>
            <View style={styles.row}>
              <Image source={require('../../assets/img/icons/home.jpg')} style={styles.icon}/>
              <View style={styles.columnText}>
                <PrimaryText type={'Regular'}  style={styles.infoText}>40 minutos</PrimaryText>
              </View>
            </View>
            <View style={styles.row}>
              <Image source={require('../../assets/img/icons/home.jpg')} style={styles.icon}/>
              <View style={styles.columnText}>
                <PrimaryText type={'Regular'}  style={styles.infoText}>2,122 inscritos</PrimaryText>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <SecondaryText>Autem vel eum iriuere dolor in hendreit in vulpurate velit</SecondaryText>
        </View>
      </TouchableOpacity>
    );
  };

  return(
    <View style={styles.mainContainer}>
      <Image/>
      <View style={styles.titleContainer}>
        <PrimaryText style={styles.title}>#Construcciones</PrimaryText>
        <TouchableOpacity
          onPress={() => onViewAllButtonPress()}
        >
          <SecondaryText>Ver todo</SecondaryText>
        </TouchableOpacity>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          swipeDirection="left"
        >
          <View style={styles.modal}>
            <PrimaryText>¿No tienes cuenta?</PrimaryText>
            <SecondaryText style={styles.modalDetail}>Regístrate para poder vizualizar todo nuestro contenido</SecondaryText>
            <TouchableOpacity
              onPress={() => onSignUpButtonPress()}
              style={styles.btnModal}
            >
              <PrimaryText color={'#fff'}>REGÍSTRATE</PrimaryText>
            </TouchableOpacity>
          </View>
      </Modal>
      </View>
      <FlatList
        horizontal
        data={dataList}
        renderItem={renderList}
        //keyExtractor={item => item.id}
      />
    </View>
  )
}

export default Index;