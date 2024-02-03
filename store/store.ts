import { configureStore } from "@reduxjs/toolkit";
import paginationSlice from "./slices/paginationSlice";
const store = configureStore({
  reducer: {
    pagination: paginationSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
