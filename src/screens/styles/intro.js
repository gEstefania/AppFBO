import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '@common';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    //paddingTop: 40,
  },
  header: {
    marginTop: height * 0.25,
    flex: 1,
    alignItems: 'center'
  },
  title: {
    marginTop:0,
    fontSize: 24,
    textAlign: 'center',
  },
  textIntro:{
    textAlign: 'center',
    maxWidth: '75%',
    marginTop: 10,
  },
  btnContainer: {
    flex: 2,
    width: '100%',
    justifyContent: 'flex-end',
  },
  btnGo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
});