import { apiSlice } from './apiSlice';
import { REPORTS_URL } from '../constants';

export const reportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Define the endpoint for fetching all reports
    getAllReports: builder.query({
      query: ({ page }) => ({
        url: `${REPORTS_URL}?page=${page}`,
        method: 'GET',
      }),
      providesTags: ['Reports'],
    }),

    // Define the endpoint for fetching a single report
    getReport: builder.query({
      query: (reportId) => ({
        url: `${REPORTS_URL}/${reportId}`,
        method: 'GET',
      }),
      providesTags: ['Reports'],
    }),

    // Define the endpoint for creating a new report
    createReport: builder.mutation({
      query: (newReport) => ({
        url: REPORTS_URL,
        method: 'POST',
        body: newReport,
      }),
      invalidatesTags: ['Reports'],
    }),

    // Define the endpoint for updating a report
    updateReport: builder.mutation({
      query: (id, updatedReport) => ({
        url: `${REPORTS_URL}/${id}`,
        method: 'PUT',
        body: updatedReport,
      }),
      invalidatesTags: ['Reports'],
    }),

    // Define the endpoint for deleting a report
    deleteReport: builder.mutation({
      query: (reportId) => ({
        url: `${REPORTS_URL}/${reportId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Reports'],
    }),
  }),
});

export const {
  useGetAllReportsQuery,
  useGetReportQuery,
  useCreateReportMutation,
  useUpdateReportMutation,
  useDeleteReportMutation,
} = reportApiSlice;
