// src/features/liveSearchSlice.js
import { createSlice } from "@reduxjs/toolkit";
import DataDummy from "../Data/DataDummy";

const initialState = {
  product: DataDummy,
};

const productSlice = createSlice({
  name: "product",
  initialState,
});

export default productSlice.reducer;
