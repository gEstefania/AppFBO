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
  btnStep: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
  },
  circle: {
    width: 15,
    height: 15,
    margin: 10,
    borderRadius: 100,
  },
});