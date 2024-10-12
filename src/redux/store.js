// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/liveSearchSlice';
import chatNotifReducer from '../features/chatNotifSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    chatNotif: chatNotifReducer,
  }
});

export default store;
