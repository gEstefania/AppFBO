import { FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {PrimaryText} from '@common';
import {getDataFromSubCategory} from '@firestore/category';
import styles from './styles/categoryScreen';
import Colors from '@common';
import { countWords } from '../../../utils/tools';

const SubCategory = ({route, navigation}) => {
  //const dataList = route.params?.data;
  const color = route.params?.color || Colors.CORPORATE_ORANGE;
  const catId = route.params?.catId;
  const subCatId = route.params?.subCatId;
  const [ topics, setTopics ] = useState([]);
  const [ articles, setArticles ] = useState([]);

  useEffect(() => { 
    getData()
  }, []);

  const getData=async()=>{
    try {
      let res = await getDataFromSubCategory(catId, subCatId)
      //Set Subcategories:
      let topicList = []
      res[0].data.forEach(doc=>{
        topicList.push({id:doc.id,...doc.data(), type: 'topic'})
      })
      setTopics(topicList)
      // console.log('topics...: ', topicList)

      //Set Articles:
      let articlesList = []
      res[1].data.forEach(doc=>{
        articlesList.push({id:doc.id,...doc.data(), type: 'article'})
      })
      setArticles(articlesList)
      // console.log('ARTICULOS...: ', articlesList)
    }catch(e){
      console.log(e)
    }
  }
  const onButtonPress= (item) => {
    if(item.type== 'article'){
      navigation.navigate("Article", {
        title: item.title,
        body: item.body,
        color: color,
        ...item
        }
      )
    }
    if(item.type== 'topic'){
      navigation.navigate("Topic", {
        title: item.name,
        color,
        catId,
        subCatId,
        topicId: item.id,
        ...item
        }
      )
    }
  }

  const renderList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onButtonPress(item)}
        style={[styles.btnSteps, {backgroundColor: color,}]}
      >
        {countWords(item.name) > 6 ? (
          <PrimaryText color={'#fff'} style={styles.btnText}>{ item.name.substring(0,25) || item.name.substring(0,25) }...</PrimaryText>
        ) : (
          <PrimaryText color={'#fff'} style={styles.btnText}>{item.name || item.title}</PrimaryText>
        )}
      </TouchableOpacity>
    );
  };
    return(
      <View style={styles.mainContainer}>
        <PrimaryText color={color} style={styles.titleArticle}>{route.params?.title}</PrimaryText>
        { articles.length === 0 && topics.length === 0 && (
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>
            <PrimaryText color={ 'grey' }>No hay nada que mostrar.</PrimaryText>
          </View>
        )}
  
        <FlatList
          data={articles.concat(topics)}
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