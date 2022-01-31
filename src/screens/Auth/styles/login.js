import {StyleSheet} from 'react-native';
import {Colors} from '@common';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 70,
    marginBottom: 20,
  },
  welcome: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 26,
  },
  btnGuestView: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      marginVertical: 10,
      //paddingVertical: 10,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: Colors.CORPORATE_ORANGE,
  },
  btnGuest:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginVertical: 10,
    //padding: 10,
    backgroundColor: '#3b5598',
  },
  btnSignUp: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginVertical: 10,
    padding: 10,
  },
  input: {
    flex: 1,
    width: '100%',
    marginVertical: 10,
  },
  loginInput: {
    flex: 1,
    color: '#000',
    backgroundColor: '#ECF1FE',
    paddingLeft: 30,
    //paddingHorizontal: 30,
    borderRadius: 50,
  },
  btnLogin: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginVertical: 10,
    //padding: 10,
    backgroundColor: Colors.CORPORATE_ORANGE,
  },
  btnPassword: {
    marginVertical: 10,
  }
});