/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
function WebAppPage() {
  const handleOpenInAppBrowser = async URL => {
    if (InAppBrowser) {
      try {
        const url = URL; // Replace with the URL you want to open
        const result = await InAppBrowser.open(url, {
          dismissButtonStyle: 'close',
          preferredBarTintColor: '#000',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          showTitle: true,
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          headers: {
            'my-custom-header': 'my-custom-header-value',
          },
        });

        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() =>
          handleOpenInAppBrowser(
            'https://blog.logrocket.com/improving-mobile-ux-react-native-inappbrowser-reborn/',
          )
        }>
        <Text style={{color: 'red'}}>Open openreplay In-App Browser</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleOpenInAppBrowser('https://www.google.com/')}>
        <Text style={{color: 'red'}}>Open google In-App Browser</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          handleOpenInAppBrowser('https://jsonplaceholder.typicode.com/')
        }>
        <Text style={{color: 'red'}}>
          Open json place holder In-App Browser
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
export default WebAppPage;
