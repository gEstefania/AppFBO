import * as React from 'react';
import { View, FlatList, TouchableOpacity } from "react-native";
import VideoThumbnail from '../components/videoThumbnail';
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/lessonScreen';
//import { useDispatch, useSelector } from 'react-redux';
//import { fetchLessonDescription, fetchLessons } from '../../../redux/actions/lessonsActions';

const LessonScreen = ({navigation}) => {
    const dataList = [
        {
            name: 'Paso 1',
        },
        {
            name: 'Paso 2',
        },
        {
            name: 'Paso 3',
        },
        {
            name: 'Paso 4',
        },
        {
            name: 'Paso 5',
        },
        {
            name: 'Paso 6',
        },
        {
            name: 'Paso 7',
        },
        {
            name: 'Paso 8',
        },
      ];

    const renderList = ({item}) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("LessonVideo")}
                style={styles.btnSteps}
            >
                {/* <Text>{description}</Text> */}
                <View style={styles.thumbnailContainer}>
                    <VideoThumbnail/>
                </View>
                <View style={styles.descContainer}>
                    <PrimaryText style={styles.btnText}>{item.name}</PrimaryText>
                    <SecondaryText style={styles.btnText}>Lorem Ipsum</SecondaryText>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={dataList}
                renderItem={renderList}
                //keyExtractor={item => item.id}
                style={styles.btnList}
            />
        </View>
    )
}

export default LessonScreen;