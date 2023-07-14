import { apiSlice } from './apiSlice';
import { COLOURSETS_URL } from '../constants';

export const colorSetsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getColorSets: builder.query({
      query: () => COLOURSETS_URL,
    }),    
    getColorSet: builder.query({
      query: (id) => `${COLOURSETS_URL}/${id}`,
    }),
    createColorSet: builder.mutation({
      query: (newColorSet) => ({
        url: `${COLOURSETS_URL}/`,
        method: 'POST',
        body: newColorSet,
      }),
      invalidates: ['getColorSets'],
    }),
    updateColorSet: builder.mutation({
      query: ({ id, ...updatedColorSet }) => ({
        url: `${COLOURSETS_URL}/${id}`,
        method: 'PUT',
        body: updatedColorSet,
      }),
      invalidates: ['getColorSets'],
    }),
    deleteColorSet: builder.mutation({
      query: (id) => ({
        url: `${COLOURSETS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidates: ['getColorSets'],
    }),
  }),
});

export const {
  useGetColorSetsQuery,
  useGetColorSetQuery,
  useCreateColorSetMutation,
  useUpdateColorSetMutation,
  useDeleteColorSetMutation,
} = colorSetsApiSlice;
