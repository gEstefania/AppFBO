import React from 'react';
import {StyleSheet, Text} from 'react-native';

const PrimaryText = (props) => {
  const styles = StyleSheet.create({
  font: {
      fontFamily: `Poppins-${props.type ? props.type : 'Bold'}`,
      color: `${props.color ? props.color : '#ff9b04'}`,
    },
  });
  return (
    <Text
      onPress={props.onPress}
      numberOfLines={props.numberOfLines}
      onTextLayout={props.onTextLayout}
      style={[props.style, styles.font]}
      //ellipsizeMode="tail"
    >
      {props.children}
    </Text>
  );
};

export default PrimaryText;