// store.js
import {configureStore} from '@reduxjs/toolkit';
import countryReducer from './countrySlice';

const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  reducer: {
    country: countryReducer,
  },
});

export default store;
