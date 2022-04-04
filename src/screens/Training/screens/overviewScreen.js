import * as React from 'react';
import { View, Text, Image, ImageBackground } from "react-native";
import styles from './styles/overviewScreen';
import {PrimaryText, SecondaryText} from '@common';
import { connect } from 'react-redux';
import {IconRelojNube, IconVideoNube} from '@icons';
import RenderHtml from 'react-native-render-html';

const OverviewScreen = ({route,navigation,course}) => {
    const source = {
        html: `${course.summary}`
      };
    return (
        <View style={styles.mainContainer}>
           
            <ImageBackground style={styles.summaryContainer} source={require('../../../assets/img/FBO-banner-nube.png')}>
                <View style={{padding: 20, width: '100%', height: '100%', justifyContent: 'space-around'}}>
                <View style={styles.row}>
                <IconVideoNube width={25} height={25} />
                    <View style={styles.columnText}>
                        <PrimaryText color={'#fff'}>{course.totalVideos} videos</PrimaryText>
                    </View>
                </View>
                <View style={styles.row}>
                    <IconRelojNube width={25} height={25} />
                    <View style={styles.columnText}>
                        { course.totalHours > 0 ? ( // verificamos si hay horas o no
                            <PrimaryText color={'#fff'}>{course.totalHours} h y {course.totalMins} min</PrimaryText>
                        ) : (
                            <PrimaryText color={'#fff'}>{course.totalMins} min</PrimaryText>
                        )}
                    </View>
                </View>
                </View>
                </ImageBackground>
            
            <View style={styles.descContainer}>
                <PrimaryText>Aprenderemos a</PrimaryText>
                <RenderHtml
                    source={source}
                />
            </View>
        </View>
    )
}

const mapStateToProps=(state)=>({
    course:state.currentCourse
})

export default connect(mapStateToProps) (OverviewScreen);