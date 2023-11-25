import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  endpoints: (builder) => ({
    allPost: builder.query({
      query: () => ({
        url: "post/posts",
        method: "get",
      }),
    }),
  }),
});
export const { useAllPostQuery } = postApi;
