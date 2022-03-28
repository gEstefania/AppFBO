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
    //marginTop: 20,
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
  headerIcon: {
    width: 35,
    height: 35,
  },
  userData: {
    //flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 40,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  userTags: {
    //flex: 1,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  sectionTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title:{
    marginLeft: 10,  
  },
  titleSize:{
    fontSize: 30,
    marginLeft: 10,
  },
  icon:{
    width: 15,
    height: 15,
  },
  btnRow: {
    //flex: 1,
    flexDirection: 'row',
    marginVertical: 20,
    paddingHorizontal: 30,
  },
  bar: {
    height: 1,
    backgroundColor: Colors.CORPORATE_ORANGE,
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
  nameInput:{
    width: '100%',
    color: '#000',
    backgroundColor: '#ECF1FE',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 100,
  },
});