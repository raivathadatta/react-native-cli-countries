import {createSlice} from '@reduxjs/toolkit';
import React from 'react';
const initialState = {
  countries: [],
  selectedCountry: {},
  filterData: [],
  practiceTitle: 'hello',
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setSelectedCounter: (state, action) => {
      state.selectedCountry = getCountryDetails(state, action.payload);
    },
    setSearchCountries: (state, action) => {
      state.filterData = setFilterData(state, action.payload);
    },
    setPracticeName: (state, action) => {
      state.practiceTitle = action.payload;
    },
    setFilterOptions: (state, action) => {
      const {region, minPopulation, maxPopulation, language} = action.payload;
      state.filterData = state.countries.filter(country => {
        const meetsRegion = region ? country.region === region : true;
        const meetsPopulation =
          (!minPopulation || country.population >= minPopulation) &&
          (!maxPopulation || country.population <= maxPopulation);
        const meetsLanguage = language ? country.languages[language] : true;
        return meetsRegion && meetsPopulation && meetsLanguage;
      });
    },
  },
});

export const {
  setCountries,
  setSelectedCounter,
  setSearchCountries,
  setPracticeName,
  setFilterOptions,
} = countrySlice.actions;

const getCountryDetails = (state, countryCCA3) => {
  return state.countries.find(country => country.cca3 === countryCCA3);
};

const setFilterData = (state, value) => {
  console.log(value);
  if (value.length < 1) {
    return state.countries;
  }
  const data = state.countries.filter(country =>
    country.name.common.toLowerCase().includes(value.toLowerCase()),
  );
  console.log(data);
  return data;
};

export default countrySlice.reducer;
