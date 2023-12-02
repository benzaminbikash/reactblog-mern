import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./tokenSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./Api/UserApi";
import { postApi } from "./Api/PostApi";
import { commentApi } from "./Api/CommentApi";

export const store = configureStore({
  reducer: {
    token: tokenSlice,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      postApi.middleware,
      commentApi.middleware
    ),
});

setupListeners(store.dispatch);
