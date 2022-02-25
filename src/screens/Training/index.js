import { View, Image, Text, TouchableOpacity, Button,ImageBackground} from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import styles from './styles/index';
import {PrimaryText, SecondaryText} from '@common';
import {getActiveCourses} from '@firestore/courses'
import {connect} from 'react-redux'
import { setCurrentCourse } from '../../redux/actions/selectedCourseActions';
const Index = (props) => {
  const [user, setUser] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [allCourses,setAllCourses] = useState([]);
  const navigation = useNavigation();
  

  function onAuthStateChanged(user) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    const subscriberFirebase = getActiveCourses()
    return ()=>{
      subscriber();
      subscriberFirebase()
    } ; // unsubscribe on unmount
  }, []);



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

  const navigateToCourseDetails=(item)=>{
    navigation.navigate("TopMenu")
    props.setCurrentCourse(item)
  }

  const renderList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={()=>navigateToCourseDetails(item) }
        style={styles.btnCard}
      >
        <View style={styles.container}>
          {item?.images?.url&&(
            <ImageBackground
              resizeMode="cover"
              source={{uri:item.images.url}}
              style={styles.backgorundImage}
             />
          )}
          <ImageBackground /> 
          <View style={{flex: 1}}>
            <PrimaryText style={styles.cardTitle}>{item.title}</PrimaryText>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.row}>
              <Image source={require('../../assets/img/icons/home.jpg')} style={styles.icon}/>
              <View style={styles.columnText}>
                <PrimaryText type={'Regular'} style={styles.infoText}>{item.totalVideos} vídeos</PrimaryText>
              </View>
            </View>
            <View style={styles.row}>
              <Image source={require('../../assets/img/icons/home.jpg')} style={styles.icon}/>
              <View style={styles.columnText}>
                <PrimaryText type={'Regular'}  style={styles.infoText}>{item.totalTime} minutos</PrimaryText>
              </View>
            </View>
            <View style={styles.row}>
              <Image source={require('../../assets/img/icons/home.jpg')} style={styles.icon}/>
              <View style={styles.columnText}>
                <PrimaryText type={'Regular'}  style={styles.infoText}>{item.users} inscritos</PrimaryText>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <SecondaryText>{item.summary.slice(0,parseInt(item.summary.length/4))} ...</SecondaryText>
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
        data={props.courses}
        renderItem={renderList}
        //keyExtractor={item => item.id}
      />
    </View>
  )
}

const mapStateToProps=(state)=>({
  courses:state.courses
})
const dispatchStateToProps={
  setCurrentCourse:setCurrentCourse
}

export default connect(mapStateToProps,dispatchStateToProps)  (Index);