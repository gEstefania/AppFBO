import React, { useEffect, useState } from 'react';
import {Pressable, StyleSheet, View, TouchableOpacity} from 'react-native'
import Modal from "react-native-modal";
import {SecondaryText, PrimaryText} from '@common'
import Colors from '@common/colors'
import Icon  from 'react-native-vector-icons/Entypo'

const PreferenceTag=(props)=>{
    const [isModalVisible, setModalVisible] = useState(false);

    const confirmDelete=()=>{
        setModalVisible(!isModalVisible);
    }
    return(
        <View>
        <View style={styles.container}> 
            <SecondaryText color={"#fff"}>
                {props.name}
            </SecondaryText>
            <Pressable 
                onPress={confirmDelete}
                style={styles.button}>
                <Icon name="cross" style={styles.icon} />
            </Pressable>
        </View> 
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}
            swipeDirection="left"
            >
            <View style={styles.modal}>
                <PrimaryText style={styles.modalTitle}>¡Atención!</PrimaryText>
                <SecondaryText style={styles.modalDetail}>¿Estás seguro de eliminar la preferencia: <PrimaryText color={'#000'}>{props.name}</PrimaryText>?</SecondaryText>
                <TouchableOpacity
                    onPress={() => props.onDeleteTag(props.id)}
                    style={styles.btnModal}
                >
                    <PrimaryText color={'#fff'}>SÍ, ELIMINAR</PrimaryText>
                </TouchableOpacity>
            </View>
        </Modal>
    </View>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.ORANGE,
        paddingHorizontal:16,
        borderRadius:24,
        marginEnd:8,
        marginBottom: 10,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
    },
    icon:{
        color:"#fff",
        fontSize:18,
        
    },
    button:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        paddingHorizontal:8,
        paddingVertical:8,
        marginStart:6
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 10,
        marginHorizontal: 30,
        backgroundColor: '#fff',
        borderRadius: 20,
      },
      modalDetail: {
        marginTop: 20,
      },
      modalTitle:{
        fontSize: 28,
        textAlign: 'center',
      },
      btnModal:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 30,
        borderRadius: 100,
        backgroundColor: Colors.CORPORATE_ORANGE,
      },
})
export default PreferenceTag