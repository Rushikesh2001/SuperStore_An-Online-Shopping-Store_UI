import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import { appReducer } from "../reducers/reducer";

export const appStore = configureStore({
  reducer: {
    appReducer,
  },
  middleware: () => [logger],
});
