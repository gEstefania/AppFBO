import { TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import {PrimaryText, SecondaryText} from '@common';
import styles from './styles/articleScreen';
import RenderHtml from 'react-native-render-html';

const Post = ({route, article}) => {
    const data = route.params?.item
    const title = route.params?.title;
    const body = route.params?.body;
    const color = route.params?.color || '#000';
    const source = {
        html: `${body || article.body || data.body}`
      };
    return(
        <ScrollView style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <PrimaryText color={color} style={styles.postTitle}>{title || article.title || data.title}</PrimaryText>
            </View>
            <View style={styles.postContainer}>
                <RenderHtml
                    source={source}
                />
            </View>
        </ScrollView>
    )
}
const mapStateToProps=(state)=>({
    article:state.currentArticle
})

export default connect(mapStateToProps)(Post);