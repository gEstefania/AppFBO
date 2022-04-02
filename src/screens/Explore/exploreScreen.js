import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, useWindowDimensions } from "react-native";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useSelector } from 'react-redux';
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
import { connect } from 'react-redux'

const ExploreScreen = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState();

  const courses = useSelector(state => state.courses)
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    const subscriberFirebase = getActiveCourses()
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

  const navigateToCourseDetails=(item)=>{
    if(user.isAnonymous == true){
      setModalVisible(!isModalVisible);
    }else{
      navigation.navigate("TopMenu")
      props.setCurrentCourse(item)
    }
  }

  const renderList = ({item}) => {
    return(
      <TouchableOpacity 
        style={[styles.swiper, {width: width*0.90}]}
        onPress={()=>navigateToCourseDetails(item) }
        >
        <PrimaryText color={'#fff'} style={styles.titleSlide}>{item.title}</PrimaryText>
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
    </ScrollView>
  )
}

const dispatchStateToProps={
  setCurrentCourse:setCurrentCourse
}

export default connect(null, dispatchStateToProps)(ExploreScreen);