import { FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {PrimaryText} from '@common';
import {getDataFromSubCategory} from '@firestore/category';
import styles from './styles/categoryScreen';
import Colors from '@common';

const SubCategory = ({route, navigation}) => {
  //const dataList = route.params?.data;
  const color = route.params?.color || Colors.CORPORATE_ORANGE;
  const catId = route.params?.catId;
  const subCatId = route.params?.subCatId;
  const dataTopics = route.params?.topics;
  const [ topics, setTopics ] = useState([]);

  const onButtonPress= (item) => {
    navigation.navigate("Topic", {
      title: item.name,
      color,
      catId,
      subCatId,
      topicId: item.id
      }
    ) 
  }

  const renderList = ({item}) => {
    console.log('sssss', dataTopics);
    return (
      <TouchableOpacity
        onPress={() => onButtonPress(item)}
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
        data={dataTopics}
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