import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 30,
    marginBottom: 0,
  },
  banner: {
    height: 150,
    justifyContent: 'center',
    marginBottom: 3,
    paddingHorizontal: 35,
    borderRadius: 20,
    marginLeft:15,
    marginRight:15,
  },
  topicTitle: {
    fontSize: 30,
  },
  bannerTitle: {
    maxWidth: 150,
    fontSize: 20,
  },
  bannerTitleMini: {
    maxWidth: 260
  },
  btnArticle: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:-20,
    marginRight: 17,
  },
  circle: {
    width: 15,
    height: 15,
    margin: 10,
    borderRadius: 100,
  },
});