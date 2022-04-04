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
import {IconRelojOrange, IconVideo, LogoEscuelaFamily} from '@icons';
import ShowModalForRegister from '../../components/showModalForRegister';

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


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }

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
    console.log('ITEMM', item.coverImage.url);
    return (
      <TouchableOpacity
        onPress={()=>navigateToCourseDetails(item.item) }
        style={styles.btnCard}
      >
        <View style={styles.container}>
            <ImageBackground imageStyle={{ borderRadius: 6}}
            resizeMode="cover"
            source={{uri: item?.coverImage?.url}}
            style={styles.btnCourse}
             />
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
                { item.totalHours > 0 ? ( // verificamos si hay horas o no
                  <PrimaryText type={'Regular'} style={styles.infoText}>{item.totalHours} h y {item.totalMins}min </PrimaryText>
                ) : (
                  <PrimaryText type={'Regular'} style={styles.infoText}>{item.totalMins} min</PrimaryText>
                )}
              </View>
            </View>
          </View>
        </View>
        <ImageBackground /> 
        <View style={styles.descriptionContainer}>
          { item.summary.length < 50 ? (
              <SecondaryText style={styles.description} color={'#828282'}>{item.summary.slice(0,50)}</SecondaryText>
            ) : (
              <SecondaryText style={styles.description} color={'#828282'}>{item.summary.slice(0,50)}...</SecondaryText>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return(
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainContainer}>
      <View style={{justifyContent: 'center', alignItems: 'center', marginRight: 30,}}>
        <LogoEscuelaFamily width={230} height={150}/>
      </View>
      <View style={styles.titleContainer}>
        <PrimaryText style={styles.title}>#Construcciones</PrimaryText>
        <TouchableOpacity
          onPress={() => onViewAllButtonPress()}
        >
          <SecondaryText style={styles.td} color={'gray'}>Ver todo</SecondaryText>
        </TouchableOpacity>
        <ShowModalForRegister isVisible={isModalVisible} setModalVisible={toggleModal} style={styles}/>
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