import apiSlice from "./apiSlice";
import { PROFILES } from "../constants";

const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get My profile  http://localhost:4000/api/profiles
    getProfile: builder.query({
      query: () => ({
        url: `${PROFILES}`,
      }),
    }),

    // Update My profile ===>>> http://localhost:4000/api/profiles
    updateProfile: builder.mutation({
      query: (infoToUpdate) => ({
        url: `${PROFILES}`,
        method: "PUT",
        body: infoToUpdate,
      }),
      providesTags: ["User"],
    }),

    // Delete My Profile ==> http://localhost:4000/api/profiles
    deleteProfile: builder.mutation({
      query: () => ({
        url: `${PROFILES}`,
        method: "Delete",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = profileApiSlice;
