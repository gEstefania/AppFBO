import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, useWindowDimensions, Image } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/tags';
import { SafeAreaView } from 'react-native-safe-area-context';
import {getAllCategories} from '@firestore/category';
import {editCategories} from '@firestore/user'
import { showMessage } from 'react-native-flash-message';

const Tags = ({navigation}) => {
    const [selectedTags, setSelectedTags] = useState([]);
    const [tags,setTags]=useState([]);
    const {width} = useWindowDimensions();

    useEffect(()=>{
        getData()
    },[])  
    
    const getData=async()=>{
        try {
            let res = await getAllCategories()
            let tmpArray = []
            res.forEach(doc=>{
                tmpArray.push({id:doc.id,...doc.data()})
            })
            setTags(tmpArray)
        }catch(e){
            console.log(e)
        }
    }

    const updateTagsUser=async()=>{
        try{
            let res = await editCategories(selectedTags)
            showMessage({
                message:"Preferencias actualizadas.",
                description:"Sus categorias preferidas se han guardado exitosamente.",
                icon:"success",
                type:"success",
                duration:1000
            })
            navigation.navigate("Home")
        }catch(e){
            console.log(e)
        }
    }
    

    const renderList = ({item, index}) => {
            const itemFound = selectedTags.find(tag => tag.id === item.id);
            return (
                <TouchableOpacity
                    onPress={() => onSelectTag(item)}
                    activeOpacity={0.8}
                    style={{
                    marginBottom: 10,
                    marginRight: index % 2 !== 0 ? 0 : 10,
                    flexGrow: 1,
                    backgroundColor:  itemFound?.selected ? 'red' : 'orange',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 10,
                    //maxWidth: width / 2 - 20,
                    width: item.name?.length <= 5 ? width / 2 - 100 : width / 2 - 30,
                    }}>
                    <PrimaryText color={'#fff'} style={{textAlign: 'center'}}>{item.name}</PrimaryText>
                </TouchableOpacity>
            );
    };

        const onSelectTag = (tag) => {
            const idxFound = selectedTags.findIndex(item => item.id === tag.id);
        
            if(idxFound >= 0) {
                setSelectedTags(prevState => prevState.filter(item => item.id !== selectedTags[idxFound].id))
            } else {
                setSelectedTags(prevState => prevState.concat({...tag, selected: true}));
            }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
            <LinearGradient
                colors={['#ff9b04', '#ff000a' ]}
                style={styles.LinearGradientView}
                start={{ x: 0, y: 0 }}
                end={{ x: 1.4, y: 1.4 }}
                locations={[0.2, 0.4]}
            >
                <Image style={{width: 250, height: 70}} source={require('../assets/img/logo.png')}/>
            </LinearGradient>
            
            </View>
            <View style={styles.body}>
                <View style={styles.row}>
                    <SecondaryText>¿Qué te interesa?</SecondaryText>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Home")}
                    >
                        <SecondaryText>Saltar</SecondaryText>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={tags  }
                    contentContainerStyle={{flexGrow: 1}}
                    numColumns={2}
                    keyExtractor={item => item.id}
                    renderItem={renderList}
                />
                <TouchableOpacity
                        onPress={updateTagsUser}
                        style={styles.btnSave}
                    >
                        <SecondaryText>Guardar</SecondaryText>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

export default Tags;