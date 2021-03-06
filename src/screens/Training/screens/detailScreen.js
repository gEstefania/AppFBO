import * as React from 'react';
import { View, Image } from "react-native";
import styles from './styles/detailScreen';
import { ScrollView } from 'react-native-gesture-handler';
import {PrimaryText, SecondaryText} from '@common';
import { connect } from 'react-redux';

const DetailScreen = ({route, navigation,course}) => {
    console.log(course?.teacherPicture?.url)
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.titleCard}>
                <PrimaryText style={styles.titleText}>{course.title}</PrimaryText>
            </View>
            <View style={styles.detailCard}>
                <View style={styles.imgContainer}>
                    {course?.teacherPicture?.url&&(
                        <Image source={{uri: course?.teacherPicture?.url}} style={styles.img}/>
                    )}
                    
                </View>
                <View style={styles.nameCard}>
                    <SecondaryText style={styles.speakerText}>Ponente</SecondaryText>
                    <SecondaryText style={styles.nameSpeakerText}>{course.teacherName} {course.teacherLastname} {course.teacherSecondLastname}</SecondaryText>
                    <SecondaryText>{course.teacherRol}</SecondaryText>
                </View>
            </View>
            <View style={styles.contentView}>
                <SecondaryText>{course.description}</SecondaryText>
            </View>
        </ScrollView>
    )
}
const mapStateToProps=(state)=>({
    course:state.currentCourse
})

export default connect(mapStateToProps) (DetailScreen);