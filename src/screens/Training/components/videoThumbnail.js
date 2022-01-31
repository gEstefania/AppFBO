import React from 'react';
import style from './styles/VideoThumbnail';
import {View} from 'react-native'
import Video from 'react-native-video';
//import {Icon} from 'react-native-elements';

const VideoThumbnail=({uri})=>{
  // console.log(uri)
    return(
        <View style={style.containerItem}>
          <Video
            resizeMode="cover"
            source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
            //ref={ref => this.player = ref}
            style={style.item}
          />
          <View style={style.containerIconItem}>
            
          </View>
        </View>
    )
}

export default VideoThumbnail;

/*<Icon
name="play-circle"
type="font-awesome-5"
size={48}
color="#fff"
/>*/