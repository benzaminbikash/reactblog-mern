import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().token.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    allPost: builder.query({
      query: () => ({
        url: "post/posts",
        method: "get",
      }),
    }),
    myPost: builder.query({
      query: () => ({
        url: "post/mypost",
        method: "get",
      }),
    }),
    // create post
    createPost: builder.mutation({
      query: (body) => ({
        url: "post/create",
        method: "post",
        body,
      }),
    }),
    // delete post:
    deletePost: builder.mutation({
      query: (id) => ({
        url: `post/delete/${id}`,
        method: "delete",
      }),
    }),
  }),
});
export const {
  useAllPostQuery,
  useMyPostQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postApi;
