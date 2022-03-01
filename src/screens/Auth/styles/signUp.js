import {StyleSheet} from 'react-native';
import {Colors} from '@common';

export default StyleSheet.create({
  mainContainer: {
    //flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  welcome: {
    //flex: 1,
    paddingVertical: 20,
  },
  welcomeText: {
    fontSize: 26,
  },
  btnGuestView: {
    //flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginVertical: 10,
    paddingVertical: 15,
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
  btnFacebookContainer: {
    //flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginVertical: 10,
    padding: 20,
    backgroundColor: '#3b5598',
  },
  btnGoogleContainer: {
    //flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    padding: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'gray',
  },
  titleSignIn: {
    //flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginVertical: 10,
    padding: 20,
  },
  btnPolicyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    //flex: 1,
    width: '100%',
    marginVertical: 10,
  },
  loginInput: {
    //flex: 1,
    color: '#000',
    backgroundColor: '#ECF1FE',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 50,
  },
  btnLogin: {
    //flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginVertical: 10,
    padding: 20,
    backgroundColor: Colors.CORPORATE_ORANGE,
  },
  btnSingInContainer: {
    flexDirection: 'row',
  },
});