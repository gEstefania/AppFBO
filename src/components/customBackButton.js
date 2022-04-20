import React, { useEffect, useState, useCallback } from 'react';
import { TouchableOpacity, Image, Platform, I18nManager } from 'react-native';
import { navigationRef } from '../navigation/RootNavigation';
import { StackActions, CommonActions } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { insideLesson } from '../redux/actions/navLessonActions'

const CustomBackButton = (route) => {

  const backToLessons = useSelector(state => state.navLesson)
  const dispatch = useDispatch();

    return (
      <TouchableOpacity 
        style={{ marginLeft: 10 }}
        onPress={()=>{
          
          if (route?.params?.toHome) { // si dentro de los parametros nos viene toHome true, regresamos a casita
            navigationRef.dispatch(
              StackActions.replace('Home') // reemplazamos el stack por el de Home
            )
          } else {
            navigationRef.goBack(); // sino pues seguimos el flujo normal
          }
          if (route?.params?.backToSearch) { // si dentro de los parametros nos viene toHome true, regresamos a casita
            //console.log('evaluando', navigationRef.getState());
            console.log('evaluando', backToLessons.insideLesson);
            if (backToLessons.insideLesson) {
              console.log('INSIDE LESSON');
              navigationRef.navigate('Lecciones') // sino pues seguimos el flujo normal
              dispatch(insideLesson({insideLesson: false}))
            }else{
              console.log('AQUI ESTA ENTRANDO A BACK TO SEARCH SCREEN');
              navigationRef.navigate( 'Home', { screen: 'Buscar', key: 'Buscar-bcZq8IYY36bWxSgCaaoRp'});
            }
            
          }
          
          }}>
          <Image 
          style={ // todo lo siguiente para adecuar el boton back lo mas posible al de react native navigation 
            Platform.select({
              ios: {
                height: 21,
                width: 13,
                marginLeft: 8,
                marginRight: 22,
                marginVertical: 12,
                resizeMode: 'contain',
                transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
              },
              default: {
                height: 24,
                width: 24,
                margin: 3,
                resizeMode: 'contain',
                transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
              },
            })
          }
          source={require('../assets/img/icons/APP_FBO_back_icon.png')} />
        </TouchableOpacity>
    )
  }

  export default CustomBackButton;