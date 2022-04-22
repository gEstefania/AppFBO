import {StyleSheet} from 'react-native';
import {Colors} from '@common';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer:{
    height: 200,
  },
  LinearGradientView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  body:{
    flex: 1,
    margin: 20,
    marginTop: 20,
  },
  btnTopic: {
    //flex: 1,
    //flexGrow: 1,
    //minWidth: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    //paddingHorizontal: 40,
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 15,
    backgroundColor: Colors.CORPORATE_ORANGE,
  },
  btnTopicSelected: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    flex: 1,
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 15,
    backgroundColor: Colors.ORANGE,
  },
  btnSave:{
    alignItems: 'flex-end',
  },
});