import { configureStore } from "@reduxjs/toolkit";
import rootred from "../reducers/main";

const store = configureStore({
  reducer : rootred,
  devTools: false,
});

export default store;
