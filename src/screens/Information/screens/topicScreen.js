import { FlatList, TouchableHighlight, View, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import {PrimaryText} from '@common';
import {getArticles} from '@firestore/article';
import styles from './styles/topicScreen';

const Topic = ({route, navigation}) => {
  const color = route.params.color;
  const catId = route.params.catId;
  const subCatId = route.params.subCatId;
  const topicId = route.params.topicId;
  const [ articles, setArticles ] = useState([]);

  useEffect(() => { 
    getData();
  }, []);

  const getData=async()=>{
    try {
      console.log(catId, subCatId, topicId);
        let res = await getArticles(catId, subCatId, topicId)
        console.log('res:', res);
        let articleList = []
        res.forEach(doc=>{
          articleList.push({id:doc.id,...doc.data()})
        })
        setArticles(articleList)
    }catch(e){
        console.log(e)
    }
  }

  const renderList = ({item}) => {
    return (
      <TouchableHighlight
        underlayColor={hexToRGBA(color, .2)}
        style={styles.btnArticle}
        onPress={() => navigation.navigate("Article", {
          title: item.title,
          body: item.body,
          color,
          }  
        )} 
      >
        <View style={styles.btnContainer}>
          <View style={[styles.circle, {backgroundColor: color}]}></View>
          <PrimaryText color={'#000'}>{item.title}</PrimaryText>
          <Image/>
        </View>
      </TouchableHighlight>
    );
  };

  empty = () => <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
    <PrimaryText>Sin Artículos...</PrimaryText>
    </View>

  function hexToRGBA(hex, opacity) {
    return 'rgba(' + (hex = hex.replace('#', ''))
    .match(new RegExp('(.{' + hex.length/3 + '})', 'g'))
    .map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16) })
    .concat(isFinite(opacity) ? opacity : 1)
    .join(',') + ')';
  }

  return(
    <View style={styles.mainContainer}>
      <View style={[styles.banner, {backgroundColor: color}]}>
        <PrimaryText color={'#fff'} style={styles.bannerTitle}>{route.params.title}</PrimaryText>
      </View>
      <FlatList
        data={articles}
        ListEmptyComponent={empty}
        renderItem={renderList}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default Topic;