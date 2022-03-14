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
    shadowColor: "#000",

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
  descContainer: {
    flex: 3,
    padding: 50,
  },
  titleContainer:{
    marginBottom: 20,
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