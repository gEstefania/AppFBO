import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  btnSteps: {
    //flex: 3,
    height: 100,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ff9b04',
    borderRadius: 15,
  },
  thumbnailContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECF1FE',
    borderRadius: 10,
    height: '100%',
  },
  descContainer:{
    flex: 3,
    justifyContent: 'center',
    marginLeft: 20,
  },
});