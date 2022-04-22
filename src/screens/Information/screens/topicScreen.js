import { FlatList, TouchableHighlight, View, Image, Text} from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
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
  const [userAuth, setUserAuth] = useState();
  const [ publicArticles, setPublicArticles ] = useState([]);
  const [ privateArticles, setPrivateArticles ] = useState([]);

  function onAuthStateChanged(userAuth) {
    setUserAuth(userAuth);
    console.log('HOLA', userAuth.isAnonymous);
  }
  useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return ()=>{
          subscriber();
        } ; // unsubscribe on unmount
  }, [])

  useEffect(() => { 
    if (!route.params.articles){
      getData();
      console.log('GETDATA');
    } else {
      console.log('NO GETDATA');
      setPublicArticles(route.params.articles);
    }
  }, []);

  const getData=async()=>{
    try {
      console.log(catId, subCatId, topicId);
        let res = await getArticles(catId, subCatId, topicId)
        console.log('res:', res);
        let publicArticleList = []
        let privateArticleList = []
        res[0].forEach(doc=>{
          publicArticleList.push({id:doc.id,...doc.data()})
        })
        res[1].forEach(doc=>{
          privateArticleList.push({id:doc.id,...doc.data()})
        })
        console.log('PRIVADOS', privateArticleList);
        console.log('PUblicos', publicArticleList);
        setPublicArticles(publicArticleList)
        setPrivateArticles(privateArticleList)
        //console.log('TODOS LOS ARTS', articles);
    }catch(e){
        console.log('ERROR EN TOPIC',e)
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
            {countWords(item.title) > 6 ? (
              <SecondaryText style={{maxWidth: 200}} color={'#000'}>{item.title?.substring(0,30)}...</SecondaryText>
          ) : (
            <SecondaryText style={{maxWidth: 200}} color={'#000'}>{item.title}</SecondaryText>
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
      { userAuth?.isAnonymous ? (
      <FlatList
        data={publicArticles}
        ListEmptyComponent={empty}
        renderItem={renderList}
        keyExtractor={item => item.id}
      />
      ) : (
        <FlatList
          data={privateArticles.concat(publicArticles)}
          ListEmptyComponent={empty}
          renderItem={renderList}
          keyExtractor={item => item.id}
        />
      )
      }
    </View>
  )
}

export default Topic;