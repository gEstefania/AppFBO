import {StyleSheet} from 'react-native';
import {Colors} from '@common';

export default StyleSheet.create({
  mainContainer: {
    marginLeft: 10,
    paddingLeft: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
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
  btnModal:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 30,
    borderRadius: 100,
    backgroundColor: Colors.CORPORATE_ORANGE,
  },
  btnCard: {
    width: 300,
    height: 400,
    padding: 20,
    marginHorizontal: 10,
    marginBottom: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 30,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#ECF1FE',
    position:"relative"
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  infoContainer:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  icon: {
    width: 25,
    height: 25,
  },
  infoText:{
    fontWeight: 'bold',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  columnText:{
    marginLeft: 10,
    justifyContent: 'center',
  },
  backgorundImage:{
    width:100,
    height:100,
  },
  imgContainer: {
    //width: 100,
    paddingLeft: 20,
    marginBottom: 20,
    backgroundColor: 'red',
  },
  imgIndex: {
   width: 280,
   marginLeft: 20,
   resizeMode: 'contain'
  },
});