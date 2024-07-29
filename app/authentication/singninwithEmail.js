/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AppInputTextField from '../screens/components/AppInputTextFelids';
import CustomButton from '../screens/components/buttons/CustomAppButton';
import TextButton from '../screens/components/buttons/TextButton';

const EmailPasswordAuth = ({
  handleSignIn,
  handleSignUp,
  message,
  email,
  setEmail,
  password,
  setPassword,
  isSignUp,
  setIsSignUp,
}) => {
  return (
    <View style={styles.container}>
      <AppInputTextField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <AppInputTextField
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        keyboardType="default"
        autoCapitalize="none"
        placeholder="Password"
      />

      {isSignUp ? (
        <>
          <CustomButton onPress={handleSignUp} title="Sign Up" />
          <TextButton
            title="Already have an account? Log in"
            onPress={() => setIsSignUp(false)}
          />
        </>
      ) : (
        <>
          <CustomButton onPress={handleSignIn} title="Log In" />
          <TouchableOpacity onPress={() => setIsSignUp(true)}>
            <Text style={{color: 'black', marginTop: 6}}>
              New to the app? Sign up
            </Text>
          </TouchableOpacity>
        </>
      )}

      {message ? <Text style={{color: 'red'}}>{message}</Text> : null}
    </View>
  );
};

export default EmailPasswordAuth;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flex: 2,
    backgroundColor: 'white',
    alignItems: 'stretch',
  },
});
