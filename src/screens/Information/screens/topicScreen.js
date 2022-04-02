import { FlatList, TouchableHighlight, View, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import {PrimaryText} from '@common';
import {getArticles} from '@firestore/article';
import styles from './styles/topicScreen';

const Topic = ({route, navigation}) => {
  const data = route.params.articles;
  const color = route.params.color;
  const title = route.params.title;
  const [ articles, setArticles ] = useState([]);

  useEffect(() => { 
    setArticles(data)
  }, []);

  const renderList = ({item}) => {
    return (
      <TouchableHighlight
        underlayColor={hexToRGBA(color, .2)}
        style={styles.btnArticle}
        onPress={() => navigation.navigate("Article", {
          item,
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

  const empty = () => <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
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
        <PrimaryText color={'#fff'} style={styles.bannerTitle}>{title}</PrimaryText>
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