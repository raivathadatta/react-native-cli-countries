import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function CustomButton({title, onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '80%',
    marginTop: 20, // Set the width of the button here
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    borderRadius: 50,
  },
  buttonText: {
    color: 'red',
    fontSize: 16,
  },
});
