import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '@common';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  header: {
    marginTop: width * 0.26,
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 26,
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