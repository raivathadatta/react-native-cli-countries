import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import ActionSheet from 'react-native-actions-sheet';
import Geolocation from 'react-native-geolocation-service';
import {fetchAddress} from '../data/api/getApiCalls';
import InputGroup from './components/InputGroup'; // Import InputGroup // Import useInputGroup
import {Formik} from 'formik';
import * as Yup from 'yup';

const ProfileScreen = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const actionSheetRef = useRef(null);

  useEffect(() => {
    const currentUser = auth().currentUser;
    setUser(currentUser);
    if (currentUser && currentUser.photoURL) {
      setProfileImage(currentUser.photoURL);
    }
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    let permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const result = await check(permission);

    if (result === RESULTS.GRANTED) {
      getCurrentLocation();
    } else {
      const requestResult = await request(permission);
      if (requestResult === RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        Alert.alert('Location permission denied');
      }
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
        fetchLocation(position.coords.latitude, position.coords.longitude);
      },
      error => {
        console.log(error.code, error.message);
        Alert.alert(error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const fetchLocation = async (latitude, longitude) => {
    try {
      const response = await fetchAddress(latitude, longitude);
      const formattedAddress = response.display_name;
      setAddress(formattedAddress);
    } catch (error) {
      console.error(error);
      Alert.alert('Error fetching address');
    }
  };

  const handleSignOut = async () => {
    try {
      await auth().signOut();
      navigation.reset({
        index: 0,
        routes: [{name: 'Loading'}],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleImagePicker = type => {
    if (type === 'camera') {
      launchCamera({mediaType: 'photo'}, handleImageResponse);
      closeActionSheet();
    } else {
      launchImageLibrary({mediaType: 'photo'}, handleImageResponse);
    }
  };

  const handleImageResponse = response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorMessage) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else {
      const source = {uri: response.assets[0].uri};
      setProfileImage(source.uri);
    }
  };

  const openActionSheet = () => {
    actionSheetRef.current?.setModalVisible(true);
  };

  const closeActionSheet = () => {
    actionSheetRef.current?.setModalVisible(false);
  };

  // Define validation schema for Formik
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    dob: Yup.date().required('Date of Birth is required'),
    images: Yup.mixed().required('Images are required'),
    sex: Yup.string().required('Sex is required'),
    address: Yup.string().required('Address is required'),
    fatherName: Yup.string().required('Father name is required'),
    idCard: Yup.string().required('ID Card is required'),
    bloodGroup: Yup.string().required('Blood group is required'),
    nationality: Yup.string().required('Nationality is required'),
  });

  const initialValues = {
    phone: '',
    dob: '',
    images: '',
    sex: '',
    address: '',
    fatherName: '',
    idCard: '',
    bloodGroup: '',
    nationality: '',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>{address || 'Fetching address...'}</Text>
      <TouchableOpacity onPress={openActionSheet}>
        {profileImage ? (
          <Image source={{uri: profileImage}} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Add Image</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.name}>{user ? user.displayName : 'Guest'}</Text>
      <Text style={styles.location}>
        Location:{' '}
        {location
          ? `${location.coords.latitude}, ${location.coords.longitude}`
          : 'Unknown'}
      </Text>
      <Button title="Sign Out" onPress={handleSignOut} />

      <ActionSheet ref={actionSheetRef}>
        <View style={styles.actionSheetContent}>
          <Button title="Camera" onPress={() => handleImagePicker('camera')} />
          <Button
            title="Gallery"
            onPress={() => handleImagePicker('gallery')}
          />
          <Button title="Cancel" onPress={closeActionSheet} />
        </View>
      </ActionSheet>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View style={{flex: 1, width: '100%'}}>
            <InputGroup
              label="Phone Number"
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              error={touched.phone && errors.phone}
              keyboardType="numeric"
            />
            <InputGroup
              label="Date of Birth"
              value={values.dob}
              onChangeText={handleChange('dob')}
              onBlur={handleBlur('dob')}
              error={touched.dob && errors.dob}
              placeholder="YYYY-MM-DD"
            />
            <InputGroup
              label="Sex"
              value={values.sex}
              onChangeText={handleChange('sex')}
              onBlur={handleBlur('sex')}
              error={touched.sex && errors.sex}
              placeholder="Male/Female/Other"
            />
            <InputGroup
              label="Address"
              value={values.address}
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              error={touched.address && errors.address}
            />
            <InputGroup
              label="Father Name"
              value={values.fatherName}
              onChangeText={handleChange('fatherName')}
              onBlur={handleBlur('fatherName')}
              error={touched.fatherName && errors.fatherName}
            />
            <InputGroup
              label="ID Card"
              value={values.idCard}
              onChangeText={handleChange('idCard')}
              onBlur={handleBlur('idCard')}
              error={touched.idCard && errors.idCard}
            />
            <InputGroup
              label="Blood Group"
              value={values.bloodGroup}
              onChangeText={handleChange('bloodGroup')}
              onBlur={handleBlur('bloodGroup')}
              error={touched.bloodGroup && errors.bloodGroup}
            />
            <InputGroup
              label="Nationality"
              value={values.nationality}
              onChangeText={handleChange('nationality')}
              onBlur={handleBlur('nationality')}
              error={touched.nationality && errors.nationality}
            />
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 100, // Added padding bottom
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    color: '#ffffff',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  location: {
    fontSize: 16,
    marginBottom: 20,
    color: 'black',
  },
  actionSheetContent: {
    padding: 20,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});

export default ProfileScreen;
