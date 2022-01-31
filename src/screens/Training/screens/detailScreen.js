import * as React from 'react';
import { View, Image } from "react-native";
import styles from './styles/detailScreen';
import { ScrollView } from 'react-native-gesture-handler';
import {PrimaryText, SecondaryText} from '@common';

const DetailScreen = ({route, navigation}) => {
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.titleCard}>
                <PrimaryText style={styles.titleText}>Desde Cero</PrimaryText>
            </View>
            <View style={styles.detailCard}>
                <View style={styles.imgContainer}>
                    <Image style={styles.img}/>
                </View>
                <View style={styles.nameCard}>
                    <SecondaryText style={styles.speakerText}>Ponente</SecondaryText>
                    <SecondaryText style={styles.nameSpeakerText}>Nombre Apellidos</SecondaryText>
                    <SecondaryText>Cargo</SecondaryText>
                </View>
            </View>
            <View style={styles.contentView}>
                <SecondaryText>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea</SecondaryText>
            </View>
        </ScrollView>
    )
}

export default DetailScreen;