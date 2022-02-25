import React, { useEffect, useState } from 'react';
import { View, FlatList, Pressable, Image, ScrollView, Linking } from "react-native";
import { CheckBox } from 'react-native-elements';
import { PrimaryText, SecondaryText } from '@common';
import styles from './styles/videoScreen';
import Video from 'react-native-video';
import { getExtensionCapitalFromURI, getVideoId } from '@utils/tools'
import YouTube from 'react-native-youtube';
import { Vimeo } from 'react-native-vimeo-iframe'

const VideoScreen = ({ route, navigation }) => {
    const { lesson } = route.params
    const [checkDownload, setCheckDownload] = useState(false);

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.videoContainer}>
                {lesson.url.includes("youtu.be") ? (
                    <YouTube
                        videoId={getVideoId(lesson.url)} // The YouTube video ID

                        style={{ alignSelf: 'stretch', height: 300 }}
                    />
                ) : (
                    <View style={{height:300}}>
                        <Vimeo
                            videoId={getVideoId(lesson.url)}
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
                )}
            </View>
            <View style={styles.videoTitle}>
                <PrimaryText color={'gray'}>{lesson.title}</PrimaryText>
                <SecondaryText color={'gray'}>¿Cómo empezar?</SecondaryText>
            </View>
            <View style={styles.descContainer}>
                <PrimaryText style={styles.sectionTitle}>Descripción</PrimaryText>
                <SecondaryText>{lesson.description}</SecondaryText>
            </View>
            <View style={styles.resourceContainer}>
                <PrimaryText style={styles.sectionTitle}>Recursos</PrimaryText>
                <Pressable
                    onPress={() => {
                        Linking.openURL(lesson.archive.url)
                    }}
                    style={styles.downloadCard}>
                    <View style={styles.textContainer}>
                        <SecondaryText color={'#fff'} type={'Bold'} style={styles.text}>{lesson.archive.fileName}</SecondaryText>
                        <SecondaryText color={'#fff'} type={'Bold'}>{getExtensionCapitalFromURI(lesson.archive.url)}</SecondaryText>
                    </View>
                    <View>
                        <Image source={require('../../../assets/img/icons/home.jpg')} style={styles.icon} />
                    </View>
                </Pressable>
            </View>
            <View style={styles.taskContainer}>
                <PrimaryText style={styles.sectionTitle}>Tareas</PrimaryText>
                <View style={styles.itemContainer}>

                    {lesson.checks.map((item, i) => (
                        <View style={styles.taskItem} key={i}>
                            <CheckBox
                                center
                                checked={checkDownload}
                                onPress={() => setCheckDownload(!checkDownload)}
                            />
                            <SecondaryText>{item}</SecondaryText>
                        </View>
                    ))}
                </View>

            </View>
        </ScrollView>
    )
};

export default VideoScreen;