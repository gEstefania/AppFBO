import { TouchableOpacity, View,Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import RenderHtml from 'react-native-render-html';
import { ScrollView } from 'react-native-gesture-handler';
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/articleScreen';
import {IconCompartir} from '@icons';
import Video from 'react-native-video';

const Post = ({route, article}) => {
    const title = route.params?.title;
    const body = route.params?.body;
    const color = route.params?.color || '#000';
    const source = {
        html: `${body || article.body}`
    };
    const image = route.params?.images
    const video = route.params?.video
    return(
        <ScrollView style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <PrimaryText color={color} style={styles.postTitle}>{title || article.title}</PrimaryText>
            </View>
            <View style={styles.postContainer}>
                <RenderHtml
                    source={source}
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
                                <Image resizeMode='contain' style={styles.imagePost} source={{ uri: image[0].url }} />
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
        </ScrollView>
    )
}
const mapStateToProps=(state)=>({
    article:state.currentArticle
})

export default connect(mapStateToProps)(Post);