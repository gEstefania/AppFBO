import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 40,
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
    fontSize: 14,
  },
  cardTitle: {
    maxWidth: 100,
  },
});