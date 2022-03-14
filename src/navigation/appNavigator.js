import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Image, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashMessage from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import ExplorerScreen from '../screens/Explore/exploreScreen';
import InfoScreen from '../screens/Information/index';
import TrainingScreen from '../screens/Training/index';
import ArticleScreen from '../screens/Information/screens/articleScreen';
import CategoryScreen from '../screens/Information/screens/categoryScreen';
import SubCategoryScreen from '../screens/Information/screens/subCategoryScreen';
import TopicScreen from '../screens/Information/screens/topicScreen';
import ProfileScreen from '../screens/profileScreen';
import SearchScreen from '../screens/searchScreen';
import SuggestionScreen from '../screens/suggestionScreen';
import ContactScreen from '../screens/contactScreen';
import CompanyScreen from '../screens/Explore/companyScreen'
import CourseTopMenu from './courseTopMenu';
import SignIn from '../screens/Auth/login';
import SignUp from '../screens/Auth/signUp';
import Tags from '../screens/tags';
import Intro from '../screens/intro';
import Index from '../screens/Auth/index';
//icons
import {IconBuscar, IconBuscarHover, IconHablemosHover, IconHablemos, IconPerfilHover, IconPerfil, IconSugerenciasHover, IconSugerencias} from '@icons';

const TopTab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();
//Stacks:
const Stack = createStackNavigator();
const ExplorerStack = createStackNavigator();
const InformationStack = createStackNavigator();
const TrainingStack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background:'#fff'
  },
};

//Main Navigator
const AppNavigator = () => {

  // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName={"Intro"} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Intro" component={Intro} />
          <Stack.Screen name="Index" component={Index} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
        <FlashMessage position="top"/>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName={"Home"} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={BottomTabNavigator} />
          <Stack.Screen name="TagsPreferences" component={Tags} />
        </Stack.Navigator>
    </NavigationContainer>
  );
    
}
// Bottom Navigator
function BottomTabNavigator() {
  return(
    <BottomTab.Navigator
      initialRouteName={TopTapNavigator}
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {color: '#ff5f00', marginBottom: 20},
        tabBarStyle: {
          height: 100,
          paddingHorizontal: 20,
          //shadow:
          borderBottomWidth: 0.5,
          borderBottomColor: 'rgba(0, 0, 0, 0.1)', 
          shadowOffset: {width: 0,height: 11},
          shadowOpacity: 0.55,
          shadowRadius: 14.78,
          elevation: 22,
        },
      }}
    >
      <BottomTab.Screen
        name="TopTapNavigator"
        component={TopTapNavigator}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ focused }) => (
          focused ? <IconBuscar width={30} height={30} /> : <IconBuscarHover width={30} height={30} />)
        }}
      />
      <BottomTab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          lazy:true,
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ focused }) => (
            focused ? <IconPerfil width={30} height={30} /> : <IconPerfilHover width={30} height={30} />)
          }}
      />
      <BottomTab.Screen
        name="Hablemos"
        component={ContactScreen}
        options={{
          tabBarLabel: 'Hablemos',
          tabBarIcon: ({ focused }) => (
            focused ? <IconHablemos width={30} height={30} /> : <IconHablemosHover width={30} height={30} />)
        }}
      />
      <BottomTab.Screen
        name="Sugerencias"
        component={SuggestionScreen}
        options={{
          tabBarLabel: 'Sugerencias',
          tabBarIcon: ({ focused }) => (
            focused ? <IconSugerencias width={30} height={30} /> : <IconSugerenciasHover width={30} height={30} />)
        }}
      />
      <BottomTab.Screen
        name="Buscar"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Buscar',
          tabBarIcon: ({ focused }) => (
          focused ? <IconBuscar width={30} height={30} /> : <IconBuscarHover width={30} height={30} />)
        }}
      />
    </BottomTab.Navigator>
  )
};

//Home Top Navigator
function TopTapNavigator() {
  return(
    <LinearGradient
      colors={['#ff9b04', '#ff000a' ]}
      style={{flex: 1}}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.4, y: 1.7 }}
      locations={[0.2, 0.4]}
    >
      <View style={{backgroundColor: 'transparent', height: 125, alignItems: 'center', paddingTop: 40}}>
        <Image style={{width: 250, height: 70}} source={require('../assets/img/logo.png')}/>
      </View>
      <TopTab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontWeight: '600', fontFamily: 'Poppins-Bold', textTransform: 'capitalize', color: '#fff', fontSize: 16},
          tabBarStyle: { backgroundColor: 'transparent', paddingVertical: 15, },
          tabBarIndicatorStyle: {backgroundColor: '#ECF1FE', height: 7, borderRadius: 50, bottom: -4, width: 55, left: 45,},
        }}
      >
        <TopTab.Screen name="Explorar" component={ExplorerStackScreen} />
        <TopTab.Screen name="Información" component={InformationStackScreen} />
        <TopTab.Screen name="Formación" component={TrainingStackScreen} />
    </TopTab.Navigator>
    </LinearGradient>
  )
};

//Explorer Stack navigator
function ExplorerStackScreen() {
  return (
    <ExplorerStack.Navigator
    screenOptions={{
      headerTitle: "",
      headerBackTitleVisible: false,
      headerStatusBarHeight: 0,
      headerStyle: {shadowColor: '#fff'},
    }}
    >
      <ExplorerStack.Screen name="Explorar" component={ExplorerScreen} options={{headerShown: false}}/>
      <ExplorerStack.Screen name="Recomendado" component={CompanyScreen} />
      <ExplorerStack.Screen name="Empresas" component={CompanyScreen} />
    </ExplorerStack.Navigator>
  );
};

//Information Stack navigator
function InformationStackScreen() {
  return (
    <InformationStack.Navigator
    screenOptions={{
      headerTitle: "",
      headerStatusBarHeight: 0,
      headerBackTitleVisible: false,
      headerStyle: {shadowColor: '#fff'},
    }}
    >
      <InformationStack.Screen name="Information" component={InfoScreen} options={{headerShown: false}}/>
      <InformationStack.Screen name="Category" component={CategoryScreen} />
      <InformationStack.Screen name="Subcategory" component={SubCategoryScreen} />    
      <InformationStack.Screen name="Topic" component={TopicScreen} />
      <InformationStack.Screen name="Article" component={ArticleScreen} />
    </InformationStack.Navigator>
  );
};

//Training Stack navigator
function TrainingStackScreen() {
  return (
    <TrainingStack.Navigator
    screenOptions={{
      headerShown: false
    }}
    >
      <TrainingStack.Screen name="Training" component={TrainingScreen} options={{headerShown: false}}/>
      <TrainingStack.Screen name="TopMenu" component={CourseTopMenu} />
    </TrainingStack.Navigator>
  );
};

export default AppNavigator;