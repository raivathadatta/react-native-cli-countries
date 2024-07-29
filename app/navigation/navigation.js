import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ProfileScreen from '../screens/ProfileScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import TextButton from '../screens/components/buttons/TextButton';
import SettingScreen from '../screens/SettingScreen';
import SplashScreen from '../screens/SplashScreen';
import CustomDrawer from './CustomDrawer';
import WebAppPage from '../screens/WebAppPage';
import {navigationRef} from './navigationService'; // Import navigationRef
// import {setupNotificationListeners} from './pushNotificationConfig';
import {StyleSheet} from 'react-native';
import {setupNotificationListeners} from '../../firebaseConfig';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function MyStack() {
  GoogleSignin.configure({
    webClientId:
      '219164080477-llon8jmj8a2lpil152f1sr4b59teo64n.apps.googleusercontent.com', // From Firebase Console
  });

  useEffect(() => {
    // Initialize notification listeners with navigationRef
    setupNotificationListeners();
  }, []);

  return (
    <GestureHandlerRootView style={style.container}>
      <NavigationContainer ref={navigationRef}>
        <InitialStack />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        activeTintColor: '#e91e63',
        itemStyle: {marginVertical: 5},
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="HomeTabs" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={SettingScreen} />
    </Drawer.Navigator>
  );
}

function InitialStack() {
  return (
    <Stack.Navigator
      initialRouteName="Loading"
      screenOptions={({navigation}) => ({
        headerStyle: {
          backgroundColor: '#273469',
        },
        headerTintColor: '#EBF2FA',
        headerRight: () => (
          <TextButton
            title={'profile'}
            onPress={() => navigation.navigate('ProfileScreen')}
            extendedStyle={style.buttonStyle}
          />
        ),
      })}>
      <Stack.Screen
        name="signIn"
        component={SignUpScreen}
        options={{headerRight: null}}
      />
      <Stack.Screen
        name="Home"
        component={MyDrawer}
        options={{
          title: 'Countries',
        }}
      />
      <Stack.Screen
        name="Loading"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen name="detail" component={DetailsScreen} />
      <Stack.Screen name="webPage" component={WebAppPage} />
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      <Stack.Screen name="Screen1" component={Screen1} />
      <Stack.Screen name="Screen2" component={Screen2} />
      <Stack.Screen name="Screen3" component={Screen3} />
      <Stack.Screen name="Screen4" component={Screen4} />
      <Stack.Screen name="Screen5" component={Screen5} />
    </Stack.Navigator>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonStyle: {
    color: 'white',
    marginLeft: 7,
    fontSize: 15,
    fontWeight: 'bold',
    padding: 5,
  },
});

import {View, Text} from 'react-native';

function Screen1() {
  return (
    <View>
      <Text>Screen1</Text>
    </View>
  );
}

function Screen5() {
  return (
    <View>
      <Text>Screen1</Text>
    </View>
  );
}
function Screen2() {
  return (
    <View>
      <Text>Screen1</Text>
    </View>
  );
}
function Screen3() {
  return (
    <View>
      <Text>Screen1</Text>
    </View>
  );
}
function Screen4() {
  return (
    <View>
      <Text>Screen1</Text>
    </View>
  );
}
