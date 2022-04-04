import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  btn:{
    flex: 0.47,
    height: 160,
    justifyContent: 'flex-end',
    borderRadius: 20,
    backgroundColor: '#ECF1FD'
  },
  btnCourse:{
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    borderRadius: 20,
  },
  courseInfo:{
    flexDirection: 'row'
  },
  fontTitle:{
    fontSize: 10,
  },
  fontInfo: {
    marginTop:2,
    fontSize: 12,
    paddingHorizontal: 5,
  },
  tittleText:{
    marginLeft: 20,
  }
});