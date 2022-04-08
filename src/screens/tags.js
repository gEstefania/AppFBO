import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, useWindowDimensions, Image } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/tags';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackActions } from '@react-navigation/native';
import {getAllTags} from '@firestore/tagsPreferences';
import {editMyTags} from '@firestore/user'
import { showMessage } from 'react-native-flash-message';
import {login} from '../redux/actions/userActions'
import { connect } from 'react-redux';
import {IconFlechaDark} from '@icons';
import { LogoApp } from '@icons';

const Tags = ({navigation,login}) => {
    const [selectedTags, setSelectedTags] = useState([]);
    const [tags,setTags]=useState([]);
    const {width} = useWindowDimensions();

    useEffect(()=>{
        getData()
    },[])  
    
    const getData=async()=>{
        try {
            let res = await getAllTags()
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
            let res = await editMyTags(selectedTags)
            showMessage({
                message:"Preferencias actualizadas.",
                description:"Sus categorias preferidas se han guardado exitosamente.",
                icon:"success",
                type:"success",
                duration:1000
            })
            console.log("UPDATED USER", {id:res.id,...res.data()})
            login({id:res.id,...res.data()})
            navigation.dispatch(
                StackActions.replace('Home')
              );
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
                    flexGrow: 0.5,
                    backgroundColor:  itemFound?.selected ? '#ff5f00' : '#ff9b04',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 25,
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
                end={{ x: 3.5, y: 5 }}
                locations={[0.2, 0.3]}
            >
                <LogoApp width={300} height={150} />
            </LinearGradient>
            
            </View>
            <View style={styles.body}>
                <View style={styles.row}>
                    <SecondaryText color={'gray'}>¿Qué te interesa?</SecondaryText>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Home")}
                    >
                        <SecondaryText color={'gray'}>Saltar</SecondaryText>
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
                    <IconFlechaDark width={17} height={17} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
dispatchStateToProps={
    login
}
export default connect(null,dispatchStateToProps) (Tags);