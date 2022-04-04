import {StyleSheet} from 'react-native';
import {Colors} from '@common';

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
    width: 350,
    
    backgroundColor:"#ff9b04",
    borderRadius: 20,
    //paddingVertical: 40,
    //paddingHorizontal: 20,
  },
  titleSlide: {
    fontSize: 20,
    maxWidth: 150,
  },
  dotStyle: {
    backgroundColor: 'rgba(255,255,255,.5)', width: 15, height: 15, borderRadius: 50
  },
  activeDotStyle: {
    backgroundColor: '#fff', width: 15, height: 15, borderRadius: 50
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 10,
    marginHorizontal: 30,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  modalDetail: {
    marginTop: 20,
  },
  modalTitle:{
    fontSize: 28,
    textAlign: 'center',
  },
  btnModal:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 30,
    borderRadius: 100,
    backgroundColor: Colors.CORPORATE_ORANGE,
  },
  backgroundImage:{
    flex: 1,
    padding: 20,
    alignItems:"flex-start",
    justifyContent:"flex-end",
  }
});