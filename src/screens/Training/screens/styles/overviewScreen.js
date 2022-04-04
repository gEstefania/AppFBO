import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  summaryContainer:{
    //backgroundColor: 'rgba(255, 155, 4, 0.5)', //se va a sustituir por una imagen.
    width: 350,
    height: 150,
    paddingHorizontal: 10,

    borderRadius: 30,
  },
  row: { 
    marginTop: -70,
    flexDirection: 'row',
    marginBottom: 70,
    marginLeft:20,
  },
  columnText:{
    marginTop: 0,
    marginLeft: 20,
    justifyContent: 'center',
  },
  descContainer: {
    marginLeft:13,
    marginTop:5,
    flex: 2,
  }
});