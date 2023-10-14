// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/liveSearchSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
  }
});

export default store;
