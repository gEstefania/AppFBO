import 'react-native-gesture-handler';
import * as React from 'react';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/redux/store/index";
import AppNavigator from './src/navigation/appNavigator'
import messaging from '@react-native-firebase/messaging';
import { setDeviceToken } from './src/redux/actions/configActions';
import { Platform } from 'react-native';
import { Notifications } from 'react-native-notifications';

export default function App() {

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      registerDevice()
    }
  }

  const registerDevice = async () => {
    try {
      let isRegister = messaging().isDeviceRegisteredForRemoteMessages
      if (!isRegister) {
        await messaging().registerDeviceForRemoteMessages()
      }
      let token = await messaging().getToken();
      console.log("Device token", token)
      store.dispatch(setDeviceToken(token))
    } catch (e) {
      console.log(e)
    }
  }



  React.useEffect(() => {
    requestUserPermission()
  }, [])

  const showLocalNotification=(message)=>{
    if (Platform.OS === "ios") {
      let localNotification = Notifications.postLocalNotification({
        title: message.title,
        body: message.body,
        sound: "chime.aiff",
        silent: false,
        category: "SOME_CATEGORY",
      });
    } else {
      Notifications.postLocalNotification({
        title: message.title,
        body: message.body,
        extra: "data"
      });
    }
  }
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async message => {
      showLocalNotification()
    })
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      
    });

    return unsubscribe
  }, [])



  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}