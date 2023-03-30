import { configureStore } from "@reduxjs/toolkit";

// import buttonReducer from './button-slice';
// import checkboxReducer from './checkbox-slice';
import articlesReducer from "./articles-slice";
import userReducer from "./user-slice";

export default configureStore({
  reducer: {
    articles: articlesReducer,
    regUser: userReducer,
  },
});
