import { FlatList, Text, TouchableOpacity, View, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/articleScreen';
import { ListItem } from 'react-native-elements/dist/list/ListItem';

const Post = ({route}) => {
    const data = route.params?.data;
    const color = route.params.color;
    return(
        <ScrollView style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <PrimaryText color={color} style={styles.postTitle}>{data.title}</PrimaryText>
            </View>
            <View style={styles.postContainer}>
                <SecondaryText>{data.body}</SecondaryText>
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