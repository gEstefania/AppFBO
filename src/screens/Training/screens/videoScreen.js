import React, {useEffect, useState} from 'react';
import { View, FlatList, TouchableOpacity, Image, ScrollView } from "react-native";
import { CheckBox } from 'react-native-elements';
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/videoScreen';
import Video from 'react-native-video';

const VideoScreen = () => {
    const [checkDownload, setCheckDownload] = useState(false);

    return(
        <ScrollView style={styles.mainContainer}>
            <View style={styles.videoContainer}>
                <Video
                    resizeMode="cover"
                    source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
                    thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
                    paused={true}
                    onFullScreen={true}
                    fullscreen={true}
                    controls={true}
                    style={styles.videoSize}
                    controls={true}
                />
            </View>
            <View style={styles.videoTitle}>
                    <PrimaryText color={'gray'}>Paso 1</PrimaryText>
                    <SecondaryText color={'gray'}>¿Cómo empezar?</SecondaryText>
            </View>
            <View style={styles.descContainer}>
                <PrimaryText style={styles.sectionTitle}>Descripción</PrimaryText>
                <SecondaryText>autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</SecondaryText>
            </View>
            <View style={styles.resourceContainer}>
                <PrimaryText style={styles.sectionTitle}>Recursos</PrimaryText>
                <View style={styles.downloadCard}>
                    <View style={styles.textContainer}>
                        <SecondaryText color={'#fff'} type={'Bold'} style={styles.text}>Guía Basica</SecondaryText>
                        <SecondaryText color={'#fff'} type={'Bold'}>PDF</SecondaryText>
                    </View>
                    <View>
                        <Image source={require('../../../assets/img/icons/home.jpg')} style={styles.icon}/>
                    </View>
                </View>
            </View>
            <View style={styles.taskContainer}>
                <PrimaryText style={styles.sectionTitle}>Tareas</PrimaryText>
                <View style={styles.itemContainer}>
                    <CheckBox
                        center
                        checked={checkDownload}
                        onPress={() => setCheckDownload(!checkDownload)}
                    />
                    <SecondaryText>Descarga la guía básica</SecondaryText>
                </View>
            </View>
        </ScrollView>
    )
};

export default VideoScreen;