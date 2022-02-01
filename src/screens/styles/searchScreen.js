import {StyleSheet} from 'react-native';
import {Colors} from '@common';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
  inputContainer: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  input:{
    width: '100%',
    padding: 20,
    borderRadius: 30,
    backgroundColor: '#ECF1FE',
  },
  resultContainer:{
    flex: 3,
    borderTopColor: Colors.CORPORATE_ORANGE,
    borderTopWidth: 1,
  },
});