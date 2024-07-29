import React from 'react';
import {Text, Image, StyleSheet, ScrollView} from 'react-native';
import CustomButton from './components/buttons/CustomAppButton';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedCounter} from '../data/appredux/countrySlice';

const DetailsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.country.selectedCountry);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{uri: data.flags.png}} style={styles.image} />
      <Text style={styles.name}>{data.name.common}</Text>
      <Text style={styles.population}>Population: {data.population}</Text>
      <Text style={styles.region}>Region: {data.region}</Text>
      <Text style={styles.languagesTitle}>Languages:</Text>
      {Object.keys(data.languages).map((language, index) => (
        <Text key={`${index}aaa`} style={styles.language}>
          {language}
        </Text>
      ))}
      <Text style={styles.neighborsTitle}>Neighboring Countries:</Text>
      {data.borders &&
        data.borders.map((item, index) => (
          <CustomButton
            key={`${index}lllabc`}
            style={styles.neighbor}
            title={item}
            onPress={() => {
              console.log(item);
              dispatch(setSelectedCounter(item));
              navigation.replace('detail');
            }}
          />
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  population: {
    fontSize: 18,
    marginBottom: 4,
    textAlign: 'center',
  },
  region: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  languagesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  language: {
    fontSize: 16,
    textAlign: 'center',
  },
  neighborsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  neighbor: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DetailsScreen;
