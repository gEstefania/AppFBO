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
import {unregisterDevice, showArticlesByGroup} from '@firestore/user';
import functions from '@react-native-firebase/functions';
import {IconBaja, IconCerrar, IconDatos, IconEditar, IconMas, IconIntereses, IconPerfil} from '@icons';
import { unsuscribeMail } from '../utils/emailTemplate';

const ProfileScreen = (props) => {
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState({ name: '', email: '' });
    const [user,setUser]=useState(null)
    const [userAuth, setUserAuth] = useState();
    const [tags,setTags]=useState([])
    const [isModalVisible, setModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
    const [isAnonymousModalVisible, setAnonymousModalVisible] = useState(false);
    const dispatch = useDispatch();

    function onAuthStateChanged(userAuth) {
        setUserAuth(userAuth);
    }
    useEffect(() => {
        showArticlesByGroup()
        const user = auth().currentUser
        console.log('usuario actual',props.user)
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return ()=>{
            subscriber();
          } ; // unsubscribe on unmount
    }, [])

    useEffect(() => {
        if(props.user){
            const suscriber = firestore()
            .collection("Users")
            .doc(props.user.id)
            .onSnapshot(dataSnapshot => {
                if(dataSnapshot.exists){
                    setTags([])
                    let dUser = dataSnapshot.data()
                    console.log('User: ',user);
                    setUser(user)
                    dUser.myTags?.forEach(async doc=>{
                        //console.log('doc', doc);
                        let dTag = await firestore().doc(doc.path).get()
                        //console.log('dtag', dTag);
                        setTags(oldTags=>[...oldTags,{id:dTag.id,...dTag.data()}])
                        console.log('TAGS', dTag.data());
                        if(dTag.data()?.enabled === false){
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
            console.log('getUser response',res);
            if(res){
                setUserInfo({name: res.name, email: res.email})
            }
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
        if(userAuth.isAnonymous == true){
            setAnonymousModalVisible(!isAnonymousModalVisible);
        }else{
            setModalVisible(!isModalVisible);
        }
    }
    const confirmLogoutUser=()=>{
        setLogoutModalVisible(!isLogoutModalVisible);
    }
    const confirmEditUserInfo=()=>{
        if(userAuth.isAnonymous == true){
            setAnonymousModalVisible(!isAnonymousModalVisible);
        }else{
            setEditModalVisible(!isEditModalVisible);
        }
    }

    const addTagsPreferences=()=>{
        if(userAuth.isAnonymous == true){
            setAnonymousModalVisible(!isAnonymousModalVisible);
        }else{
            navigation.navigate("UserPreferences", {userSelectedTags: tags})
        }
    }

    const onUnsubscribeButtonPress = async () => {
        try {
            // Eliminar de Firestore:
            await unsubscribeUser()
            // Eliminar de Redux:
            dispatch(logout())
            // Eliminar de Auth:
            auth().currentUser.delete().then(() => {
                console.log('User deleted from authentication');
            })
            // Log out:
            auth().signOut().then(() => console.log('User signed out!'));
            
            // Envio de correo:
            functions().httpsCallable('customEmail')(
                {
                    from: 'Fundacion Bertin Osborne <bertin09osborne@gmail.com>',
                    to: userInfo.email, 
                    subject: '¡Hasta la proxima!',
                    html: unsuscribeMail(userInfo.name)
                }
            )
            .then((response) => {console.log('Unsuscribe email send!', response)});
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
            //State:
            setUserInfo({ name: '', email: '' })
            setUser(null)
            //If Anonymous user:
            if (userAuth.isAnonymous == true) {
                console.log('entro a if');
                // Eliminar anonymous user de Auth:
                auth().currentUser.delete().then(() => {
                console.log('Anonymous User deleted from authentication');
            })
            //Logout de Auth:
            auth().signOut().then(() => console.log('User signed out!'));
            }
            await unregisterDevice()
        } catch (error) {
            console.error(error);
        }
    }
    const onSignUpButtonPress = () => {
        try {
          auth().signOut()
        } catch (error) {
          console.log(error);
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
                <IconPerfil width={30} height={30} style={{marginBottom: 5}}/>
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
                    onPress={()=> addTagsPreferences()}
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
                    <PrimaryText style={styles.modalTitle}>¡Atención!</PrimaryText>
                    <SecondaryText color={'gray'} style={styles.modalDetail}>Tu cuenta se eliminará, esta acción no se puede deshacer. ¿Deseas continuar?</SecondaryText>
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
                    <PrimaryText style={styles.modalTitle}>¡Atención!</PrimaryText>
                    <SecondaryText color={'gray'} style={styles.modalDetail}>¿Estás seguro que deseas cerrar sesión?</SecondaryText>
                    <TouchableOpacity
                        onPress={() => onLogOutButtonPress()}
                        style={styles.btnModal}
                    >
                        <PrimaryText color={'#fff'}>SÍ, CERRAR SESIÓN</PrimaryText>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal
                isVisible={isAnonymousModalVisible}
                onBackdropPress={() => setAnonymousModalVisible(false)}
                swipeDirection="left"
            >
                <View style={styles.modal}>
                    <PrimaryText style={styles.modalTitle}>¿No tienes cuenta?</PrimaryText>
                    <SecondaryText color={'gray'} style={styles.modalDetail}>Regístrate para poder vizualizar todo nuestro contenido</SecondaryText>
                    <TouchableOpacity
                    onPress={() => onSignUpButtonPress()}
                    style={styles.btnModal}
                    >
                    <PrimaryText color={'#fff'}>REGÍSTRATE</PrimaryText>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal
                isVisible={isEditModalVisible}
                onBackdropPress={() => setEditModalVisible(false)}
                swipeDirection="left"
                >
                <View style={styles.modal}>
                    <PrimaryText tyle={styles.modalTitle}>Editar perfil</PrimaryText>
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