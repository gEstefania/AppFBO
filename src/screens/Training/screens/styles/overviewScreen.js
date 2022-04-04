import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  summaryContainer:{
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'flex-start',
    //paddingHorizontal: 30,
  },
  row: {
    flexDirection: 'row',
  },
  columnText:{
    //marginTop: 0,
    marginLeft: 20,
    justifyContent: 'center',
  },
  descContainer: {
    marginLeft: 10,
    marginTop: 15,
    flex: 2,
  }
});