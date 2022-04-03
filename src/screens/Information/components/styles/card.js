import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginBottom: 20,
    marginTop: 5,
    marginRight:0,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 6,
    marginLeft:3,
  },
  cardView: {
    width: 140,
    height: 140,
    marginRight: 15,
    marginTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    justifyContent: 'flex-end',
    borderRadius: 15,
  },
  titleSection: {
    fontSize: 22,
  },
  cardText: {
    marginTop: 5,
    fontSize: 14,
  },
  cardTitle: {
    maxWidth: 80,
  },
});