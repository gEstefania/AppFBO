import React from 'react';
import {StyleSheet, Text} from 'react-native';

const SecondaryText = (props) => {
  const styles = StyleSheet.create({
  font: {
      fontFamily: `Poppins-${props.type ? props.type : 'Regular'}`,
      color: `${props.color ? props.color : '#000'}`,
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

export default SecondaryText;