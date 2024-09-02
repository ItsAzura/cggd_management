import { apiSlice } from './apiSlice';
import { PRODUCTS_URL } from '../constants';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Define the endpoint for fetching all products
    getAllProducts: builder.query({
      query: ({ page }) => ({
        url: `${PRODUCTS_URL}?page=${page}`,
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),

    // Define the endpoint for creating a new product
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: PRODUCTS_URL,
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['Products'],
    }),

    // Define the endpoint for updating a product
    updateProduct: builder.mutation({
      query: (id, updatedProduct) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: 'PUT',
        body: updatedProduct,
      }),
      invalidatesTags: ['Products'],
    }),

    // Define the endpoint for deleting a product
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),

    // Define the endpoint for fetching count of products
    getCountProduct: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/count_product`,
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),

    // Define the endpoint for fetching top order products
    getTopOrderProduct: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top_order_product`,
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCountProductQuery,
  useGetTopOrderProductQuery,
} = productApiSlice;
