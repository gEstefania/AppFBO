import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import auth from '@react-native-firebase/auth';
import Modal from "react-native-modal";
import { useDispatch } from 'react-redux';
import {unsubscribeUser, getUserData, updateUserName} from '@firestore/user';
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/profileScreen';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore'
import PreferenceTag from '@components/PreferenceTag'
import { useNavigation } from '@react-navigation/core';
import {editMyTags} from '@firestore/user'
import { logout } from '../redux/actions/userActions';
import {unregisterDevice} from '@firestore/user';
import {IconBaja, IconCerrar, IconDatos, IconEditar, IconMas, IconIntereses, IconPerfil} from '@icons';

const ProfileScreen = (props) => {
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState({ name: '', email: '' });
    const [user,setUser]=useState(null)
    const [tags,setTags]=useState([])
    const [isModalVisible, setModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if(props.user){
            const suscriber = firestore()
            .collection("Users")
            .doc(props.user.id)
            .onSnapshot(dataSnapshot => {
                if(dataSnapshot.exists){
                    setTags([])
                    let dUser = dataSnapshot.data()
                    //console.log('User: ',props);
                    setUser(user)
                    dUser.myTags?.forEach(async doc=>{
                        console.log('doc', doc);
                        let dTag = await firestore().doc(doc.path).get()
                        console.log('dtag', dTag);
                        setTags(oldTags=>[...oldTags,{id:dTag.id,...dTag.data()}])
                        console.log('id', dTag.data().removed);
                        if(dTag.data().removed==true){
                            deleteTagRemoved(dTag.id)
                        }
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
            console.log(res);
            setUserInfo({name: res.name, email: res.email})
        }catch(e){
            console.log(e)
        }
    }
    const editUserName=async()=>{
        try {
            if (userInfo.name !== '') {
                await updateUserName(userInfo.name)
                setEditModalVisible(false)
            }
        }catch(e){
            console.log(e)
        }
    }

    const confirmDeleteUser=()=>{
        setModalVisible(!isModalVisible);
    }
    const confirmLogoutUser=()=>{
        setLogoutModalVisible(!isLogoutModalVisible);
    }
    const confirmEditUserInfo=()=>{
        setEditModalVisible(!isEditModalVisible);
    }

    const onUnsubscribeButtonPress = async () => {
        try {
            await unsubscribeUser()
            dispatch(logout())
            auth().signOut().then(() => console.log('User signed out!'));
        }catch(e){
            console.log(e)
        }
    }

    async function onLogOutButtonPress() {
        try {
            //await GoogleSignin.revokeAccess();
            //await GoogleSignin.signOut();
            //Redux:
            dispatch(logout())
            setUserInfo({ name: '', email: '' })
            setUser(null)
            auth().signOut().then(() => console.log('User signed out!'));
            await unregisterDevice()
        } catch (error) {
            console.error(error);
        }
    }

    const deleteTagRemoved =async (tagId)=>{
        
        let filter  = tags.filter(tag=>tag.id !== tagId)
        await editMyTags(filter)
    }

    const deleteTag=async(tagId)=>{
        let filter  = tags.filter(tag=>tag.id !== tagId)
        await editMyTags(filter)
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
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
                    <TouchableOpacity
                        onPress={() => confirmEditUserInfo()}
                    >
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
                    onPress={()=>navigation.navigate("Preferences", {userSelectedTags: tags})}
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
                onPress={() => confirmLogoutUser()}
            >
                <IconCerrar width={17} height={17} />
                <PrimaryText style={styles.title}>Cerrar sesión</PrimaryText>
            </TouchableOpacity>
            <View style={styles.bar}></View>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
                swipeDirection="left"
                >
                <View style={styles.modal}>
                    <PrimaryText>¡Atención!</PrimaryText>
                    <SecondaryText style={styles.modalDetail}>Tu cuenta se eliminará, esta acción no se puede deshacer. ¿Deseas continuar?</SecondaryText>
                    <TouchableOpacity
                        onPress={() => onUnsubscribeButtonPress()}
                        style={styles.btnModal}
                    >
                        <PrimaryText color={'#fff'}>SÍ, DARME DE BAJA</PrimaryText>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal
                isVisible={isLogoutModalVisible}
                onBackdropPress={() => setLogoutModalVisible(false)}
                swipeDirection="left"
                >
                <View style={styles.modal}>
                    <PrimaryText>¡Atención!</PrimaryText>
                    <SecondaryText style={styles.modalDetail}>¿Estás seguro que deseas cerrar sesión?</SecondaryText>
                    <TouchableOpacity
                        onPress={() => onLogOutButtonPress()}
                        style={styles.btnModal}
                    >
                        <PrimaryText color={'#fff'}>SÍ, CERRAR SESIÓN</PrimaryText>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal
                isVisible={isEditModalVisible}
                onBackdropPress={() => setEditModalVisible(false)}
                swipeDirection="left"
                >
                <View style={styles.modal}>
                    <PrimaryText>Editar perfil</PrimaryText>
                    <TextInput
                        style={styles.nameInput}
                        placeholder={'Nombre'}
                        placeholderTextColor="#000"
                        autoCapitalize={'none'}
                        value={userInfo.name}
                        onChangeText={text => setUserInfo({...userInfo, name: text})}
                    />
                    <TouchableOpacity
                        onPress={() => editUserName()}
                        style={styles.btnModal}
                    >
                        <PrimaryText color={'#fff'}>GUARDAR</PrimaryText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setEditModalVisible(false)}
                        style={styles.btnModal}
                    >
                        <PrimaryText color={'#fff'}>CANCELAR</PrimaryText>
                    </TouchableOpacity>
                </View>
            </Modal>
        </ScrollView>
    )
}

const mapStateToProps=(state)=>({
    user:state.users
})
export default connect(mapStateToProps) (ProfileScreen);