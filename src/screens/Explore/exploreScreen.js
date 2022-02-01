import * as React from 'react';
import { View, Text } from "react-native";
import Swiper from "react-native-swiper";
import { PrimaryText } from '@common';
import CardExplorer from './components/cardExplorer';
import CardCompanies from './components/cardCompany';
import styles from './styles/explorerScreen';
import { ScrollView } from 'react-native-gesture-handler';

const ExploreScreen = () => {
    return (
        <ScrollView>
          <View style={styles.swiperContainer}>
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
              <View style={styles.swiper}>
                <PrimaryText color={'#fff'} style={styles.titleSlide}>Avances Médicos</PrimaryText>
              </View>
              <View style={styles.swiper}>
                  <PrimaryText color={'#fff'} style={styles.titleSlide}>Lorem Ipsum</PrimaryText>
              </View>
              <View style={styles.swiper}>
                  <PrimaryText color={'#fff'} style={styles.titleSlide}>Lorem Ipsum</PrimaryText>
              </View>
              <View style={styles.swiper}>
                  <PrimaryText color={'#fff'} style={styles.titleSlide}>Lorem Ipsum</PrimaryText>
              </View>
            </Swiper>
          </View>
          <CardExplorer/>
          <CardCompanies/>
        </ScrollView>
    )
}

export default ExploreScreen;