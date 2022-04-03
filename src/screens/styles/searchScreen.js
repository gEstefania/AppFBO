import {StyleSheet} from 'react-native';
import {Colors} from '@common';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    //flex: 1,
    height: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: -20,
    padding: 30,
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
  },
  inputContainer: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 30,
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
    paddingLeft: 40,
    paddingTop: 30,
  },
  titleSize:{
    fontSize: 30,
    marginLeft: 0,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 10,
    marginHorizontal: 30,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  modalDetail: {
    marginTop: 20,
  },
  btnModal:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 30,
    borderRadius: 100,
    backgroundColor: Colors.CORPORATE_ORANGE,
  },
});