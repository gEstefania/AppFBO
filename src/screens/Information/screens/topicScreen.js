import { FlatList, TouchableHighlight, View, Image, Text} from 'react-native';
import React, { useEffect, useState } from 'react';
import {PrimaryText, SecondaryText} from '@common';
import {getArticles} from '@firestore/article';
import styles from './styles/topicScreen';
import { countWords } from '../../../utils/tools';
import { IconFlechaOrange } from '@icons';

const Topic = ({route, navigation}) => {
  const color = route.params.color;
  const catId = route.params.catId;
  const subCatId = route.params.subCatId;
  const topicId = route.params.topicId;
  const [ articles, setArticles ] = useState([]);

  useEffect(() => { 
    if (!route.params.articles){
      getData();
    } else {
      setArticles(route.params.articles);
    }
  }, []);

  const getData=async()=>{
    try {
      console.log(catId, subCatId, topicId);
        let res = await getArticles(catId, subCatId, topicId)
        // console.log('res:', res);
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
          ...item
          }  
        )} 
      >
        <View style={styles.btnContainer}>
          <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
            <View style={[styles.circle, {backgroundColor: color}]}></View>
            {countWords(item.title) > 2 ? (
              <SecondaryText style={{maxWidth: 280}} color={'#000'}>{item.title?.substring(0,15)}...</SecondaryText>
          ) : (
            <SecondaryText style={{maxWidth: 280}} color={'#000'}>{item.title}</SecondaryText>
          )}
            
          </View>
          <View style={{alignContent: 'flex-end'}}>
            <IconFlechaOrange width={20} height={20}/>
          </View>
          
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
      { route.params.articles ? ( // si viene un parametro articles mostrame el texto simple
        <PrimaryText style={styles.topicTitle}><Text style={{color: color}}>{route.params.title}</Text></PrimaryText>
      ) : (// sino pues dale con el texto completo en el banner
      <View style={[styles.banner, {backgroundColor: color}]}> 
        { countWords(route.params.title) > 6 ? (
            <PrimaryText color={'#fff'} style={styles.bannerTitleMini}>{route.params.title}</PrimaryText>
          ) : (
            <PrimaryText color={'#fff'} style={styles.bannerTitle}>{route.params.title}</PrimaryText>
        )}
      </View>
      )}
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