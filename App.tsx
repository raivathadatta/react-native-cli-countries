/* eslint-disable react-native/no-inline-styles */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import MyStack from './app/navigation/navigation';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import store from './app/data/appredux/reduxstore';
import {setupNotificationListeners} from './firebaseConfig';

// Import the push notification configuration
function App() {
  useEffect(() => {
    setupNotificationListeners();
  }, []);
  return (
    <Provider store={store}>
      <View style={{height: '100%', width: '100%'}}>
        <MyStack />
      </View>
    </Provider>
  );
}
export default App;
