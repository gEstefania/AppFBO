import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Pressable, Image, ScrollView, Linking, ActivityIndicator } from "react-native";
import { CheckBox } from 'react-native-elements';
import { PrimaryText, SecondaryText } from '@common';
import styles from './styles/videoScreen';
import Video from 'react-native-video';
import { getExtensionCapitalFromURI, getVideoId } from '@utils/tools'
import YoutubePlayer from "react-native-youtube-iframe";
import { Vimeo } from 'react-native-vimeo-iframe'
import { connect } from 'react-redux';
import { setTaskLesson } from '@firestore/courses'
import {toggleTasks} from '../../../redux/actions/tasksActions'
import {IconDescarga} from '@icons';

export const TaskItem = ({item,toggleTask,lesson}) => {
    
    return (
        <View style={styles.taskItem}>
            <CheckBox
                center
                checked={item.complete}
                onPress={() =>toggleTask({
                    lessonId:lesson?.id,
                    taskId:item.taskId,
                })}
            />
            <SecondaryText color={'gray'}>{item.task}</SecondaryText>
        </View>
    )
}

const VideoScreen = ({ route, navigation,tasks,currentCourse,toggleTasks }) => {
    const { lesson } = route.params
    const [ isLoadingVideo, setIsLoadingVideo ] = useState(true)

    const onStateChange = useCallback((state) => {
        if (state === "ready") {
          setIsLoadingVideo(false);
        }
      }, []);

    const download = () => {
        if (lesson?.archive?.url) {
            Linking.openURL(lesson?.archive?.url)
        }
    }
    useEffect(() => {
        let subscriber = setTaskLesson(currentCourse.id, lesson?.id)
        return subscriber
    }, [])

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.videoContainer}>
                {lesson?.url.includes("youtu.be") ? (
                    <View style={{ height: 200, backgroundColor: '#ECF1FE', elevation: 4, justifyContent: 'center' }}>
                        { isLoadingVideo && (
                            <ActivityIndicator size="large" style={{ position: "absolute", alignSelf: 'center' }} color="#FF9B05" />
                        )}
                        <YoutubePlayer
                            height={200}
                            onReady={() => onStateChange("ready")}
                            videoId={getVideoId(lesson.url)} // The YouTube video ID
                            webViewProps={{
                                allowsInlineMediaPlayback: false,
                                allowsFullscreenVideo: true,
                                androidLayerType: 'hardware',
                            }}
                        />
                    </View>
                ) : (
                    <View style={{ height: 200 }}>
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
                <PrimaryText color={'gray'}>{lesson?.title}</PrimaryText>
                <SecondaryText color={'gray'}>¿Cómo empezar?</SecondaryText>
            </View>
            <View style={styles.descContainer}>
                <PrimaryText style={styles.sectionTitle}>Descripción</PrimaryText>
<<<<<<< HEAD
<<<<<<< HEAD
                <SecondaryText color={'gray'}>{lesson.description}</SecondaryText>
=======
                <SecondaryText>{lesson?.description}</SecondaryText>
>>>>>>> 84e88c3187b0b98d31fdc3598cdf07c4385e001d
=======
                <SecondaryText>{lesson?.description}</SecondaryText>
>>>>>>> 84e88c3187b0b98d31fdc3598cdf07c4385e001d
            </View>
            {lesson?.archive?.url && (
                <View style={styles.resourceContainer}>
                    <PrimaryText style={styles.sectionTitle}>Recursos</PrimaryText>
                    <Pressable
                        onPress={() => download()}
                        style={styles.downloadCard}>
                        <View style={styles.textContainer}>
                            <SecondaryText color={'#fff'} type={'Bold'} style={styles.text}>{lesson?.archive?.fileName}</SecondaryText>
                        </View>
                        <View>
                            <IconDescarga width={45} height={45} />
                        </View>
                    </Pressable>
                </View>
            )}

            <View style={styles.taskContainer}>
                <PrimaryText style={styles.sectionTitle}>Tareas</PrimaryText>
                <View style={styles.itemContainer}>
                    { tasks.length === 0 && (
                        <SecondaryText color={'gray'}>No hay tareas disponibles</SecondaryText>
                    )}
                    {tasks.map((item, i) => {
                        // console.log(item, 'item', lesson.id)
                        if (item.lessonId === lesson?.id) {
                        return (
                            <View key={i}>
                                <TaskItem  item={item} lesson={lesson} toggleTask={toggleTasks} key={item.taskId} />
                            </View>
                        )}
                    })}
                </View>

            </View>
        </ScrollView>
    )
};
const mapStateToProps = (state) => ({
    currentCourse: state.currentCourse,
    tasks: state.tasks
})
const dispatchStateToProps={
    toggleTasks
}
export default connect(mapStateToProps,dispatchStateToProps)(VideoScreen);