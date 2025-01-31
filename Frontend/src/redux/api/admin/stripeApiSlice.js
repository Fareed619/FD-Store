import { STRIPE_URL } from "../../constants";
import apiSlice from "../apiSlice";

export const stripeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // payBystripe  http://localhost:4000/api/stripe/checkout
    payByStripe: builder.mutation({
      query: (products) => ({
        url: `${STRIPE_URL}/checkout`,
        method: "POST",
        body: products,
      }),
    }),
  }),
});

export const { usePayByStripeMutation } = stripeApiSlice;
