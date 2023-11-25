import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (body) => ({
        url: "user/signup",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "user/login",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
    }),
    myData: builder.query({
      query: (token) => ({
        url: "user/mydata",
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
    }),
  }),
});
export const { useRegistrationMutation, useLoginMutation, useMyDataQuery } =
  userApi;
