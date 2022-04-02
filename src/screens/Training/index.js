import { View, Image, Text, TouchableOpacity, Button,ImageBackground} from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import styles from './styles/index';
import {PrimaryText, SecondaryText} from '@common';
import {getActiveCourses} from '@firestore/courses'
import {connect} from 'react-redux'
import { setCurrentCourse } from '../../redux/actions/selectedCourseActions';
import {IconRelojOrange, IconVideo} from '@icons';

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
    }else{
      navigation.navigate("AllCourses")
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
    if(user.isAnonymous == true){
      setModalVisible(!isModalVisible);
    }else{
      navigation.navigate("TopMenu")
      props.setCurrentCourse(item)
    }
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
              <IconVideo width={20} height={20} />
              <View style={styles.columnText}>
                <PrimaryText type={'Regular'} style={styles.infoText}>{item.totalVideos} vídeos</PrimaryText>
              </View>
            </View>
            <View style={styles.row}>
              <IconRelojOrange width={20} height={20} />
              <View style={styles.columnText}>
                { item.totalHours ? ( // verificamos si hay horas o no
                  <PrimaryText type={'Regular'} style={styles.infoText}>{item.totalHours} h y {item.totalMins}</PrimaryText>
                ) : (
                  <PrimaryText type={'Regular'} style={styles.infoText}>{item.totalMins} min</PrimaryText>
                )}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          { item.summary.length < 50 ? (
              <SecondaryText>{item.summary.slice(0,50)}</SecondaryText>
            ) : (
              <SecondaryText>{item.summary.slice(0,50)}...</SecondaryText>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return(
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainContainer}>
      <Image source={require('../../assets/img/formacion_index.png')} style={styles.imgIndex}/>
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
    </ScrollView>
  )
}

const mapStateToProps=(state)=>({
  courses:state.courses
})
const dispatchStateToProps={
  setCurrentCourse:setCurrentCourse
}

export default connect(mapStateToProps,dispatchStateToProps)  (Index);