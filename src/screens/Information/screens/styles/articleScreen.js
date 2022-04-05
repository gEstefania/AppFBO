import {StyleSheet,Dimensions} from 'react-native';
import {Colors} from '@common';

const widthScreen = Dimensions.get("screen").width
const heightScreen = Dimensions.get("screen").height

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  titleContainer:{
    marginBottom: 20,
    marginTop:13,
    marginLeft:10,
  },
  postTitle: {
    fontSize: 18,
  },
  postContainer: {
    //flex: 1,
  },
  btnShare: {
    width: '100%',
    flexDirection: 'row',
    padding: 20,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ff9b04',
    borderRadius: 50,
    borderWidth: 1,
  },
  text:{
    color: '#ff9b04',
    textTransform: 'uppercase',
  },
  imagePost:{
    width: widthScreen,
    height:200,
    backgroundColor:"#000",
    justifyContent:"center",
    alignItems:"center",
  },
  downloadCard:{
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingVertical: 25,
    backgroundColor: Colors.CORPORATE_ORANGE,
    marginVertical: 30,
  },
  textContainer:{
    flex: 1,
  },
  text: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: Colors.CORPORATE_ORANGE,
  },
  shareText: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: Colors.CORPORATE_ORANGE,
    marginLeft: 10,
  },
  shareContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ECF1FE',
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 50,
    marginVertical: 20,
  }
});