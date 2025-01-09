import { combineReducers } from "@reduxjs/toolkit";
import shareSlice from "./shareSlice";

export const rootReducer = combineReducers({
  share: shareSlice,
});
