import React from 'react';
import {View, Alert, Text, StyleSheet} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import ImageButton from '../screens/components/ImageButton';
import ImageLocations from '../utils/imageLoactios';

const GoogleSignInAuth = () => {
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={style.container}>
      <ImageButton
        image={ImageLocations.googleSignInImage}
        onPress={signInWithGoogle}
      />
    </View>
  );
};

export default GoogleSignInAuth;

const style = StyleSheet.create({
  container: {flex: 1, width: '100%', borderRadius: 30, padding: 5},
});
