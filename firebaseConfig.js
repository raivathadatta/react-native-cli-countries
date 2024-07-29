import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
// import {navigate}
import {requestNotificationPermission} from './pushNotificationConfig';
import {navigate} from './app/navigation/navigationService';

export async function requestUserPermission() {
  await requestNotificationPermission();
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  // console.log(authStatus, enabled, 'auth state');
}

export async function getFcmToken() {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log('FCM Token:', fcmToken);
  } else {
    console.log('Failed to get FCM token');
  }
}

export function setupNotificationListeners() {
  // Handle background and quit state notifications
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log(
      'Message handled in the background!',
      JSON.stringify(remoteMessage),
    );
    handleNavigation(remoteMessage.data);
  });

  // Handle foreground notifications
  messaging().onMessage(async remoteMessage => {
    console.log('Foreground message:', JSON.stringify(remoteMessage));

    PushNotification.localNotification({
      channelId: 'default-channel-id',
      ticker: 'My Notification Ticker',
      showWhen: true,
      autoCancel: true,
      largeIcon: 'ic_launcher',
      largeIconUrl: 'https://www.example.tld/picture.jpg',
      smallIcon: 'ic_notification',
      bigText: remoteMessage.notification.body,
      subText: 'My subtext',
      bigPictureUrl: remoteMessage.notification.imageUrl, // Display the image from FCM
      color: 'red',
      vibrate: true,
      vibration: 300,
      group: 'group',
      ongoing: false,
      priority: 'high',
      visibility: 'private',
      importance: 'high',
      id: 0,
      title: remoteMessage.notification.title,
      message: remoteMessage.notification.body,
      playSound: true,
      soundName: 'default',
      // Pass the screen to navigate to when the notification is tapped
      data: {
        screen: 'webPage',
        imageUrl: remoteMessage.notification.imageUrl,
      },
    });

    // Handle navigation
    handleNavigation(remoteMessage.data);
  });

  // Handle initial notification if app is opened from a notification
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          JSON.stringify(remoteMessage),
        );
        handleNavigation(remoteMessage.data);
      }
    });

  function handleNavigation(data) {
    if (data.screen) {
      navigate(data.screen, {imageUrl: data.imageUrl});
    }
  }
}
