import * as React from 'react';
import { View, Image } from "react-native";
import styles from './styles/detailScreen';
import { ScrollView } from 'react-native-gesture-handler';
import {PrimaryText, SecondaryText} from '@common';
import RenderHtml from 'react-native-render-html';
import { connect } from 'react-redux';

const DetailScreen = ({route, navigation,course}) => {
    const { width } = useWindowDimensions();
    const source = {
        html: `<div class="text">${course.description}</div>`
    };

    const mixedStyles = { 
        "text": { color: '#000'}, 
    };

    //console.log(course?.teacherPicture?.url)
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
                    <SecondaryText color={'gray'} style={styles.speakerText}>Ponente</SecondaryText>
                    <SecondaryText color={'gray'} style={styles.nameSpeakerText}>{course.teacherName} {course.teacherLastname} {course.teacherSecondLastname}</SecondaryText>
                    <SecondaryText color={'gray'}>{course.teacherRol}</SecondaryText>
                </View>
            </View>
            <View style={styles.contentView}>
                <RenderHtml
                    classesStyles={mixedStyles}
                    contentWidth={width}
                    source={source}
                />
            </View>
        </ScrollView>
    )
}
const mapStateToProps=(state)=>({
    course:state.currentCourse
})

export default connect(mapStateToProps) (DetailScreen);