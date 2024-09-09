import { apiSlice } from './apiSlice';
import { CUSTOMERS_URL } from '../constants';

export const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the endpoint for fetching all customers
    getAllCustomers: builder.query({
      query: ({ page, customer_name, email, phone, address }) => {
        let queryString = `?page=${page}`;

        if (customer_name) queryString += `&customer_name=${customer_name}`;
        if (email) queryString += `&email=${email}`;
        if (phone) queryString += `&phone=${phone}`;
        if (address) queryString += `&address=${address}`;

        return {
          url: `${CUSTOMERS_URL}${queryString}`,
          method: 'GET',
        };
      },
      providesTags: ['Customers'],
    }),

    // Define the endpoint for getting Count of customers
    getCountCustomers: builder.query({
      query: () => ({
        url: `${CUSTOMERS_URL}/count_customer`,
        method: 'GET',
      }),
      providesTags: ['Customers'],
    }),

    // Define the endpoint for getting customers by address
    getCustomersByAddress: builder.query({
      query: () => ({
        url: `${CUSTOMERS_URL}/customer_by_address`,
        method: 'GET',
      }),
      providesTags: ['Customers'],
    }),

    // Define the endpoint for creating a new customer
    createCustomer: builder.mutation({
      query: (newCustomer) => ({
        url: CUSTOMERS_URL,
        method: 'POST',
        body: newCustomer,
      }),
      invalidatesTags: ['Customers'],
    }),

    // Define the endpoint for updating a customer
    updateCustomer: builder.mutation({
      query: ({ id, updatedCustomer }) => ({
        url: `${CUSTOMERS_URL}/${id}`,
        method: 'PUT',
        body: updatedCustomer,
      }),
      invalidatesTags: ['Customers'],
    }),

    // Define the endpoint for deleting a customer
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `${CUSTOMERS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Customers'],
    }),
  }),
});

export const {
  useGetAllCustomersQuery,
  useGetCountCustomersQuery,
  useGetCustomersByAddressQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApiSlice;
