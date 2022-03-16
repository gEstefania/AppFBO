import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import auth from '@react-native-firebase/auth';
import {unsubscribeUser, getUserData} from '@firestore/user';
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/profileScreen';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore'
import PreferenceTag from '@components/PreferenceTag'
import { useNavigation } from '@react-navigation/core';
import {editMyTags} from '@firestore/user'
import Icon from 'react-native-vector-icons/Entypo';
import {unregisterDevice} from '@firestore/user';
import {IconBaja, IconCerrar, IconDatos, IconEditar, IconMas, IconIntereses, IconPerfil} from '@icons';

const ProfileScreen = (props) => {
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState({ name: '', email: '' });
    const [user,setUser]=useState(null)
    const [tags,setTags]=useState([])

    useEffect(() => {
        if(props.user){
            const suscriber = firestore()
            .collection("Users")
            .doc(props.user.id)
            .onSnapshot(dataSnapshot => {
                if(dataSnapshot.exists){
                    setTags([])
                    let dUser = dataSnapshot.data()
                    console.log('dUser: ',dUser);
                    setUser(user)
                    dUser.myTags?.forEach(async doc=>{
                        let dTag = await firestore().doc(doc.path).get()
                        setTags(oldTags=>[...oldTags,{id:dTag.id,...dTag.data()}])
                    })
                      
                }
            })
            
            return suscriber 
        }
        
    },[props.user])

    useEffect(() => { 
        getData() 
    }, []);
    
    const getData=async()=>{
        try {
            let res = await getUserData()
            setUserInfo({name: res.name, email: res.email})
        }catch(e){
            console.log(e)
        }
    }

    const confirmDeleteUser=()=>{
        Alert.alert("¡Atención!","Tu cuenta se eliminará, esta acción no se puede deshacer, ¿Deseas continuar?",
        [
            {
              text: "Cancel",
              style: "cancel"
            },
            { text: "OK", onPress: () => onUnsubscribeButtonPress() }
          ]
        )
    }
    
    const onUnsubscribeButtonPress = async () => {
        
        try {
            await unsubscribeUser()
            auth().signOut().then(() => console.log('User signed out!'));
        }catch(e){
            console.log(e)
        }
    }

    async function onLogOutButtonPress() {
        try {
            //await GoogleSignin.revokeAccess();
            //await GoogleSignin.signOut();
            auth().signOut().then(() => console.log('User signed out!'));
            await unregisterDevice()

        } catch (error) {
            console.error(error);
        }
        
    }
    const deleteTag=async(tagId)=>{
        let filter  = tags.filter(tag=>tag.id !== tagId)
        await editMyTags(filter)
    }
    return (
        <View style={styles.mainContainer}>
            <SafeAreaView></SafeAreaView>
            <View style={styles.headerContainer}>
                <IconPerfil width={30} height={30} style={{marginBottom: 10}}/>
                <PrimaryText style={styles.titleSize}>Mi perfil</PrimaryText>
            </View>
            <View style={styles.shadow}></View>
            <View style={styles.userData}>
                <View style={styles.row}>
                    <View style={styles.sectionTitle}>
                        <IconDatos width={17} height={17} />
                        <PrimaryText style={styles.title}>Datos</PrimaryText>
                    </View>
                    <TouchableOpacity>
                        <IconEditar width={15} height={15} />
                    </TouchableOpacity>
                </View>
                <View>
                    <SecondaryText color={'gray'}>{userInfo.name}</SecondaryText>
                    <SecondaryText color={'gray'}>{userInfo.email}</SecondaryText>
                </View>
            </View>
            <View style={styles.bar}></View>
            <View style={styles.userTags}>
                <View style={styles.row}>
                    <View style={styles.sectionTitle}>
                        <IconIntereses width={17} height={17} />
                        <PrimaryText style={styles.title}>Intereses</PrimaryText>
                    </View>
                    <TouchableOpacity
                    onPress={()=>navigation.navigate("TagsPreferences")}
                    >
                        <IconMas width={17} height={17} />
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:"row", flexWrap: 'wrap'}}>
                    {tags&&tags.map(tag=>(
                        <PreferenceTag onDeleteTag={deleteTag} key={tag.id} {...tag} />
                    ))}
                </View>
            </View>
            <View style={styles.bar}></View>
            <TouchableOpacity 
                style={styles.btnRow}
                onPress={confirmDeleteUser}
                >
                <IconBaja width={17} height={17} />
                <PrimaryText style={styles.title}>Darme de baja</PrimaryText>
            </TouchableOpacity>
            <View style={styles.bar}></View>
            <TouchableOpacity
                style={styles.btnRow}
                onPress={() => onLogOutButtonPress()}
            >
                <IconCerrar width={17} height={17} />
                <PrimaryText style={styles.title}>Cerrar sesión</PrimaryText>
            </TouchableOpacity>
            <View style={styles.bar}></View>
        </View>
    )
}

const mapStateToProps=(state)=>({
    user:state.users
})
export default connect(mapStateToProps) (ProfileScreen);