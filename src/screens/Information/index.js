import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {getCategories} from '@firestore/category';
import styles from './styles/index';
import Card from './components/card';

const Index = (props) => {
  const [ category, setCategory ] = useState([]);
  const [ colorPalette, setColorPalette ] = useState([]);
  const categories = useSelector(state => state.category)

  useEffect(() => { 
    setColorPalette(
      [
        '#e55773',
        '#5f40d5',
        '#ff5f00',
        '#11b2d8',
        '#e55773',
        '#5f40d5',
        '#ff5f00',
        '#11b2d8',
      ]
    )
    const subscriberFirebase = getCategories()
    return ()=>{
      subscriberFirebase()
    } 
    //getData() 
  }, []);
  
    const renderList = ({item, index}) => {
      return(
        <Card title={item.name} catId={item.id} catDesc={item.description} cardColor={colorPalette[index]} img={item.image.url} navigation={props.navigation}/> 
      )
    }
  return(
    <View style={styles.mainContainer}>
      <FlatList
        data={categories}
        //keyExtractor={item => item.id}
        renderItem={renderList}
      />
    </View>
  )
}
export default Index;