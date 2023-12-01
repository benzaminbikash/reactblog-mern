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
        keepUnusedDataFor: 0,
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
    // update post
    updatePost: builder.mutation({
      query: (id, body) => ({
        url: `post/update/${id}`,
        method: "put",
        body,
      }),
    }),
  }),
});
export const {
  useAllPostQuery,
  useMyPostQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postApi;
