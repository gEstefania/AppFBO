import { FlatList, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryText } from '@common';
import { getArticles } from '@firestore/category';
import { setSubcategory } from '../../../redux/actions/subcategoriesActions';
import { setCurrentArticle } from '../../../redux/actions/selectedArticleActions';
//import { getTopics } from '@firestore/topic';
import styles from './styles/card';

const Card = ({ title, catId, catDesc, cardColor, img, navigation }) => {
  //const [subCategory, setSubCategory] = useState([]);
  //const [articles, setArticles] = useState([]);
  //const [topics, setTopics] = useState([]);
  const articles = useSelector(state => state.currentArticle)
  const dispatch = useDispatch();

  useEffect(() => {
    //getData()
    console.log('cat id', catId);
    const subscriberFirebase = getArticles(catId)
    console.log('ARTICLES: ', articles);
    return ()=>{
      subscriberFirebase()
      
    } 
  
  }, []);

  const getData = async () => {
    try {
      let res = await getDataFromCategory(catId)
      //Set Subcategories:
      let subcategoryList = []
      res[0].data.forEach(doc => {
        subcategoryList.push({ id: doc.id, ...doc.data(), type: 'subcategory' })
      })
      setSubCategory(subcategoryList)
      //console.log('id de la subcat', subCategory[0].id);
      //Set Articles:
      let articlesList = []
      res[1].data.forEach(doc => {
        articlesList.push({ id: doc.id, ...doc.data(), type: 'article' })
      })
      //dispatch(setSubcategory)
      setArticles(articlesList)

    } catch (e) {
      console.log('error en get data en card', e)
    }
  }

  const onButtonPress = async (item) => {
    // console.log('ITEM', item);
    // if (item.type === 'article') {
    //   navigation.navigate("Article", {
    //     title: item.title,
    //     body: item.body,
    //     color: cardColor,
    //   }
    //   )
    // }
    // if (item.type === 'subcategory') {
    //   console.log('FOR EACH', item.id);
    //   //Set Topics:
    //   let resTopic = await getTopics(catId, item.id);
      
    //   console.log('resTopic', resTopic);
      // let topicList = []
      // resTopic.forEach(doc => {
      //   topicList.push({ id: doc.id, ...doc.data() })
      // })
      // setTopics(topicList)

      // navigation.navigate("Subcategory", {
      //   title: item.name,
      //   color: cardColor,
      //   catId: catId,
      //   subCatId: item.id,
      //   topics: topics,
      //   }
      // )
    //}
  }

  const renderList = ({ item }) => {
    console.log('ITEM: ', item);
    return (
      <TouchableOpacity
        onPress={() => onButtonPress(item)}
        style={[styles.cardView, { backgroundColor: cardColor }]}
      >
        <PrimaryText type={'Regular'} color={'#fff'} style={styles.cardTitle}>{item.title || item.name}</PrimaryText>
      </TouchableOpacity>

    );
  };

  const navigateTo = () => {
    // const art = articles.map(item => item.type === 'article')
    // console.log(art);
    // if (art.length !== 0) {
    //   navigation.navigate("Topic", {
    //     title: title,
    //     color: cardColor,
    //     articles: articles,
    //     catId: catId,
    //     subCatId: '',
    //   }
    //   )
    // }
    // const subs = subCategory.map(item => item.type === 'subcategory')
    // console.log('subs', subs);
    // if (subs.length !== 0) {
    //   navigation.navigate("Category", {
    //     title: title,
    //     color: cardColor,
    //     subCategories: subCategory,
    //     catDesc: catDesc,
    //     catId: catId,
    //     image: img
    //   }
    //   )
    // }
  }

  return (
    <View style={styles.mainContainer}>

      <View style={styles.titleContainer}>
        <PrimaryText color={cardColor} style={styles.titleSection}>{title}</PrimaryText>
        <TouchableOpacity
          onPress={() => navigateTo()}
        >
          <PrimaryText color={cardColor} style={styles.cardText}>Ver todo</PrimaryText>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={articles}
        renderItem={renderList}
      //keyExtractor={item => item.id}
      />
    </View>
  )
}

export default Card;