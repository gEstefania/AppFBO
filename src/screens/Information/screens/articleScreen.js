import { TouchableOpacity, View, Image, Pressable } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import RenderHtml from 'react-native-render-html';
import { ScrollView } from 'react-native-gesture-handler';
import { PrimaryText, SecondaryText } from '@common';
import styles from './styles/articleScreen';
import { IconCompartir } from '@icons';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/AntDesign'

const Post = ({ route, article }) => {
    const title = route.params?.title;
    const body = route.params?.body;
    const color = route.params?.color || '#000';
    const source = {
        html: `${body || article.body}`
    };
    const image = route.params?.images
    const video = route.params?.video

    const videoRef = useRef(null)
    const [preview, setPreview] = useState()
    const [isPlay, setPlay] = useState(false)


    const onPlay = () => {
        if (isPlay) {
            setPlay(false)
        } else {
            setPlay(true)
        }
    }
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <PrimaryText color={color} style={styles.postTitle}>{title || article.title}</PrimaryText>
            </View>
            <View style={styles.postContainer}>
                <RenderHtml
                    source={source}
                />
            </View>
            {(image) && (
                (image.length > 0 || video.url) && (
                    <View>
                        <PrimaryText color={color}>Multimedia:</PrimaryText>
                        {image && (
                            <View style={{
                                flexDirection: "column",
                                flex: 1
                            }}>
                                <Image resizeMode='contain' style={styles.imagePost} source={{ uri: image[0]?.url }} />
                            </View>
                        )}
                        {video && (
                            <View style={{
                                marginTop: 16,
                                flexDirection: "column",
                                flex: 1,
                                position: "relative",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>

                                <Video source={{ uri: video.url }}
                                    style={styles.imagePost}
                                    paused={!isPlay}
                                    ref={videoRef}
                                    playInBackground={false}
                                    repeat
                                    resizeMode="contain"

                                />
                                {!isPlay ? (
                                    <View style={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                        backgroundColor: "rgba(0,0,0,.5)",
                                        borderRadius: 7,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <Pressable onPress={onPlay}>
                                            <Icon size={46} name="caretright" color="#fff" />
                                        </Pressable>

                                    </View>
                                ) : <View style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: 7,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Pressable onPress={onPlay}>
                                        <Icon size={46} name="pause" color="#fff" />
                                    </Pressable>
                                </View>}


                            </View>
                        )}
                    </View>
                )
            )

            }
        </ScrollView>
    )
}
const mapStateToProps = (state) => ({
    article: state.currentArticle
})

export default connect(mapStateToProps)(Post);