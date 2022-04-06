import { TouchableOpacity, View, Linking, Pressable, useWindowDimensions, ActivityIndicator } from 'react-native';
import React, { useCallback, useState, useRef } from 'react';
import { connect } from 'react-redux';
import RenderHtml from 'react-native-render-html';
import { ScrollView } from 'react-native-gesture-handler';
import { PrimaryText, SecondaryText } from '@common';
import styles from './styles/articleScreen';
import {IconDescarga, IconCompartir} from '@icons';
import YoutubePlayer from "react-native-youtube-iframe";
import { Vimeo } from 'react-native-vimeo-iframe';
import { getVideoId } from '@utils/tools';
import Icon from 'react-native-vector-icons/AntDesign'

const Post = ({ route, article }) => {
    // console.log('Viene o no video',route.params?.video)
    const title = route.params?.title;
    const body = route.params?.body;
    const color = route.params?.color;
    const { width } = useWindowDimensions();
    const source = {
        html: `<div class="text">${body || article.body}</div>`
    };
    const image = route.params?.images
    const video = route.params?.video
    const archive = route.params?.archive || false

    const videoRef = useRef(null)
    const [preview, setPreview] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isPlay, setPlay] = useState(false)

    const onStateChange = useCallback((state) => {
        if (state === "ready") {
          setIsLoading(false);
        }
      }, []);

    const onPlay = () => {
        if (isPlay) {
            setPlay(false)
        } else {
            setPlay(true)
        }
    }

    const download = () => {
        if (route.params?.archive?.url) {
            Linking.openURL(route.params?.archive?.url)
        }
    }

    const mixedStyles = { 
        "text": { color: '#000'}, 
    };

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <PrimaryText color={color} style={styles.postTitle}>{title || article.title}</PrimaryText>
            </View>
            <View style={styles.postContainer}>
                <RenderHtml
                    classesStyles={mixedStyles}
                    contentWidth={width}
                    source={source}
                />
            </View>
            { archive.url ? (
                <Pressable
                    onPress={() => download()}
                    style={styles.downloadCard}>
                    <View style={styles.textContainer}>
                        <SecondaryText color={'#fff'} type={'Bold'} style={styles.text}>{archive.fileName}</SecondaryText>
                    </View>
                    <View>
                        <IconDescarga width={45} height={45} />
                    </View>
                </Pressable>
            ) : (
                null
            )}
            { video && typeof video !== 'object' && (
                (video.includes('youtu.be')) ? (
                <YoutubePlayer
                    height={200}
                    onReady={() => onStateChange("ready")}
                    videoId={getVideoId(video)} // The YouTube video ID
                    webViewProps={{
                        allowsInlineMediaPlayback: false,
                        allowsFullscreenVideo: true,
                        androidLayerType: 'hardware',
                    }}
                />
            ) : (
                <View style={{ height: 300 }}>
                <Vimeo
                
                    videoId={getVideoId(video)}
                    onReady={() => console.log('Video is ready')}
                    onPlay={() => console.log('Video is playing')}
                    onPlayProgress={(data) => console.log('Video progress data:', data)}
                    onFinish={() => console.log('Video is finished')}
                    loop={false}
                    autoPlay={false}
                    controls={true}
                    speed={false}
                />
            </View>
            )) }
            {/* Compartir boton */}
            <TouchableOpacity style={styles.shareButton}>
                <View style={styles.shareContainer}>
                    <IconCompartir width={35} height={35} />
                    <PrimaryText type={'Regular'} style={styles.shareText}>{'Compartir'}</PrimaryText>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}
const mapStateToProps = (state) => ({
    article: state.currentArticle
})

export default connect(mapStateToProps)(Post);