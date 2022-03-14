import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 30,
  },
  topicTitle: {
    fontSize: 30,
  },
  imageBackground: {
    width: '100%',
    height: 150,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginVertical: 20,
  },
  imageText: {
    maxWidth: '65%',
    padding: 30,
  },
  bntList: {
    marginTop: 10,
  },
  btnArticle: {
    flex: 0.20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    borderRadius: 25,
  },
  btnText: {
    fontSize: 16,
    textTransform: 'uppercase',
  },
});