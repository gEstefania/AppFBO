import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Keyboard } from "react-native";
import auth from '@react-native-firebase/auth';
import { PrimaryText, SecondaryText } from '@common';
import Modal from "react-native-modal";
import styles from './styles/searchScreen';
import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux';
import { setCurrentCourse } from '../redux/actions/selectedCourseActions';
import { setCurrentArticle } from '../redux/actions/selectedArticleActions';
import { useNavigation } from '@react-navigation/core';
import {IconBuscar} from '@icons';

const SearchScreen = (props) => {
    const navigation = useNavigation()
    const [searchText, setSearchText] = useState('');
    const [courses, setCourses] = useState([]);
    const [articles, setArticles] = useState([]);
    const [filterCourses,setFilterCourses]=useState([]);
    const [filterArticle,setFilterArticles]=useState([]);
    const [userAuth, setUserAuth] = useState();
    const [isAnonymousModalVisible, setAnonymousModalVisible] = useState(false);

    function onAuthStateChanged(userAuth) {
        setUserAuth(userAuth);
    }
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return ()=>{
            subscriber();
          } ; // unsubscribe on unmount
    }, [])

    useEffect(() => {
        let coursesSubscribe = firestore()
            .collection("Courses")
            .where('enabled', '==', true)
            //.orderBy('createdAt', 'asc')
            .onSnapshot(documentSnapshot => {
                if (documentSnapshot) {
                    setCourses(documentSnapshot.docs.map(doc => ({ type:0, id: doc.id, ...doc.data(), users: doc.data()?.users?.length ? doc.data().users.length : 0 })))
                }
            })

        let articlesSubscribe = firestore()
            .collection("Articles")
            .where('enabled', '==', true)
            //.orderBy('createdAt', 'asc')
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
            
            setFilterArticles(articles.filter(article=>{
                let nTitle = article.title.toLowerCase()
                nTitle = nTitle.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                
                let nSearch = searchText.toLowerCase()
                nSearch=nSearch.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                return nTitle.includes(nSearch)
                
            }))
            setFilterCourses(courses.filter(course=>{
                let nTitle = course.title.toLowerCase()
                nTitle= nTitle.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                let nSearch = searchText.toLowerCase()
                nSearch=nSearch.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                return nTitle.includes(nSearch)
            }))
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

    const search = () => {
        if(userAuth.isAnonymous == true){
            setAnonymousModalVisible(!isAnonymousModalVisible);
        }
    }
    
    const onSignUpButtonPress = () => {
        try {
          auth().signOut()
        } catch (error) {
          console.log(error);
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <IconBuscar width={30} height={30}/>
                <PrimaryText style={styles.titleSize}>Buscar</PrimaryText>
            </View>
            <View style={styles.shadow}></View>
            <View style={styles.inputContainer}>
                <TextInput
                onPressIn={() => search()}
                    //onPress={() => search()}
                    placeholder="Busca un tema"
                    placeholderTextColor='gray'
                    style={styles.input}
                    onChangeText={text => setSearchText(text)}
                    autoCapitalize={'sentences'}
                    value={searchText}
                    onSubmitEditing={()=>{Keyboard.dismiss}}
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
            <Modal
                isVisible={isAnonymousModalVisible}
                onBackdropPress={() => setAnonymousModalVisible(false)}
                swipeDirection="left"
            >
                <View style={styles.modal}>
                    <PrimaryText style={styles.modalTitle}>¿No tienes cuenta?</PrimaryText>
                    <SecondaryText style={styles.modalDetail}>Regístrate para poder vizualizar todo nuestro contenido</SecondaryText>
                    <View style={{width: '100%',}}>
                        <TouchableOpacity
                            onPress={() => onSignUpButtonPress()}
                            style={styles.btnModal}
                        >
                        <PrimaryText color={'#fff'}>REGÍSTRATE</PrimaryText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
const dispatchStateToProps={
    setCurrentCourse:setCurrentCourse,
    setCurrentArticle:setCurrentArticle
}
  

export default connect(null,dispatchStateToProps) (SearchScreen);