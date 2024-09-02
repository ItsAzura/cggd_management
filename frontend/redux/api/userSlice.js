import { apiSlice } from './apiSlice';
import { USERS_URL } from '../constants';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the endpoint for fetching all users
    getAllUsers: builder.query({
      query: ({ page }) => ({
        url: `${USERS_URL}?page=${page}`,
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),

    // Define the endpoint for creating a new user
    createUser: builder.mutation({
      query: (newUser) => ({
        url: USERS_URL,
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['Users'],
    }),

    // Define the endpoint for logging in a user
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Users'],
    }),

    // Define the endpoint for logging out a user
    logoutUser: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
      invalidatesTags: ['Users'],
    }),

    // Define the endpoint for fetching a user's profile
    getUserProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),

    // Define the endpoint for updating a user's profile
    updateUserProfile: builder.mutation({
      query: (updatedProfile) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: updatedProfile,
      }),
      invalidatesTags: ['Users'],
    }),

    // Define the endpoint for fetching a user by ID
    getUserById: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),

    // Define the endpoint for updating a user
    updateUser: builder.mutation({
      query: ({ id, updatedUser }) => ({
        url: `${USERS_URL}/${id}`,
        method: 'PUT',
        body: updatedUser,
      }),
      invalidatesTags: ['Users'],
    }),

    // Define the endpoint for deleting a user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
