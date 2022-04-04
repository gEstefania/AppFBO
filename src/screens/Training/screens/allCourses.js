import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/allCourses';
import { setCurrentCourse } from '../../../redux/actions/selectedCourseActions';
import {IconRelojOrange, IconVideo} from '@icons';

const AllCourses = () =>{
    const courses = useSelector(state => state.courses)
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const navigateToCourseDetails=(item)=>{
        navigation.navigate("TopMenu")
        dispatch(setCurrentCourse(item))
        //props.setCurrentCourse(item)
    }

    const renderList = (item) => {
        console.log('cover image', item.item.coverImage);
        return(
            <TouchableOpacity
                onPress={()=>navigateToCourseDetails(item.item)}
                style={styles.btn}>
                    <ImageBackground
                        resizeMode="cover"
                        source={{uri: item.item.coverImage.url}}
                        style={styles.btnCourse}
                    >
                    <PrimaryText color={'gray'} style={styles.fontTitle}>{item.item.title}</PrimaryText>
                    <View style={styles.courseInfo}>
                        <IconVideo marginTop={4} width={15} height={15} />
                        <PrimaryText style={styles.fontInfo}>{item.item.totalVideos}</PrimaryText>
                        <IconRelojOrange marginTop={3} width={15} height={15} />
                        { item.item.totalHours > 0 ? ( // verificamos si hay horas o no
                            <PrimaryText type={'Regular'} style={styles.infoText}>{item.item.totalHours} h y {item.totalMins} min</PrimaryText>
                            ) : (
                            <PrimaryText type={'Regular'} style={styles.infoText}>{item.item.totalMins} min</PrimaryText>
                        )}
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    return(
        <View style={styles.mainContainer}>
            <PrimaryText style={styles.tittleText}>TODOS LOS CURSOS</PrimaryText>
            <FlatList
                data={courses}
                renderItem={renderList}
                numColumns={2}
                style={{marginTop: 20,}}
                columnWrapperStyle={{justifyContent: 'space-between'}}
            />
        </View>
    )
}

export default AllCourses;