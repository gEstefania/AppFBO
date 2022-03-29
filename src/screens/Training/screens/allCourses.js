import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
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
        return(
            <TouchableOpacity
                onPress={()=>navigateToCourseDetails(item.item)}
                style={styles.btnCourse}>
                <PrimaryText color={'gray'} style={styles.fontTitle}>{item.item.title}</PrimaryText>
                <View style={styles.courseInfo}>
                    <IconVideo width={15} height={15} />
                    <PrimaryText style={styles.fontInfo}>{item.item.totalVideos}</PrimaryText>
                    <IconRelojOrange width={15} height={15} />
                    <PrimaryText style={styles.fontInfo}>{item.item.totalHours} h y {item.item.totalMins} min</PrimaryText>
                </View>
            </TouchableOpacity>
        )
    }

    return(
        <View style={styles.mainContainer}>
            <PrimaryText>TODOS LOS CURSOS</PrimaryText>
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