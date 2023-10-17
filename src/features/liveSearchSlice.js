// src/features/liveSearchSlice.js
import { createSlice } from "@reduxjs/toolkit";
import DataDummy from "../Data/DataDummy";

const initialState = {
  product: DataDummy,
  searchTerm: "", 
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { updateSearchTerm } = productSlice.actions;
export default productSlice.reducer;
