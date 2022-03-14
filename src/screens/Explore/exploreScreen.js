import * as React from 'react';
import { View, useWindowDimensions } from "react-native";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useSelector } from 'react-redux';
import { PrimaryText } from '@common';
import CardExplorer from './components/cardExplorer';
import CardCompanies from './components/cardCompany';
import styles from './styles/explorerScreen';
import { ScrollView } from 'react-native-gesture-handler';

const ExploreScreen = () => {
  const courses = useSelector(state => state.courses)
  const { width } = useWindowDimensions();

  const renderList = (item) => {
    return(
      <View style={[styles.swiper, {width: width*0.90}]}>
        <PrimaryText color={'#fff'} style={styles.titleSlide}>{item.item.title}</PrimaryText>
      </View>
    )
  }

  return (
    <ScrollView>
      <View style={styles.swiperContainer}>
      <SwiperFlatList
        //autoplay
        //autoplayDelay={2}
        //autoplayLoop
        index={0}
        showPagination
        data={courses}
        renderItem={renderList}
      />
      </View>
      <CardExplorer/>
      <CardCompanies/>
    </ScrollView>
  )
}

export default ExploreScreen;