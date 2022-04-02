import {StyleSheet} from 'react-native';
import {Colors} from '@common';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
<<<<<<< HEAD
    alignItems: 'center',
    paddingTop: 40,
    padding: 20,
=======
    paddingHorizontal: 20,
>>>>>>> 5796a333fb6848e209d3c843de17e5b133efa5e6
  },
  imgContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
  },
  textIntro:{
    textAlign: 'center',
    maxWidth: '70%',
    marginTop: 10,
    marginBottom: 20,
  },
  btnSignUp: {
    width: '100%',
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
});