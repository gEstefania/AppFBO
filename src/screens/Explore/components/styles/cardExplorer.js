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
    borderRadius: 15,
    backgroundColor: Colors.PINK,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  cardTitle:{
    fontSize: 12,
  },
  backgroundImage:{
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    borderRadius: 20,
  }
});