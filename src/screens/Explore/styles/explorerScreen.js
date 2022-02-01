import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  swiperContainer: {
    height: 320,
    margin: 20,
  },
  swiper: {
    height: '100%',
    alignItems:"flex-start",
    justifyContent:"flex-end",
    backgroundColor:"#ff9b04",
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  titleSlide: {
    fontSize: 20,
    maxWidth: 100,
  },
  dotStyle: {
    backgroundColor: 'rgba(255,255,255,.5)', width: 15, height: 15, borderRadius: 50
  },
  activeDotStyle: {
    backgroundColor: '#fff', width: 15, height: 15, borderRadius: 50
  },
});