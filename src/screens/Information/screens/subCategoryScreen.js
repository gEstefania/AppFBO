import { FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {PrimaryText} from '@common';
import {getTopics} from '@firestore/topic';
import styles from './styles/categoryScreen';
import Colors from '@common';

const SubCategory = ({route, navigation}) => {
  const dataList = route.params?.data;
  const color = route.params?.color || Colors.CORPORATE_ORANGE;
  const catId = route.params?.catId;
  const subCatId = route.params?.subCatId;
  const [ topics, setTopics ] = useState([]);

  useEffect(() => { 
    getData() 
  }, []);

  const getData=async()=>{
    try {
        let res = await getTopics(catId, subCatId)
        console.log('res', res);
        let topicList = []
        res.forEach(doc=>{
          topicList.push({id:doc.id,...doc.data()})
        })
        setTopics(topicList)
    }catch(e){
        console.log(e)
    }
  }

  const renderList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Topic", {
          title: item.name,
          color: color,
          catId: catId,
          subCatId: subCatId,
          topicId: item.id,
          }
        )}
        style={[styles.btnSteps, {backgroundColor: color,}]}
      >
        <PrimaryText color={'#fff'} style={styles.btnText}>{item.name}</PrimaryText>
      </TouchableOpacity>
    );
  };
  return(
    <View style={styles.mainContainer}>
      <PrimaryText color={color} style={styles.titleArticle}>{route.params?.title}</PrimaryText>
      <FlatList
        data={topics}
        renderItem={renderList}
        //keyExtractor={item => item.id}
        numColumns={2}
        style={styles.btnList}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
    </View>
  )
}

export default SubCategory;