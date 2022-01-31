import * as React from 'react';
import { View, Text, Image } from "react-native";
import styles from './styles/overviewScreen';
import {PrimaryText, SecondaryText} from '@common';

const OverviewScreen = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.summaryContainer}>
                <View style={styles.row}>
                    <Image source={require('../../../assets/img/icons/home.jpg')} style={styles.icon}/>
                    <View style={styles.columnText}>
                        <PrimaryText color={'#fff'}>6 videos</PrimaryText>
                    </View>
                </View>
                <View style={styles.row}>
                    <Image source={require('../../../assets/img/icons/home.jpg')} style={styles.icon}/>
                    <View style={styles.columnText}>
                        <PrimaryText color={'#fff'}>40 minutos</PrimaryText>
                    </View>
                </View>
            </View>
            <View style={styles.descContainer}>
                <PrimaryText>Aprenderemos a</PrimaryText>
                <SecondaryText>autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</SecondaryText>
            </View>
        </View>
    )
}

export default OverviewScreen;