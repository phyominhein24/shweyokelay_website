// import { applyMiddleware } from "@reduxjs/toolkit";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { createStore } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./RootReducer";

// const thunkMiddleware = require("redux-thunk").default;

// const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

// export const store = createStore(rootReducer);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
