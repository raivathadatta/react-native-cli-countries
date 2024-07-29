// InputGroup.js
import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const InputGroup = ({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  placeholder,
  keyboardType,
}) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.title}>{label}:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={'red'}
        keyboardType={keyboardType}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 15,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    color: 'red',
    // width:"100%"
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
  title: {
    color: 'red',
  },
});

export default InputGroup;
