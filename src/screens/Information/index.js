import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import {getAllCategories} from '@firestore/category';
import styles from './styles/index';
import Card from './components/card';

const Index = (props) => {
  const [ category, setCategory ] = useState([]);
  const [ colorPalette, setColorPalette ] = useState([]);

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

    getData() 
  }, []);

    const getData=async()=>{
      try {
          let res = await getAllCategories()
          let categoryList = []
          res.forEach(doc=>{
            categoryList.push({id:doc.id,...doc.data()})
          })
          setCategory(categoryList)
      }catch(e){
          console.log(e)
      }
  }

    const renderList = ({item, index}) => {
      return(
        <Card title={item.name} catId={item.id} catDesc={item.description} cardColor={colorPalette[index]} navigation={props.navigation}/> 
      )
    }
  return(
    <View style={styles.mainContainer}>
      <FlatList
        data={category}
        //keyExtractor={item => item.id}
        renderItem={renderList}
      />
    </View>
  )
}
export default Index;