import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import React from 'react';

export default function TextButton({onPress, title, extendedStyle}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={style.container}>
        <Text style={{...style.text, ...extendedStyle}}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
const style = StyleSheet.create({
  container: {
    padding: 5,
  },
  text: {
    color: 'black',
    marginTop: 8,
  },
});
