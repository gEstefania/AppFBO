import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/allCourses';
import { setCurrentCourse } from '../../../redux/actions/selectedCourseActions';
import {IconRelojOrange, IconVideo} from '@icons';
import usePagination from "react-native-flatlist-pagination-hook";

const AllCourses = () =>{
    const courses = useSelector(state => state.courses)
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const navigateToCourseDetails=(item)=>{
        navigation.navigate("TopMenu")
        dispatch(setCurrentCourse(item))
        //props.setCurrentCourse(item)
    }

    const fetchApi = (page = 0, pageSize = 3) => {
        const data = courses
        return new Promise(resolve => {
            setTimeout(() => resolve(data.slice(page * pageSize, (page + 1) * pageSize) || []), 1000);
        });
    }
    const {
        data,     
        addData,
        onEndReached, //callback in Flatlist onEndReached
        pageIndex,    //current pageIndex use it to query data
        ListFooterComponent,
    } = usePagination(3); //pageSize = 10

    useEffect(() => {
        fetchApi(pageIndex).then((data) => {
            addData(data);
        })
    }, [pageIndex]);

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
                data={data}
                renderItem={renderList}
                onEndReachedThreshold={.5}
                onEndReached={onEndReached}
                ListFooterComponent={ListFooterComponent}
                numColumns={2}
                style={{marginTop: 20,}}
                columnWrapperStyle={{justifyContent: 'space-between'}}
            />
        </View>
    )
}

export default AllCourses;