// src/features/myFeatureSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  page: number;
};

const initialState: InitialState = {
  page: 1,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    nextPage: (state) => {
      state.page += 1;
    },
    prevPage: (state) => {
      state.page -= 1;
    },
  },
});

export const paginationActions = paginationSlice.actions;

export default paginationSlice;
