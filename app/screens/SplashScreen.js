import {
  View,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, {useEffect} from 'react';
import ImageLocations from '../utils/imageLoactios';
import auth from '@react-native-firebase/auth';
import fetchCountriesData from '../data/api/getApiCalls';
import {useDispatch} from 'react-redux';
import {setCountries} from '../data/appredux/countrySlice';

export default function SplashScreen({navigation}) {
  function onAuthStateChanged(user) {
    setTimeout(() => {
      if (!user) {
        navigation.replace('signIn');
        return;
      }

      getData();
    }, 500);
  }
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const countries = await fetchCountriesData();
      dispatch(setCountries(countries));
      navigation.replace('Home');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });

  return (
    <View>
      <ImageBackground
        style={style.backGroundImage}
        source={ImageLocations.loadingScreenImage}>
        <View style={style.activeIndicatorView}>
          <ActivityIndicator color={'red'} size={20} />
        </View>
      </ImageBackground>
    </View>
  );
}

const style = StyleSheet.create({
  activeIndicatorView: {
    padding: 20,
  },
  backGroundImage: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
