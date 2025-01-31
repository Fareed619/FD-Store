import apiSlice from "../apiSlice";

import { PRODUCTS_URL } from "../../constants";
const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Products http://localhost:4000/api/products/allproducts
    getAllProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/allproducts`,
      }),
    }),

    // To Get Products ( 6 )   => http://localhost:4000/api/products
    getProducts: builder.query({
      query: ({ keyword }) => ({
        url: `${PRODUCTS_URL}`,
        params: { keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),

    // Get product by id  => http://localhost:4000/api/products/:productId
    getProductById: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      providesTags: (result, error, productId) => [
        { type: "Product", id: productId },
      ],
    }),

    // Add Product  => http://localhost:4000/api/products
    addProduct: builder.mutation({
      query: (productDetailes) => ({
        url: `${PRODUCTS_URL}`,
        method: "POST",
        body: productDetailes,
      }),
      invalidatesTags: ["Product"],
    }),

    // Update product => http://localhost:4000/api/products/:productId
    updateProduct: builder.mutation({
      query: ({ formData, productId }) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "PUT",
        body: formData,
      }),
    }),

    // Delete Product  => http://localhost:4000/api/products/:productId
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
      providesTags: ["Product"],
    }),

    // Add reviews to the product  => http://localhost:4000/api/products/:productId/reviews
    addReview: builder.mutation({
      query: ({ productReview, productId }) => ({
        url: `${PRODUCTS_URL}/${productId}/reviews`,
        method: "POST",
        body: productReview,
      }),
    }),

    // Get Top Products  => http://localhost:4000/api/products/top/products
    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top/products`,
      }),
      keepUnusedDataFor: 5,
    }),

    // Get New Products  => http://localhost:4000/api/products/new/products
    getNewProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/new/products`,
      }),
      keepUnusedDataFor: 5,
    }),

    // Upload Product Image => http://localhost:4000/api/uploads
    uploadImage: builder.mutation({
      query: (data) => ({
        url: `/api/uploads`,
        method: "POST",
        body: data,
      }),
    }),

    // Filter Porudcts   =>  http://localhost:4000/api/products/filter/filterd-products
    getFilterdProuducts: builder.query({
      query: ({ checked, radio }) => ({
        url: `${PRODUCTS_URL}/filter/filterd-products`,
        method: "POST",
        body: { checked, radio },
      }),
    }),

    
    
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetNewProductsQuery,
  useGetTopProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useUploadImageMutation,
  useAddReviewMutation,
  useDeleteProductMutation,
  useGetFilterdProuductsQuery
} = productsApiSlice;
