import { TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/articleScreen';
import {IconCompartir} from '@icons';

const Post = ({route}) => {
    const data = route.params?.data;
    const color = route.params.color;
    console.log(data)
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
                    <IconCompartir width={30} height={30} />
                    <PrimaryText type={'Regular'} style={styles.text}>Compartir</PrimaryText>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Post;