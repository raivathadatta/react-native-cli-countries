// CustomToast.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';

const CustomToast = ({message, onClose, visible}) => {
  const animatedValue = new Animated.Value(0);

  React.useEffect(() => {
    if (visible) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          opacity: animatedValue,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0], // Adjust for the animation effect
              }),
            },
          ],
        },
      ]}>
      <View style={styles.toastContent}>
        <Image
          style={styles.icon}
          source={{uri: 'https://example.com/your-icon.png'}} // Replace with your icon URL
        />
        <Text style={styles.toastText}>{message}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'relative',
    top: 50, // Position the toast at the top of the screen
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    zIndex: 1000, // Ensure the toast is above other components
    elevation: 5, // For Android shadow
  },
  toastContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  toastText: {
    color: 'white',
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default CustomToast;
