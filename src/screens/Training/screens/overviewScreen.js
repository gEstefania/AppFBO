import * as React from 'react';
import { View, Text, Image } from "react-native";
import styles from './styles/overviewScreen';
import {PrimaryText, SecondaryText} from '@common';
import { connect } from 'react-redux';

const OverviewScreen = ({route,navigation,course}) => {
    
    return (
        <View style={styles.mainContainer}>
            <View style={styles.summaryContainer}>
                <View style={styles.row}>
                    <Image source={require('../../../assets/img/icons/home.jpg')} style={styles.icon}/>
                    <View style={styles.columnText}>
                        <PrimaryText color={'#fff'}>{course.totalVideos} videos</PrimaryText>
                    </View>
                </View>
                <View style={styles.row}>
                    <Image source={require('../../../assets/img/icons/home.jpg')} style={styles.icon}/>
                    <View style={styles.columnText}>
                        <PrimaryText color={'#fff'}>{course.totalTime} minutos</PrimaryText>
                    </View>
                </View>
            </View>
            <View style={styles.descContainer}>
                <PrimaryText>Aprenderemos a</PrimaryText>
                <SecondaryText>{course.summary}</SecondaryText>
            </View>
        </View>
    )
}

const mapStateToProps=(state)=>({
    course:state.currentCourse
})

export default connect(mapStateToProps) (OverviewScreen);