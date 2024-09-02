import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../constants';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Define endpoint for fetching all orders
    getAllOrders: builder.query({
      query: ({ page }) => ({
        url: `${ORDERS_URL}?page=${page}`,
        method: 'GET',
      }),
      providesTags: ['Orders'],
    }),

    //Define endpoint for creating a new order
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: newOrder,
      }),
      invalidatesTags: ['Orders'],
    }),

    //Define endpoint for updating an order
    updateOrder: builder.mutation({
      query: (id, updatedOrder) => ({
        url: `${ORDERS_URL}/${id}`,
        method: 'PUT',
        body: updatedOrder,
      }),
      invalidatesTags: ['Orders'],
    }),

    //Define endpoint for deleting an order
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Orders'],
    }),

    //Define endpoint for fetching total amount of orders
    getTotalAmount: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/total_amount`,
        method: 'GET',
      }),
      providesTags: ['Orders'],
    }),

    //Define endpoint for fetching count of orders
    getCountOrder: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/count_order`,
        method: 'GET',
      }),
      providesTags: ['Orders'],
    }),

    //Define endpoint for fetching total amount of orders every month
    getTotalAmountEveryMonth: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/total_amount_every_month`,
        method: 'GET',
      }),
      providesTags: ['Orders'],
    }),

    //Define endpoint for fetching count of orders by category
    getCountCategory: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/count_category`,
        method: 'GET',
      }),
      providesTags: ['Orders'],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetTotalAmountQuery,
  useGetCountOrderQuery,
  useGetTotalAmountEveryMonthQuery,
  useGetCountCategoryQuery,
} = orderApiSlice;
