import {StyleSheet} from 'react-native';
import { Colors } from '@common';

export default StyleSheet.create({
  mainContainer: {
    marginLeft: 20,
    marginBottom: 20,
  },
  cardsList: {
    marginTop: 20,
  },
  btnCard: {
    width: 140,
    height: 140,
    justifyContent: 'flex-end',
    marginRight: 15,
    padding: 10,
    borderRadius: 15,
    backgroundColor: Colors.PINK,
  },
  cardTitle:{
    fontSize: 12,
  },
});