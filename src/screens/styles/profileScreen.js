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
    padding: 40,
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
  headerIcon: {
    width: 35,
    height: 35,
  },
  userData: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 40,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 20,
  },
  userTags: {
    flex: 1,
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
  icon:{
    width: 15,
    height: 15,
  },
  btnRow: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 20,
    paddingHorizontal: 30,
  },
  bar: {
    height: 1,
    backgroundColor: Colors.CORPORATE_ORANGE,
  },
});