import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 20,
  },
  banner: {
    height: 150,
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 35,
    borderRadius: 20,
  },
  bannerTitle: {
    maxWidth: 150,
    fontSize: 20,
  },
  btnArticle: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 15,
    height: 15,
    margin: 10,
    borderRadius: 100,
  },
});