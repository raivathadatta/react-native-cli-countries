import React, {useState} from 'react';
import {Modal, View, Text, Button, TextInput, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {setFilterOptions} from '../../data/appredux/countrySlice';
import {Picker} from '@react-native-picker/picker';
// import {setFilterOptions} from '../data/appredux/countrySlice';

export default function FilterModal({visible, onClose}) {
  const dispatch = useDispatch();
  const [selectedRegion, setSelectedRegion] = useState('');
  const [minPopulation, setMinPopulation] = useState('');
  const [maxPopulation, setMaxPopulation] = useState('');
  const [language, setLanguage] = useState('');

  const handleApplyFilters = () => {
    dispatch(
      setFilterOptions({
        region: selectedRegion,
        minPopulation: parseInt(minPopulation, 10),
        maxPopulation: parseInt(maxPopulation, 10),
        language,
      }),
    );
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.text}>Filter by Region</Text>
          <Picker
            selectedValue={selectedRegion}
            onValueChange={itemValue => setSelectedRegion(itemValue)}>
            <Picker.Item style={styles.text} label="All" value="" />
            <Picker.Item style={styles.text} label="Africa" value="Africa" />
            <Picker.Item style={styles.text} label="Asia" value="Asia" />
          </Picker>

          <Text style={styles.text}>Filter by Population</Text>
          <TextInput
            placeholder="Min Population"
            keyboardType="numeric"
            value={minPopulation}
            onChangeText={setMinPopulation}
            style={styles.input}
          />
          <TextInput
            placeholder="Max Population"
            keyboardType="numeric"
            value={maxPopulation}
            onChangeText={setMaxPopulation}
            style={styles.input}
          />

          <Text style={styles.text}>Filter by Language</Text>
          <TextInput
            placeholder="Language"
            value={language}
            onChangeText={setLanguage}
            style={styles.input}
          />

          <Button title="Apply Filters" onPress={handleApplyFilters} />
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  text: {
    color: 'black',
  },
});
