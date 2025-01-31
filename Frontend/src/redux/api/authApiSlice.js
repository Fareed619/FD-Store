import apiSlice from "./apiSlice";
import { AUTH } from "../constants";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Register => http://localhost:4000/api/users/register
    register: builder.mutation({
      query: (formData) => ({
        url: `${AUTH}/register`,
        method: "POST",
        body: formData,
      }),
    }),

    // Login  => http://localhost:4000/api/users/login
    login: builder.mutation({
      query: (formData) => ({
        url: `${AUTH}/login`,
        method: "POST",
        body: formData,
      }),
    }),

    // Logout  => http://localhost:4000/api/users/logout
    logoutApi: builder.mutation({
      query: () => ({
        url: `${AUTH}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutApiMutation } =
  authApiSlice;
