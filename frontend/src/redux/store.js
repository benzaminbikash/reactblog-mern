import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./tokenSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./Api/UserApi";
import { postApi } from "./Api/PostApi";

export const store = configureStore({
  reducer: {
    token: tokenSlice,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, postApi.middleware),
});

setupListeners(store.dispatch);
