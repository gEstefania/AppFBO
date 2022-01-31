import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  summaryContainer:{
    backgroundColor: 'rgba(255, 155, 4, 0.5)', //se va a sustituir por una imagen.
    marginBottom: 30,
    paddingHorizontal: 30,
    paddingTop: 30,
    borderRadius: 30,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  columnText:{
    marginLeft: 20,
    justifyContent: 'center',
  },
  descContainer: {
    flex: 2,
  },
});