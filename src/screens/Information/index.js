import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import styles from './styles/index';
import Card from './components/card';

const Index = (props) => {
  return(
    <ScrollView style={styles.mainContainer}>
      <Card title={'Social'} cardColor={'#e55773'} navigation={props.navigation}/> 
      <Card title={'Legal'} cardColor={'#5f40d5'} navigation={props.navigation}/> 
      <Card title={'Psicología'} cardColor={'#ff5f00'} navigation={props.navigation}/> 
    </ScrollView>
  )
}
export default Index;