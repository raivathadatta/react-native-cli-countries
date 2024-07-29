import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  setSearchCountries,
  setSelectedCounter,
  setPracticeName,
} from '../data/appredux/countrySlice';
import AppInputTextFelid from './components/AppInputTextFelids';
import TextButton from './components/buttons/TextButton';
import CustomToast from './components/toast/CustomToast';
import ScrollNavigation from './components/ScrollNavigation';
// import FilterModal from './components/FilterModal'; // Import the new FilterModal component
import {getFcmToken, requestUserPermission} from '../../firebaseConfig';
import CountryCard from './components/Card/CounterCard';
import FilterModal from './components/FilterModel';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const data = useSelector(state => state.country.countries);
  let filteredData = useSelector(state => state.country.filterData);
  filteredData = filteredData.length < 1 ? data : filteredData;

  useEffect(() => {
    requestUserPermission();
    getFcmToken();
  }, []);

  const onSearch = value => {
    setSearchQuery(value);
    dispatch(setSearchCountries(value));
  };

  const onClickText = () => {
    navigation.navigate('webPage');
  };

  const onClick = item => {
    dispatch(setSelectedCounter(item.cca3));
    navigation.navigate('detail');
  };

  const onChane = value => {
    setTitle(value);
    dispatch(setPracticeName(value));
  };

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000); // Hide toast after 3 seconds
  };

  return (
    <>
      <KeyboardAvoidingView style={styles.container}>
        <ScrollNavigation navigation={navigation} />
        <View style={styles.searchContainer}>
          <Button title="Show Toast" onPress={showToast} />
          <CustomToast
            message="All Your Base top"
            visible={toastVisible}
            onClose={() => setToastVisible(false)}
          />
          <AppInputTextFelid
            style={styles.searchInput}
            placeholder="Search countries..."
            value={searchQuery}
            onChangeText={onSearch}
          />
          <AppInputTextFelid
            style={styles.searchInput}
            placeholder="Update title"
            value={title}
            onChangeText={onChane}
          />
          <Button title="Filter" onPress={() => setFilterModalVisible(true)} />
        </View>
        <View style={styles.webButtonContainer}>
          <TextButton title={'WEB'} onPress={onClickText} />
        </View>

        <ScrollView contentContainerStyle={styles.container}>
          <ScrollViewHorizontally
            filteredData={filteredData}
            showToast={showToast}
          />
          {filteredData.length < 1 ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : (
            filteredData.map((country, index) => (
              <CountryCard
                key={index}
                cardKey={`${index}acvd`}
                imageUrl={country.flags.png}
                name={country.name.common}
                population={country.population}
                region={country.region}
                onPress={() => onClick(country)}
              />
            ))
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 4,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: 'black',
  },
  webButtonContainer: {
    width: '100%',
    height: 50,
    paddingLeft: '40%',
  },
  loadingText: {
    color: 'red',
    textAlign: 'center',
  },
});

function ScrollViewHorizontally({filteredData, showToast}) {
  const [visibleData, setVisibleData] = useState(filteredData.slice(0, 6));
  const scrollViewRef = useRef(null);

  const handleScroll = () => {
    const newEndIndex = visibleData.length + 6;
    const newVisibleData = filteredData.slice(0, newEndIndex);
    setVisibleData(newVisibleData);
  };

  const handleScrollEnd = event => {
    if (visibleData.length === filteredData.length) {
      showToast();
    }
    const newEndPoint = visibleData.length + 6;
    setVisibleData(filteredData.slice(0, newEndPoint));
  };

  return (
    <View style={style.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        nestedScrollEnabled={true}
        onScroll={handleScroll}
        onScrollEndDrag={handleScrollEnd}
        scrollEventThrottle={1}>
        {visibleData.length < 1 ? (
          <Text style={style.loadingText}>Loading...</Text>
        ) : (
          visibleData.map((country, index) => (
            <CountryCard
              key={index}
              cardKey={`${index}acvd`}
              imageUrl={country.flags.png}
              name={country.name.common}
              population={country.population}
              region={country.region}
              onPress={() => {}}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    // height: 150,
  },
  card: {
    width: 100,
    margin: 6,
  },
  image: {
    width: 100,
    height: 150,
  },
  text: {
    color: 'red',
  },
  loadingText: {
    color: 'red',
    textAlign: 'center',
  },
});
