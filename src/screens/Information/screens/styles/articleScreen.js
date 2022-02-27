import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  titleContainer:{
    marginBottom: 20,
  },
  postTitle: {
    fontSize: 18,
  },
  postContainer: {
    //flex: 1,
  },
  btnShare: {
    width: '100%',
    padding: 20,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ff9b04',
    borderRadius: 50,
    borderWidth: 2,
  },
  text:{
    color: '#ff9b04',
    textTransform: 'uppercase',
  },
});