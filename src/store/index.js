import { configureStore } from "@reduxjs/toolkit";

import articlesReducer from "./articles-slice";
import userReducer from "./user-slice";

export default configureStore({
  reducer: {
    articles: articlesReducer,
    regUser: userReducer,
  },
});
