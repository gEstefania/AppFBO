import {StyleSheet} from 'react-native';
import {Colors} from '@common';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    padding: 0,
  },
  imgContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: -13,
  },
  textIntro:{
    textAlign: 'center',
    maxWidth: '70%',
    marginTop: 10,
    marginBottom: 20,
  },
  btnSignUp: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    borderRadius: 30,
    backgroundColor: Colors.CORPORATE_ORANGE,
  },
  btnSingInContainer: {
    flexDirection: 'row',
  },
  login: {
    fontWeight: 'bold',
  }
});