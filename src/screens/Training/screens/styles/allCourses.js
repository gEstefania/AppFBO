import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  btnCourse:{
    flex: 0.47,
    height: 160,
    justifyContent: 'flex-end',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#ECF1FD'
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