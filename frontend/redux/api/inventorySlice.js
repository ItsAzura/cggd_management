import { apiSlice } from './apiSlice';
import { INVENTORY_URL } from '../constants';

export const inventoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Define endpoint for fetching all inventory items
    getAllInventory: builder.query({
      query: ({ page, product_id, quantity, min_quantity, location_id }) => {
        let queryString = `?page=${page}`;

        if (product_id) queryString += `&product_id=${product_id}`;
        if (quantity) queryString += `&quantity=${quantity}`;
        if (min_quantity) queryString += `&min_quantity=${min_quantity}`;
        if (location_id) queryString += `&location_id=${location_id}`;

        return {
          url: `${INVENTORY_URL}${queryString}`,
          method: 'GET',
        };
      },
      providesTags: ['Inventory'],
    }),

    getInventoryProductById: builder.query({
      query: (productId) => ({
        url: `${INVENTORY_URL}/${productId}`,
        method: 'GET',
      }),
      providesTags: ['Inventory'],
    }),

    //Define endpoint for creating a new inventory item
    createInventory: builder.mutation({
      query: (newInventory) => ({
        url: INVENTORY_URL,
        method: 'POST',
        body: newInventory,
      }),
      invalidatesTags: ['Inventory'],
    }),

    //Define endpoint for updating an inventory item
    updateInventory: builder.mutation({
      query: (id, updatedInventory) => ({
        url: `${INVENTORY_URL}/${id}`,
        method: 'PUT',
        body: updatedInventory,
      }),
      invalidatesTags: ['Inventory'],
    }),

    //Define endpoint for deleting an inventory item
    deleteInventory: builder.mutation({
      query: (inventoryId) => ({
        url: `${INVENTORY_URL}/${inventoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Inventory'],
    }),

    //Define endpoint for fetching all inventory items incoming
    getAllInventoryIncoming: builder.query({
      query: ({ page }) => ({
        url: `${INVENTORY_URL}/incoming?page=${page}`,
        method: 'GET',
      }),
      providesTags: ['Inventory'],
    }),

    //Define endpoint for creating new incoming inventory items
    createInventoryIncoming: builder.mutation({
      query: (newIncoming) => ({
        url: `${INVENTORY_URL}/incoming`,
        method: 'POST',
        body: newIncoming,
      }),
      invalidatesTags: ['Inventory'],
    }),

    //Define endpoint for fetching all inventory items export
    getAllInventoryExport: builder.query({
      query: ({ page }) => ({
        url: `${INVENTORY_URL}/export?page=${page}`,
        method: 'GET',
      }),
      providesTags: ['Inventory'],
    }),

    //Define endpoint for creating new export inventory items
    createInventoryExport: builder.mutation({
      query: (newExport) => ({
        url: `${INVENTORY_URL}/export`,
        method: 'POST',
        body: newExport,
      }),
      invalidatesTags: ['Inventory'],
    }),

    //Define endpoint for updating inventory log
    updateInventoryLog: builder.mutation({
      query: (id, log) => ({
        url: `${INVENTORY_URL}/log_update/${id}`,
        method: 'PUT',
        body: log,
      }),
      invalidatesTags: ['Inventory'],
    }),

    //Define endpoint for deleting inventory log
    deleteInventoryLog: builder.mutation({
      query: (id) => ({
        url: `${INVENTORY_URL}/log_delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Inventory'],
    }),

    //Define endpoint for accepting incoming inventory
    acceptIncomingInventory: builder.mutation({
      query: (id) => ({
        url: `${INVENTORY_URL}/accept_incoming/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Inventory'],
    }),

    //Define endpoint for accepting export inventory
    acceptExportInventory: builder.mutation({
      query: (id) => ({
        url: `${INVENTORY_URL}/accept_export/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Inventory'],
    }),

    //Define endpoint for fetching history of incoming inventory
    getHistoryIncomingInventory: builder.query({
      query: () => ({
        url: `${INVENTORY_URL}/history_incoming`,
        method: 'GET',
      }),
      providesTags: ['Inventory'],
    }),

    //Define endpoint for fetching history of export inventory
    getHistoryExportInventory: builder.query({
      query: () => ({
        url: `${INVENTORY_URL}/history_export`,
        method: 'GET',
      }),
      providesTags: ['Inventory'],
    }),
  }),
});

export const {
  useGetAllInventoryQuery,
  useGetInventoryProductByIdQuery,
  useCreateInventoryMutation,
  useUpdateInventoryMutation,
  useDeleteInventoryMutation,
  useGetAllInventoryIncomingQuery,
  useCreateInventoryIncomingMutation,
  useGetAllInventoryExportQuery,
  useCreateInventoryExportMutation,
  useUpdateInventoryLogMutation,
  useDeleteInventoryLogMutation,
  useAcceptIncomingInventoryMutation,
  useAcceptExportInventoryMutation,
  useGetHistoryIncomingInventoryQuery,
  useGetHistoryExportInventoryQuery,
} = inventoryApiSlice;
