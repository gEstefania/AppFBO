import {StyleSheet} from 'react-native';
import {Colors} from '@common';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginLeft: 10,
    paddingLeft: 20,
    paddingTop: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    margin: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#470000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 1,
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
    height:100
  }
});