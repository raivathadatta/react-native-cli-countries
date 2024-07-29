import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import * as React from 'react';
import {Linking, StyleSheet, Text} from 'react-native';
import {View} from 'react-native';
import {useSelector} from 'react-redux';

const CustomDrawer = ({children}) => {
  const title = useSelector(state => state.country.practiceTitle);
  return (
    <>
      <View>{children}</View>
      <View>
        <Text style={styles.textLink}>{title}</Text>
      </View>
      <View>
        <Text style={styles.textLink}>asfhasioh</Text>
        <View style={styles.customItem}>
          <Text
            style={styles.textLink}
            onPress={() => {
              Linking.openURL('https://aboutreact.com/');
            }}>
            Rate Us
          </Text>
        </View>
        <DrawerContentScrollView>
          <DrawerItem
            label="Visit Us"
            style={styles.textLink}
            onPress={() => Linking.openURL('https://aboutreact.com/')}
          />
          <View style={styles.customItem}>
            <Text
              style={styles.textLink}
              onPress={() => {
                Linking.openURL('https://aboutreact.com/');
              }}>
              Rate Us
            </Text>
          </View>
        </DrawerContentScrollView>
        <Text style={styles.text}>www.about react.com</Text>
      </View>
    </>
  );
};
export default CustomDrawer;

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
    color: 'red',
  },
  iconStyle: {
    width: 15,
    height: 15,
    color: 'red',
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    color: 'red',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
  },
  textLink: {
    color: 'red',
  },
});
