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
    marginRight: 15, // las imaganes se van mas separadas porque estan en formato jpg, y tienen espacio blanco extra
    borderRadius: 15,
    backgroundColor: Colors.PINK,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
});