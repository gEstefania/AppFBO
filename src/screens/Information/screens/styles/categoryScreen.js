import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 20,
  },
  titleArticle: {
    fontSize: 20,
    textTransform: 'uppercase',
  },
  btnList: {
    marginTop: 40,
  },
  btnSteps: {
    //width: 150,
    flex: 0.45,
    height: 150,
    justifyContent: 'flex-end',
    padding: 20,
    marginBottom: 20,
    borderRadius: 20,
  },
  btnText: {
    fontSize: 14,
  }
});