/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import EmailPasswordAuth from '../authentication/singninwithEmail';
import GoogleSignInAuth from '../authentication/signInwithGoogle';
import {Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import fetchCountriesData from '../data/api/getApiCalls';
import {setCountries} from '../data/appredux/countrySlice';
import {useDispatch} from 'react-redux';

export default function SignUpScreen({navigation}) {
  const dispatch = useDispatch();
  const [userDetails, setDetails] = useState({email: '', password: ''});
  const [message, setMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // State to switch between login and sign-up

  const handleSignUp = async () => {
    try {
      console.log(userDetails);
      await auth().createUserWithEmailAndPassword(
        userDetails.email,
        userDetails.password,
      );
      console.log(message);
      setMessage('User account created & signed in!');
      navigation.replace('Home');
    } catch (error) {
      console.log(error);
      setMessage(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(
        userDetails.email,
        userDetails.password,
      );
      const countries = await fetchCountriesData();
      dispatch(setCountries(countries));
      // navigation.replace('Home');
      navigation.replace('Home');
    } catch (error) {
      setMessage(error.message);
    }
  };
  return (
    <View style={style.container}>
      <Text style={{color: 'black', fontSize: 30, fontWeight: 'bold'}}>
        {isSignUp ? 'welcome' : 'Login'}
      </Text>
      <EmailPasswordAuth
        handleSignIn={handleSignIn}
        handleSignUp={handleSignUp}
        email={userDetails.email}
        setEmail={email => setDetails({...userDetails, ['email']: email})}
        password={userDetails.password}
        setPassword={password =>
          setDetails({...userDetails, ['password']: password})
        }
        isSignUp={isSignUp}
        message={message}
        setIsSignUp={setIsSignUp}
      />
      <GoogleSignInAuth />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
});
