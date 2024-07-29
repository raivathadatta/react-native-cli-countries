import {View, TextInput, StyleSheet} from 'react-native';
import React from 'react';

export default function AppInputTextFelid({
  value,
  onChangeText,
  extendedStyle,
  ...props
}) {
  return (
    <View style={style.container}>
      <TextInput
        placeholderTextColor="#000"
        style={{...style.inputText, ...extendedStyle}}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: '90%',
  },
  inputText: {
    backgroundColor: 'lightgray',
    color: 'red',
    marginTop: 5,
    borderRadius: 40,
    padding: 8,
    paddingHorizontal: 15,
  },
});
