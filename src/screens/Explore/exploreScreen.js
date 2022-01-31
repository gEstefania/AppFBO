import * as React from 'react';
import { View, Text } from "react-native";
import Swiper from "react-native-swiper";
import { PrimaryText } from '@common';
import CardExplorer from './components/cardExplorer';
import styles from './styles/explorerScreen';

const ExploreScreen = () => {
    return (
        <View style={styles.mainContainer}>
          <View style={styles.subContainer}>
            <Swiper
              index={0}
              loop= {true}
              controlsProps={{
                dotsTouchable: true,
                nextTitle: '',
                prevTitle: '',
              }}
              dotStyle= {styles.dotStyle}
              activeDotStyle= {styles.activeDotStyle}
            >
            <View style={styles.swiperContainer}>
              <PrimaryText color={'#fff'} style={styles.titleSlide}>Avances Médicos</PrimaryText>
            </View>
            <View style={styles.swiperContainer}>
                <PrimaryText color={'#fff'} style={styles.titleSlide}>Lorem Ipsum</PrimaryText>
            </View>
            <View style={styles.swiperContainer}>
                <PrimaryText color={'#fff'} style={styles.titleSlide}>Lorem Ipsum</PrimaryText>
            </View>
            <View style={styles.swiperContainer}>
                <PrimaryText color={'#fff'} style={styles.titleSlide}>Lorem Ipsum</PrimaryText>
            </View>
            </Swiper>
          </View>
        <CardExplorer/>
        </View>
    )
}

export default ExploreScreen;