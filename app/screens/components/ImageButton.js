import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function ImageButton({image, onPress}) {
  return (
    <View style={style.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <Image source={image} />
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: 'black',

    justifyContent: 'center',
    alignItems: 'center',
  },
});
