import { FlatList, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { PrimaryText, SecondaryText } from '@common';
import { getDataFromSubCategory } from '@firestore/category';
import styles from './styles/subcategoryScreen';
import { ScrollView } from 'react-native-gesture-handler';

const Category = ({ route, navigation }) => {
  const color = route.params.color;
  const dataSubCategories = route.params.subCategories;
  const description = route.params.catDesc;
  const catId = route.params.catId;
  //const subCatId = route.params.subCatId;
  const image = { uri: route.params.image }
  const [topics, setTopics] = useState([]);
  const [subCatId, setSubCatId] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnPressed, setIsBtnPressed] = useState(false);

  // useEffect(() => {
  //   getData()
  // }, []);

  useEffect(() => {
    if(isBtnPressed) {
      navigateTo()
    }
  }, []);

  const getData = async (subCatId) => {
    console.log('CATEHORIA', dataSubCategories);
    try {
      let res = await getDataFromSubCategory(catId, subCatId)
      console.log('res: ', res);
      //Set Temas:
      let topicList = []
      res[0].data.forEach(doc => {
        topicList.push({ id: doc.id, ...doc.data(), type: 'topic' })
      })
      setTopics(topicList)
      console.log('TEMAS: ', topics)
      //Set Articles:
      let articlesList = []
      res[1].data.forEach(doc => {
        articlesList.push({ id: doc.id, ...doc.data(), type: 'article' })
      })
      setArticles(articlesList)
      console.log('ARTICULOS: ', articles)
    } catch (e) {
      console.log(e)
    }
  }

  const navigateTo = (item) => {

    getData(item.id)

    const art = articles.map(item => item.type = 'article')
    console.log(art);
    if (art.length !== 0) {
      navigation.navigate("Topic", {
        title: item.name,
        color: color,
        articles: articles,
        catId: catId,
        subCatId: item.id
      }
      )
    }
    const subs = topics.map(item => item.type = 'topic')
    console.log('subs', topics);
    if (subs.length !== 0) {
      navigation.navigate("Subcategory", {
        title: item.name,
        color: color,
        topics: topics,
        catId: catId,
        //subCatId: item.id
      }
      )
    }

  }

  const renderList = ({ item }) => {
    console.log('LOG', item.id);
    setSubCatId(item.id)
    return (
      <TouchableOpacity
        onPress={() => {
          navigateTo(item);
          setIsBtnPressed(true);
        }}
        style={[styles.btnArticle, { backgroundColor: color }]}
      >
        <PrimaryText color={'#fff'} style={styles.btnText}>{item.name || item.title}</PrimaryText>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainContainer}>
      <PrimaryText style={styles.topicTitle}>Ayuda <Text style={{ color: color }}>{route.params.title}</Text></PrimaryText>
      <ImageBackground
        resizeMode="cover"
        style={styles.imageBackground}
        source={image}>
        <SecondaryText color={'#fff'} style={styles.imageText}>{description}</SecondaryText>
      </ImageBackground>
      <FlatList
        data={dataSubCategories}
        renderItem={renderList}
        keyExtractor={item => item.id}
        style={styles.bntList}
      />
    </ScrollView>
  )
}

export default Category;