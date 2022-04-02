import { TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { PrimaryText, SecondaryText } from '@common';
import styles from './styles/articleScreen';
import { IconCompartir } from '@icons';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import Video from 'react-native-video';

const Post = ({ route, article }) => {
    const title = route.params?.title;
    const body = route.params?.body;
    const color = route.params?.color || '#000';

    const { width } = useWindowDimensions();

    const htmlBody = {
        html: body || article.body
    }

    const image = route.params?.images[0]
    const video = route.params?.video

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <PrimaryText color={color} style={styles.postTitle}>{title || article.title}</PrimaryText>
            </View>
            <View style={styles.postContainer}>
                <RenderHtml
                    contentWidth={width}
                    source={htmlBody}
                />
            </View>
            {
                (image || video) && (
                    <View>
                        <PrimaryText color={color}>Multimedia:</PrimaryText>
                        {image && (
                            <View style={{
                                flexDirection: "column",
                                flex: 1
                            }}>
                                <Image resizeMode='contain' style={styles.imagePost} source={{ uri: image.url }} />
                            </View>
                        )}
                        {video && (
                            <View style={{
                                flexDirection: "column",
                                flex: 1
                            }}>
                                <Video source={{ uri: video.url }}  
                                    style={styles.imagePost}
                                    controls
                                    paused
                                    playInBackground={false}
                                     />
                            </View>
                        )}
                    </View>
                )
            }

            {/*
            <View>
                <TouchableOpacity
                    style={styles.btnShare}
                >
                    <IconCompartir width={30} height={30} />
                    <PrimaryText type={'Regular'} style={styles.text}>Compartir</PrimaryText>
                </TouchableOpacity>
            </View>
             */}

        </ScrollView>
    )
}
const mapStateToProps = (state) => ({
    article: state.currentArticle
})

export default connect(mapStateToProps)(Post);