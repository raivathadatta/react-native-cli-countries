// App.js
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {View, Text, Image, StyleSheet} from 'react-native';

const CountryCard = ({
  name,
  population,
  region,
  imageUrl,
  onPress,
  cardKey,
}) => (
  <TouchableOpacity onPress={onPress} key={cardKey}>
    <View style={styles.card}>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.population}>Population: {population}</Text>
        <Text style={styles.region}>Region: {region}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3, // Adds a shadow for Android
    shadowColor: '#000', // Adds a shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginLeft: 8,
  },
  image: {
    width: '100%',
    height: 150,
  },
  infoContainer: {
    padding: 16,
    color: '#666',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#666',
  },
  population: {
    fontSize: 14,
    marginBottom: 4,
    color: '#666',
  },
  region: {
    fontSize: 14,
    color: '#666',
  },
});

export default CountryCard;
