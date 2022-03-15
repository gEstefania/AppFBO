import React from 'react'
import {Alert, Pressable, StyleSheet, View} from 'react-native'
import SecondaryText from '@common/secondaryText'
import colors from '@common/colors'
import Icon  from 'react-native-vector-icons/Entypo'
const PreferenceTag=(props)=>{
    const confirmDelete=()=>{
        Alert.alert("¡Atención!",`¿Estas seguro de eliminar la preferencia: ${props.name} ?`,[
            {
              text: "Cancel",
              style: "cancel"
            },
            { text: "OK", onPress: () => props.onDeleteTag(props.id) }
          ])
    }
    return(
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
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.ORANGE,
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
    }
})
export default PreferenceTag