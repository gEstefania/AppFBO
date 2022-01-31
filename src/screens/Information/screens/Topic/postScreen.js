import { FlatList, Text, TouchableOpacity, View, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/postScreen';

const Post = ({route}) => {
    const color = route.params.color;
    return(
        <ScrollView style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <PrimaryText color={color} style={styles.postTitle}>{route.params.title}</PrimaryText>
            </View>
            <View style={styles.postContainer}>
                <SecondaryText>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</SecondaryText>
                <SecondaryText>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</SecondaryText>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.btnShare}
                >
                    <Image/>
                    <PrimaryText type={'Regular'} style={styles.text}>Compartir</PrimaryText>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Post;