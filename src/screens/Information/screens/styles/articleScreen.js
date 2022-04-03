import {StyleSheet,Dimensions} from 'react-native';

const widthScreen = Dimensions.get("screen").width
const heightScreen = Dimensions.get("screen").height
export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  titleContainer:{
    marginBottom: 20,
    marginTop:10,
    marginLeft:7,
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
    height:300,
    backgroundColor:"#000",
    justifyContent:"center",
    alignItems:"center",
  }
});