import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApi = createApi({
  reducerPath: "commentApi",
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
    // get product comments
    allProductComments: builder.query({
      query: (productId) => ({
        url: `comment/allcomments/${productId}`,
        method: "get",
      }),
    }),
    // add comments
    addComment: builder.mutation({
      query: (body) => ({
        url: `comment/create`,
        method: "post",
        body,
      }),
    }),
    // delete comments
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `comment/delete/${id}`,
        method: "delete",
      }),
    }),
    // update Comments
    updateComment: builder.mutation({
      query: (id, body) => ({
        url: `comment/update/${id}`,
        method: "put",
        body,
      }),
    }),
  }),
});
export const {
  useAllProductCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentApi;
