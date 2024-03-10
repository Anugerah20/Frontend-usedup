// src/features/liveSearchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [], 
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

export const { updateSearchTerm, updateProductData } = productSlice.actions;
export default productSlice.reducer;
