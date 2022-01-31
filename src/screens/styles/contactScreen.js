import {StyleSheet} from 'react-native';
import {Colors} from '@common';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
  },
  shadow: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
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
});