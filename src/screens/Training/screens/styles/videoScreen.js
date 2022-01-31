import {StyleSheet} from 'react-native';
import {Colors} from '@common';

export default StyleSheet.create({
  mainContainer:{
    flex: 1,
    paddingHorizontal: 20,
  },
  videoContainer:{
    flex: 2,
    marginBottom: 30,
  },
  videoSize:{
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  videoTitle:{
    flex: 1,
    marginBottom: 30,
  },
  descContainer:{
    flex: 1,
    marginBottom: 30,
  },
  resourceContainer:{
    flex: 1,
    marginBottom: 30,
  },
  taskContainer:{
    flex: 1,
    marginBottom: 30,
  },
  itemContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.CORPORATE_ORANGE,
  },
  downloadCard:{
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingVertical: 25,
    backgroundColor: Colors.CORPORATE_ORANGE,
  },
  textContainer:{
    flex: 1,
  },
  icon: {
    width: 45,
    height: 45,
  },
  sectionTitle:{
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textTransform: 'uppercase',
  },
});