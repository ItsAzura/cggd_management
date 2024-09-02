import { apiSlice } from './apiSlice';
import { SUPPLIERS_URL } from '../constants';

export const supplierApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Define the endpoint for fetching all suppliers
    getAllSuppliers: builder.query({
      query: ({ page }) => ({
        url: `${SUPPLIERS_URL}?page=${page}`,
        method: 'GET',
      }),
      providesTags: ['Suppliers'],
    }),

    // Define the endpoint for creating a new supplier
    createSupplier: builder.mutation({
      query: (newSupplier) => ({
        url: SUPPLIERS_URL,
        method: 'POST',
        body: newSupplier,
      }),
      invalidatesTags: ['Suppliers'],
    }),

    // Define the endpoint for updating a supplier
    updateSupplier: builder.mutation({
      query: (id, updatedSupplier) => ({
        url: `${SUPPLIERS_URL}/${id}`,
        method: 'PUT',
        body: updatedSupplier,
      }),
      invalidatesTags: ['Suppliers'],
    }),

    // Define the endpoint for deleting a supplier
    deleteSupplier: builder.mutation({
      query: (supplierId) => ({
        url: `${SUPPLIERS_URL}/${supplierId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Suppliers'],
    }),
  }),
});

export const {
  useGetAllSuppliersQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} = supplierApiSlice;
