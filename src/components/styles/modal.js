import {StyleSheet} from 'react-native';
import {Colors} from '@common';

export default StyleSheet.create({
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
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 30,
    borderRadius: 100,
    backgroundColor: Colors.CORPORATE_ORANGE,
  },
})