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
});