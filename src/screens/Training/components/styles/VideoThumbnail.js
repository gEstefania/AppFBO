import {Dimensions, StyleSheet} from 'react-native';

const widthDimen = Dimensions.get('screen').width;

export default StyleSheet.create({
    containerItem: {
        //height: 130,
        //flexDirection: 'column',
        //alignItems: 'stretch',
        //justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#ECF1FE',
    },
    item: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    containerIconItem: {
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
    },
});
