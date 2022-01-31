import * as React from 'react';
import { Image, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import ExploreScreen from '../screens/Explore/exploreScreen';
import InfoScreen from '../screens/Information/index';
import TrainingScreen from '../screens/Training/index';
import TopicScreen from '../screens/Information/screens/Topic/topicScreen';
import ArticleScreen from '../screens/Information/screens/Topic/articleScreen';
import StepScreen from '../screens/Information/screens/Topic/stepScreen';
import PostScreen from '../screens/Information/screens/Topic/postScreen';
import ProfileScreen from '../screens/profileScreen';
import SearchScreen from '../screens/searchScreen';
import SuggestionScreen from '../screens/suggestionScreen';
import ContactScreen from '../screens/contactScreen';
import CourseTopMenu from './courseTopMenu';
import Login from '../screens/Auth/login';
import SignUp from '../screens/Auth/signUp';
import Topic from '../screens/tags';
import Intro from '../screens/intro';
import Index from '../screens/index';

const TopTab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();
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
  return (
    <NavigationContainer theme={MyTheme}>
      <BottomTab.Navigator
        initialRouteName={homeScreen}
        screenOptions={{
          headerShown: false
        }}
      >
        <BottomTab.Screen name="Inicio" component={homeScreen}/>
        <BottomTab.Screen name="Perfil" component={ProfileScreen}/>
        <BottomTab.Screen name="Hablemos" component={ContactScreen}/>
        <BottomTab.Screen name="Sugerencias" component={SuggestionScreen}/>
        <BottomTab.Screen name="Buscar" component={SearchScreen}/>
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

//Home Top Navigator
function homeScreen() {
  return(
    <LinearGradient
      colors={['#ff9b04', '#ff000a' ]}
      style={{flex: 1}}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.4, y: 1.4 }}
      locations={[0.2, 0.4]}
    >
      <View style={{backgroundColor: 'transparent', height: 125, justifyContent: 'flex-end', alignItems: 'center'}}>
        <Image style={{width: 250, height: 70}} source={require('../assets/img/logo.png')}/>
      </View>
      <TopTab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontWeight: '600', fontFamily: 'Poppins-Bold', textTransform: 'capitalize', color: '#fff', fontSize: 16},
          tabBarStyle: { backgroundColor: 'transparent', paddingVertical: 15, },
          tabBarIndicatorStyle: {backgroundColor: '#ECF1FE', height: 7, borderRadius: 50},
        }}
      >
        <TopTab.Screen name="Explorar" component={ExploreScreen} />
        <TopTab.Screen name="Información" component={InformationStackScreen} />
        <TopTab.Screen name="Formación" component={TrainingStackScreen} />
    </TopTab.Navigator>
    </LinearGradient>
  )
};

//Information Stack navigator
function InformationStackScreen() {
  return (
    <InformationStack.Navigator
    screenOptions={{
      headerTitle: "",
      headerBackTitleVisible: false,
      headerStyle: {shadowColor: '#fff'},
    }}
    >
      <InformationStack.Screen name="Information" component={InfoScreen} options={{headerShown: false}}/>
      <InformationStack.Screen name="Topic" component={TopicScreen} />
      <InformationStack.Screen name="Article" component={ArticleScreen} />
      <InformationStack.Screen name="Step" component={StepScreen} />
      <InformationStack.Screen name="Post" component={PostScreen} />
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