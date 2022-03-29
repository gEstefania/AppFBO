import * as React from 'react';
import { View, Text, Image } from "react-native";
import styles from './styles/overviewScreen';
import {PrimaryText, SecondaryText} from '@common';
import { connect } from 'react-redux';
import {IconRelojNube, IconVideoNube} from '@icons';

const OverviewScreen = ({route,navigation,course}) => {
    
    return (
        <View style={styles.mainContainer}>
            <View style={styles.summaryContainer}>
                <View style={styles.row}>
                <IconVideoNube width={25} height={25} />
                    <View style={styles.columnText}>
                        <PrimaryText color={'#fff'}>{course.totalVideos} videos</PrimaryText>
                    </View>
                </View>
                <View style={styles.row}>
                    <IconRelojNube width={25} height={25} />
                    <View style={styles.columnText}>
                        <PrimaryText color={'#fff'}>{course.totalHours} h y {course.totalMins} min</PrimaryText>
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