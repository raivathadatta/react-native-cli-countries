import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';

export default function ScrollNavigation({navigation}) {
  return (
    <View>
      <ScrollView horizontal style={{height: '400px', marginBottom: 16}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Screen1')}>
          <Text style={styles.buttonText}>Screen 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Screen2')}>
          <Text style={styles.buttonText}>Screen 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Screen3')}>
          <Text style={styles.buttonText}>Screen 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Screen4')}>
          <Text style={styles.buttonText}>Screen 4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Screen5')}>
          <Text style={styles.buttonText}>Screen 5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Screen1')}>
          <Text style={styles.buttonText}>Screen 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Screen2')}>
          <Text style={styles.buttonText}>Screen 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Screen3')}>
          <Text style={styles.buttonText}>Screen 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Screen4')}>
          <Text style={styles.buttonText}>Screen 4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={StyleSheet.button}
          onPress={() => navigation.navigate('Screen5')}>
          <Text style={styles.buttonText}>Screen 5</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#000', // Background color updated to black
    // height:"400px"
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: 15,
    // height:"300px",
    alignItems: 'center',
    borderColor: '#333', // Top bar border color
    // height:"auto",
    backgroundColor: '#333', // Top bar background color
  },
  button: {
    marginHorizontal: 5,
    backgroundColor: '#555', // Button background color
    // // padding: 5,
    // height: 20,
    // width: ,
    padding: 5,
    // paddingVertical: '60px',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff', // Button text color updated to white
  },
});
