import 'react-native-gesture-handler';
import * as React from 'react';
import base64 from 'react-native-base64'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/redux/store/index";
import AppNavigator from './src/navigation/appNavigator'

export default function App() {

  if (!global.btoa) { global.btoa = base64.encode }

  if (!global.atob) { global.atob = base64.decode }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator/>
      </PersistGate>
    </Provider>
  );
}