import { apiSlice } from './apiSlice';
import { PRODUCTS_URL } from '../constants';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Define the endpoint for fetching all products
    getAllProducts: builder.query({
      query: ({
        page,
        name,
        color_id,
        price_min,
        price_max,
        size_id,
        category_id,
        supplier_id,
      }) => {
        // Tạo query parameters cho URL
        let queryString = `?page=${page}`;

        if (name) queryString += `&name=${name}`;
        if (color_id) queryString += `&color_id=${color_id}`;
        if (price_min) queryString += `&price_min=${price_min}`;
        if (price_max) queryString += `&price_max=${price_max}`;
        if (size_id) queryString += `&size_id=${size_id}`;
        if (category_id) queryString += `&category_id=${category_id}`;
        if (supplier_id) queryString += `&supplier_id=${supplier_id}`;

        return {
          url: `${PRODUCTS_URL}${queryString}`,
          method: 'GET',
        };
      },
      providesTags: ['Products'],
    }),

    getProductById: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'GET',
      }),
    }),

    // Define the endpoint for creating a new product
    createProduct: builder.mutation({
      query: (data) => ({
        url: PRODUCTS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),

    // Define the endpoint for updating a product
    updateProduct: builder.mutation({
      query: ({ id, updatedProduct }) => ({
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
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCountProductQuery,
  useGetTopOrderProductQuery,
} = productApiSlice;
