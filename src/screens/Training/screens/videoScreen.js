import React, { useEffect, useState } from 'react';
import { View, FlatList, Pressable, Image, ScrollView, Linking } from "react-native";
import { CheckBox } from 'react-native-elements';
import { PrimaryText, SecondaryText } from '@common';
import styles from './styles/videoScreen';
import Video from 'react-native-video';
import { getExtensionCapitalFromURI, getVideoId } from '@utils/tools'
import YouTube from 'react-native-youtube';
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
                    lessonId:lesson.id,
                    taskId:item.taskId,
                })}
            />
            <SecondaryText>{item.task}</SecondaryText>
        </View>
    )
}

const VideoScreen = ({ route, navigation,tasks,currentCourse,toggleTasks }) => {
    const { lesson } = route.params

    useEffect(() => {
        let subscriber = setTaskLesson(currentCourse.id, lesson.id)
        return subscriber
    }, [])

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.videoContainer}>
                {lesson.url.includes("youtu.be") ? (
                    <YouTube
                        videoId={getVideoId(lesson.url)} // The YouTube video ID

                        style={{ alignSelf: 'stretch', height: 300 }}
                    />
                ) : (
                    <View style={{ height: 300 }}>
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
            {lesson?.archive?.url !== "" && lesson?.archive?.url !== null && (
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
                            <IconDescarga width={45} height={45} />
                        </View>
                    </Pressable>
                </View>
            )}

            <View style={styles.taskContainer}>
                <PrimaryText style={styles.sectionTitle}>Tareas</PrimaryText>
                <View style={styles.itemContainer}>

                    {tasks.map((item) => (
                        <TaskItem item={item} lesson={lesson} toggleTask={toggleTasks} key={item.taskId} />
                    ))}
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