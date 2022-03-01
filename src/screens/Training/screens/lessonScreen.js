import * as React from 'react';
import { View, FlatList, TouchableOpacity } from "react-native";
import VideoThumbnail from '../components/videoThumbnail';
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/lessonScreen';
import { connect } from 'react-redux';
import { getCoursesLessons } from '../../../firestore/courses';
//import { useDispatch, useSelector } from 'react-redux';
//import { fetchLessonDescription, fetchLessons } from '../../../redux/actions/lessonsActions';

const LessonScreen = ({navigation,lessons,currentCourse}) => {

    React.useEffect(() => {
        let subscriber = getCoursesLessons(currentCourse.id)
        return subscriber
    },[])

    const renderList = ({item}) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("LessonVideo",{lesson:item})}
                style={styles.btnSteps}
            >
                {/* <Text>{description}</Text> */}
                <View style={styles.thumbnailContainer}>
                    <VideoThumbnail/>
                </View>
                <View style={styles.descContainer}>
                    <PrimaryText style={styles.btnText}>{item.title}</PrimaryText>
                    <SecondaryText style={styles.btnText}>{item.subtitle}</SecondaryText>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={lessons}
                renderItem={renderList}
                //keyExtractor={item => item.id}
                style={styles.btnList}
            />
        </View>
    )
}
const mapStateToProps = (state) =>({
    lessons:state.lessons,
    currentCourse:state.currentCourse
})
export default connect(mapStateToProps) (LessonScreen);