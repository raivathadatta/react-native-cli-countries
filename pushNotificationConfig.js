import PushNotification from 'react-native-push-notification';
import {Alert, PermissionsAndroid} from 'react-native';

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: 'default-channel-id',
    channelName: 'Default Channel',
    channelDescription: 'A default channel',
    playSound: true,
    soundName: 'default',
    importance: 4,
    vibrate: true,
  },
  created => console.log(`createChannel returned '${created}'`),
);

async function requestNotificationPermission() {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log('notifications');
  } else {
    Alert.alert('notification permission denied');
  }
}

export {requestNotificationPermission};
