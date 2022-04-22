import * as React from 'react';
import { View, FlatList, TouchableOpacity } from "react-native";
import {PrimaryText, SecondaryText} from '@common';
import { Thumbnail } from 'react-native-thumbnail-video';
import styles from './styles/lessonScreen';
import { connect } from 'react-redux';
import { getCoursesLessons } from '../../../firestore/courses';
import {IconPlay} from '@icons';

const LessonScreen = ({navigation,lessons,currentCourse}) => {

    React.useEffect(() => {
        let subscriber = getCoursesLessons(currentCourse.id)
        return subscriber
    },[])

    const renderList = ({item}) => {
        if(item.enabled === true){
            return (
                <TouchableOpacity
                    onPress={() => navigation.navigate("LessonVideo",{lesson:item})}
                    style={styles.btnSteps}
                >
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Thumbnail showPlayIcon={false} imageWidth={80} imageHeight={45} containerStyle={styles.thumbnail} url={item.url}>
                            <IconPlay width={30} height={30}/>
                        </Thumbnail>
                        
                    </View>
                    <View style={styles.descContainer}>
                        <PrimaryText style={styles.btnText}>{item.title}</PrimaryText>
                        <SecondaryText color={'gray'} style={styles.btnText}>{item.subtitle}</SecondaryText>
                    </View>
                </TouchableOpacity>
            );
        }
        
    };
    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={lessons}
                renderItem={renderList}
                //keyExtractor={item => item.id}
                style={styles.btnList}
            />
        </View>
    )
}
const mapStateToProps = (state) =>({
    lessons:state.lessons,
    currentCourse:state.currentCourse
})
export default connect(mapStateToProps) (LessonScreen);