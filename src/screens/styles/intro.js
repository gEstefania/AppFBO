import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '@common';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageBackground: {
    height: height,
    width: width,
    //paddingTop: 40,
  },
  header: {
    marginTop: height * 0.25,
    height: height * 0.20,
    alignItems: 'center',
  },
  title: {
    marginTop:0,
    fontSize: height * 0.03,
    textAlign: 'center',
  },
  textIntro:{
    textAlign: 'center',
    maxWidth: '75%',
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