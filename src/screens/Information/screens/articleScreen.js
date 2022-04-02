import { TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import RenderHtml from 'react-native-render-html';
import { ScrollView } from 'react-native-gesture-handler';
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/articleScreen';
import {IconCompartir} from '@icons';

const Post = ({route, article}) => {
    const source = {
        html: `${body || article.body}`
    };
    const title = route.params?.title;
    const body = route.params?.body;
    const color = route.params?.color || '#000';
    console.log(route)
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
const mapStateToProps=(state)=>({
    article:state.currentArticle
})

export default connect(mapStateToProps)(Post);