import { apiSlice } from './apiSlice';
import { SELECTORS_URL } from '../constants';

// Helper function to create query objects
const createQuery = (path) => ({
  query: () => ({
    url: `${SELECTORS_URL}/${path}`,
    method: 'GET',
  }),
  providesTags: ['Selectors'],
});

export const selectorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the endpoints using the helper function
    getAllColors: builder.query(createQuery('colors')),
    getAllSizes: builder.query(createQuery('sizes')),
    getAllCategories: builder.query(createQuery('categories')),
    getAllLocations: builder.query(createQuery('locations')),
  }),
});

export const {
  useGetAllColorsQuery,
  useGetAllSizesQuery,
  useGetAllCategoriesQuery,
  useGetAllLocationsQuery,
} = selectorApiSlice;
