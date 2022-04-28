import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '@common';

const { width, height } = Dimensions.get('window');
let heightFix = 0;

if (height > 700) {
  heightFix = height;
} else {
  heightFix = height * 0.8;
}

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    height: heightFix,
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
    fontSize: height * 0.04,
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
});