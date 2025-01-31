import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
});

const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Product", "Order", "Category"],
  endpoints: () => ({}),
});

export default apiSlice;
