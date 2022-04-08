import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, useWindowDimensions, ImageBackground } from "react-native";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useSelector, useDispatch } from 'react-redux';
import Modal from "react-native-modal";
import {PrimaryText, SecondaryText} from '@common';
import auth from '@react-native-firebase/auth';
import {getActiveCourses} from '@firestore/courses'
import CardExplorer from './components/cardExplorer';
import CardCompanies from './components/cardCompany';
import styles from './styles/explorerScreen';
import { ScrollView } from 'react-native-gesture-handler';
import ShowModalForRegister from '@components/showModalForRegister';
import { useNavigation } from '@react-navigation/native';
import { setCurrentCourse } from '../../redux/actions/selectedCourseActions';
import { IsNewUser } from '../../redux/actions/userActions';
import { connect } from 'react-redux'

const ExploreScreen = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSignUpModalVisible, setSignUpModalVisible] = useState(false);
  const [user, setUser] = useState();
  const courses = useSelector(state => state.courses)
  const userAuth = useSelector(state => state.users)
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('NUEVO USUARIO DESDE REDUX:', userAuth);
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    const subscriberFirebase = getActiveCourses()
    if(userAuth.newUser){
      setSignUpModalVisible(true)
    }
    return ()=>{
      subscriber();
      subscriberFirebase()
    } ; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    setUser(user);
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }

  const closeModal = () => {
    setSignUpModalVisible(false)
    dispatch(IsNewUser({newUser: false}))
  }

  const navigateToCourseDetails=(item)=>{
    if(user.isAnonymous == true){
      setModalVisible(!isModalVisible);
    }else{
      navigation.navigate("TopMenu", {toHome: true}) // aqui este navigate es desde home
      props.setCurrentCourse(item)
    }
  }

  const renderList = ({item}) => {
    //console.log('KITEMMMSMMSM IS',item.coverImage.url);
    return(
      <TouchableOpacity 
        style={[styles.swiper, {width: width*0.90}]}
        onPress={()=>navigateToCourseDetails(item) }
        >
          <ImageBackground
          resizeMode="cover"
          source={{uri:item.coverImage?.url}}
          imageStyle={{ borderRadius: 14}}
          style={styles.backgroundImage}>
            <PrimaryText color={'#fff'} style={styles.titleSlide}>{item.title}</PrimaryText>
          </ImageBackground>
      </TouchableOpacity>
    )
  }

  return (
    <ScrollView>
      <View style={styles.swiperContainer}>
      <SwiperFlatList
        //autoplay
        //autoplayDelay={2}
        //autoplayLoop
        index={0}
        showPagination
        data={courses}
        renderItem={renderList}
        paginationDefaultColor={'rgba(255,255,255,0.7)'}
      />
      <ShowModalForRegister isVisible={isModalVisible} setModalVisible={toggleModal} style={styles}/>
      </View>
      <CardExplorer/>
      <CardCompanies/>
      <Modal
        isVisible={isSignUpModalVisible}
        onBackdropPress={() => closeModal()}
        swipeDirection="left"
      >
        <View style={styles.modal}>
          <PrimaryText style={styles.modalTitle}>¡Bienvenido!</PrimaryText>
          <SecondaryText color={'gray'} style={styles.modalDetail}>Te has registrado con éxito, ahora puedes disfrutar del contenido de nuestra aplicación</SecondaryText>
        </View>
      </Modal>
    </ScrollView>
  )
}

const dispatchStateToProps={
  setCurrentCourse:setCurrentCourse
}

export default connect(null, dispatchStateToProps)(ExploreScreen);