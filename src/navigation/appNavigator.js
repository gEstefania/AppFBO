import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Image, View, useWindowDimensions, Platform, Pressable, Text, Linking, I18nManager, TouchableOpacity } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import CustomBackButton from '../components/customBackButton';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashMessage from 'react-native-flash-message';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import ExplorerScreen from '../screens/Explore/exploreScreen';
import InfoScreen from '../screens/Information/index';
import TrainingScreen from '../screens/Training/index';
import AllCourses from '../screens/Training/screens/allCourses';
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
import Preferences from '../screens/preferences'
import Intro from '../screens/intro';
import Index from '../screens/Auth/index';
//icons
import { IconBuscar, IconBuscarHover, IconHablemosHover, IconHablemos, IconPerfilHover, IconPerfil, IconSugerenciasHover, IconSugerencias, IconHome, IconHomeHover, LogoApp} from '@icons';
import { navigationRef } from './RootNavigation';

const TopTab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();
//Stacks:
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const LoginStack = createStackNavigator();
const ExplorerStack = createStackNavigator();
const InformationStack = createStackNavigator();
const TrainingStack = createStackNavigator();
const ProfileStack = createStackNavigator();

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
  
  return(
    <NavigationContainer ref={navigationRef} theme={MyTheme}>
      {user ? <HomeStackScreen /> : <LoginStackScreen />}
      <FlashMessage position="top"/>
    </NavigationContainer>
  )
}



// Bottom Navigator
function BottomTabNavigator() {
  const { height, width } = useWindowDimensions();
  return(
    <BottomTab.Navigator
      initialRouteName={TopTapNavigator}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarLabelStyle: {color: '#ff5f00', marginBottom: 15},
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 115 : height*0.10,
          paddingHorizontal: 20,
          paddingTop: Platform.OS === 'ios' ? 0 : 10,
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
          tabBarButton:(props)=>(
            <Pressable {...props} onPress={()=>navigationRef.navigate("Explorar")} />
          ),
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ focused }) => (
          focused ? <IconHomeHover width={30} height={30} /> : <IconHome width={30} height={30} />)
        }}
      />
      <BottomTab.Screen
        name="Buscar"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Buscar',
          tabBarIcon: ({ focused }) => (
          focused ? <IconBuscarHover width={30} height={30} /> : <IconBuscar width={30} height={30} />)
        }}
      />
      <BottomTab.Screen
        name="Hablemos"
        component={ContactScreen}
        options={{
          tabBarButton:(props)=>(
            <Pressable {...props} onPress={()=>Linking.openURL('https://fundacionbertinosborne.org/hablamos-app/') }  />
          ),
          tabBarLabel: 'Hablemos',
          tabBarIcon: ({ focused }) => (
            focused ? <IconHablemosHover width={30} height={30} /> : <IconHablemos width={30} height={30} />)
        }}
      />
      <BottomTab.Screen
        name="Sugerencias"
        component={SuggestionScreen}
        options={{
          tabBarButton:(props)=>(
            <Pressable {...props} onPress={()=>Linking.openURL('https://fundacionbertinosborne.org/buzon-sugerencias-app/') }  />
          ),
          tabBarLabel: 'Sugerencias',
          tabBarIcon: ({ focused }) => (
            focused ? <IconSugerenciasHover width={30} height={30} /> : <IconSugerencias width={30} height={30} />)
        }}
      />
      <BottomTab.Screen
        name="Perfil"
        component={ProfileStackScreen}
        options={{
          lazy:true,
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ focused }) => (
            focused ? <IconPerfilHover width={30} height={30} /> : <IconPerfil width={30} height={30} />)
          }}
      />
    </BottomTab.Navigator>
  )
};

//Home Top Navigator
function TopTapNavigator() {
  const { height, width } = useWindowDimensions();
  return(
    <LinearGradient
      colors={['#ff9b04', '#ff000a' ]}
      style={{flex: 1}}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.4, y: 1.7 }}
      locations={[0.10, 0.4]}
    >
      <View style={{backgroundColor: 'transparent', alignItems: 'center', paddingTop: 20,}}>
        <LogoApp width={230} height={100} />
      </View>
      <TopTab.Navigator
      initialRouteName={'Explorar'}
        screenOptions={{
          tabBarLabelStyle: { fontWeight: '600', fontFamily: 'Poppins-Bold', textTransform: 'capitalize', color: '#fff', fontSize: width*0.035},
          tabBarStyle: { backgroundColor: 'transparent', },
          tabBarIndicatorStyle: {backgroundColor: '#ECF1FE', height: 7, borderRadius: 50, bottom: -4, width: 55, left: 40,},
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
      <ExplorerStack.Screen name="Explorer" component={ExplorerScreen} options={{headerShown: false}}/>
      <ExplorerStack.Screen name="Recomendado" component={CompanyScreen} />
      <ExplorerStack.Screen name="Empresas" component={CompanyScreen} options={{headerTransparent: true}}/>
    </ExplorerStack.Navigator>
  );
};

//Information Stack navigator
function InformationStackScreen() {
  return (
    <InformationStack.Navigator
    screenOptions={{
      headerTransparent: true,
      headerTitle: "",
      headerStatusBarHeight: -2,
      headerBackTitleVisible: false,
      headerStyle: {shadowColor: '#fff'},
    }}
    >
      <InformationStack.Screen name="Information" component={InfoScreen} options={{headerShown: false}}/>
      <InformationStack.Screen name="Category" component={CategoryScreen} />
      <InformationStack.Screen name="Subcategory" component={SubCategoryScreen} />    
      <InformationStack.Screen name="Topic" component={TopicScreen} />
      <InformationStack.Screen name="Article" component={ArticleScreen} 
      options={({ route }) => ({
        headerLeft: () => CustomBackButton(route), // enturador de boton de regreso
      })}
      />
    </InformationStack.Navigator>
  );
};

//Training Stack navigator
function TrainingStackScreen() {
  return (
    <TrainingStack.Navigator
    screenOptions={{
      headerTransparent: true,
      headerTitle: "",
      headerStatusBarHeight: -2,
      headerBackTitleVisible: false,
      headerStyle: {shadowColor: '#fff'},
    }}
    >
      <TrainingStack.Screen name="Training" component={TrainingScreen} options={{headerShown: false}}/>
      <TrainingStack.Screen name="AllCourses" component={AllCourses} />
      <TrainingStack.Screen name="TopMenu" component={CourseTopMenu} options={({ route }) => ({
        headerShown:true,
        headerLeft: () => CustomBackButton(route), // enturador de boton de regreso
        })}/>
    </TrainingStack.Navigator>
  );
};

// Profile Stack Navigator
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
    screenOptions={{
      headerTitle: "",
      headerBackTitleVisible: false,
      headerStatusBarHeight: 0,
      headerStyle: {shadowColor: '#fff'},
      headerShown: false
    }}
    >
      <ProfileStack.Screen name="UserPerfil" component={ProfileScreen} options={{headerShown: false}}/>
      <ProfileStack.Screen name="UserPreferences" component={Preferences} />
    </ProfileStack.Navigator>
  );
};

function HomeStackScreen() {
  const userAuth = useSelector(state => state.users)
  return (
    <HomeStack.Navigator initialRouteName={userAuth.newUser ? "Tags" : "Home"} screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={BottomTabNavigator} />
      <HomeStack.Screen name="Tags" component={Tags} />
    </HomeStack.Navigator>
  );
};

function LoginStackScreen() {
  const initialRoute = useSelector(state => state.config)
console.log('ESTOY EN LOGINSTACK', initialRoute);
  return (
    <LoginStack.Navigator initialRouteName={initialRoute.showSignUp ? "SignUp" : "Intro"} screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="Intro" component={Intro} />
      <LoginStack.Screen name="Index" component={Index} />
      <LoginStack.Screen name="SignIn" component={SignIn} />
      <LoginStack.Screen name="SignUp" component={SignUp} />
  </LoginStack.Navigator>
  );
};

export default AppNavigator;