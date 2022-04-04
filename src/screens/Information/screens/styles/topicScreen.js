import {StyleSheet, useWindowDimensions} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 50,
    marginTop: 5,
  },
  banner: {
    height: 150,
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 35,
    borderRadius: 20,
    //marginLeft:15,
    //marginRight:15,
  },
  topicTitle: {
    fontSize: 30,
  },
  bannerTitle: {
    maxWidth: 150,
    fontSize: 20,
  },
  bannerTitleMini: {
    maxWidth: 260,
  },
  btnArticle: {
    flex: 1,
    padding: 15,
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