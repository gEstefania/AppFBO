import React, { useEffect, useState } from 'react';
import { View, Image, TextInput, FlatList } from "react-native";
import { PrimaryText, SecondaryText } from '@common';
import styles from './styles/searchScreen';
import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux';
import { setCurrentCourse } from '../redux/actions/selectedCourseActions';
import { setCurrentArticle } from '../redux/actions/selectedArticleActions';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SearchScreen = (props) => {
    const navigation = useNavigation()
    const [searchText, setSearchText] = useState('');
    const [courses, setCourses] = useState([]);
    const [articles, setArticles] = useState([]);
    const [filterCourses,setFilterCourses]=useState([]);
    const [filterArticle,setFilterArticles]=useState([]);


    useEffect(() => {
        let coursesSubscribe = firestore()
            .collection("Courses")
            .orderBy('createdAt', 'asc')
            .onSnapshot(documentSnapshot => {
                if (documentSnapshot) {
                    setCourses(documentSnapshot.docs.map(doc => ({ type:0, id: doc.id, ...doc.data(), users: doc.data()?.users?.length ? doc.data().users.length : 0 })))
                }
            })

        let articlesSubscribe = firestore()
            .collection("Articles")
            .orderBy('createdAt', 'asc')
            .onSnapshot(documentSnapshot => {
                if (documentSnapshot) {
                    setArticles(documentSnapshot.docs.map(doc => ({type:1, id: doc.id, ...doc.data()})))
                }
            })

        return () => {
            coursesSubscribe()
            articlesSubscribe()
        }
    }, [])

    useEffect(() => {
        if(searchText.length>0){
            setFilterArticles(articles.filter(article=>article.title.includes(searchText)))
            setFilterCourses(courses.filter(course=>course.title.includes(searchText)))
        }else{
            setFilterArticles([])
            setFilterCourses([])
        }
    },[searchText])


    const renderItem = ({item})=>{
        return(
            <TouchableOpacity
                style={{alignItems:'center', flexDirection: 'row'}}
                onPress={()=>{
                    if(item.type===0){
                        navigation.navigate("TopMenu")
                        props.setCurrentCourse(item)
                    }else{
                        navigation.navigate('Article')
                        props.setCurrentArticle(item)
                    }
                }}
            >
                <View style={{width: 10, height: 10, backgroundColor:'gray', borderRadius: 50,}}></View>
                <SecondaryText
                    style={{
                        marginStart:32,
                        paddingVertical:16,
                        fontSize:16,
                    }} 
                    color={"#A9A9A9"}>
                    {item.title}
                </SecondaryText>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Image source={require('../assets/img/icons/home.jpg')} style={styles.icon} />
                <PrimaryText>Buscar</PrimaryText>
            </View>
            <View style={styles.shadow}></View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Busca un tema"
                    placeholderTextColor='gray'
                    style={styles.input}
                    onChangeText={text => setSearchText(text)}
                    autoCapitalize={'sentences'}
                    value={searchText}
                />
            </View>
            <View style={styles.resultContainer}>
                <FlatList
                    ListHeaderComponent={<PrimaryText>
                        {`(${[...filterArticle,...filterCourses].length}) Resultados para: ${searchText}`}
                    </PrimaryText>}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    data={[...filterArticle,...filterCourses]}
                />
            </View>
        </View>
    )
}
const dispatchStateToProps={
    setCurrentCourse:setCurrentCourse,
    setCurrentArticle:setCurrentArticle
}
  

export default connect(null,dispatchStateToProps) (SearchScreen);