import apiSlice from "../apiSlice";
import { USERS } from "../../constants";

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // To Get All Users => http://localhost:4000/api/users
    getUsers: builder.query({
      query: () => `${USERS}`,
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),

    // To Get Specific User => http://localhost:4000/api/users/:userId
    getUserById: builder.query({
      query: (userId) => ({
        url: `${USERS}/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // To Update Specific user => http://localhost:4000/api/users/:userId
    updateUser: builder.mutation({
      query: (userData) => ({
        url: `${USERS}/${userData._id}`,
        method: "PUT",
        body: userData,
      }),
    }),

    // To Delete User => http://localhost:4000/api/users/:userId
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS}/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;
