import {StyleSheet} from 'react-native';
import {Colors} from '@common';

export default StyleSheet.create({
  headerContainer: {
    flex: 1,
    height: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 20,
    padding: 20,
  },
  shadow: {
    height: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)', 
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,
    elevation: 8,
  },
  icon: {
    width: 35,
    height: 35,
  },
  titleContainer:{
    marginBottom: 20,
  },
  formContainer: {
    flex: 3,
    paddingTop: 50,
  },
  inputContainer: {
    marginHorizontal: 50,
    marginVertical: 20,
  },
  input: {
    color: 'gray',
    fontFamily: 'Poppins-Regular',
  },
  bar: {
    height: 1,
    backgroundColor: Colors.CORPORATE_ORANGE,
  },
  btnSend: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 20,
    borderRadius: 30,
    backgroundColor: Colors.CORPORATE_ORANGE,
  },
  titleSize:{
    fontSize: 30,
    marginLeft: 10,
  }
});