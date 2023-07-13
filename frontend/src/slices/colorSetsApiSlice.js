import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const colorSetsApi = createApi({
  reducerPath: 'colorSetsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getColorSets: builder.query({
      query: () => '/colorsets',
    }),
    getColorSet: builder.query({
      query: (id) => `/colorsets/${id}`,
    }),
    createColorSet: builder.mutation({
      query: (newColorSet) => ({
        url: '/colorsets',
        method: 'POST',
        body: newColorSet,
      }),
    }),
    updateColorSet: builder.mutation({
      query: ({ id, ...updatedColorSet }) => ({
        url: `/colorsets/${id}`,
        method: 'PUT',
        body: updatedColorSet,
      }),
    }),
    deleteColorSet: builder.mutation({
      query: (id) => ({
        url: `/colorsets/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetColorSetsQuery,
  useGetColorSetQuery,
  useCreateColorSetMutation,
  useUpdateColorSetMutation,
  useDeleteColorSetMutation,
} = colorSetsApi.endpoints;
