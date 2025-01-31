import { CATEGORIES } from "../../constants";
import apiSlice from "../apiSlice";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Categories  =>> http://localhost:4000/api/category/categories
    getAllCategories: builder.query({
      query: () => ({
        url: `${CATEGORIES}/categories`,
      }),
    }),

    // Get Category    =>> http://localhost:4000/api/category/:categoryId
    getCategory: builder.query({
      query: ({ categoryId }) => ({
        url: `${CATEGORIES}/${categoryId}`,
      }),
    }),

    // Add Category  => http://localhost:4000/api/category
    createCategory: builder.mutation({
      query: ({ categoryName }) => ({
        url: `${CATEGORIES}`,
        method: "POST",
        body: { name: categoryName },
      }),
    }),

    // Update Category   =>> http://localhost:4000/api/category/:categoryId
    updateCategory: builder.mutation({
      query: ({ categoryName, categoryId }) => ({
        url: `${CATEGORIES}/${categoryId}`,
        method: "PUT",
        body: { name: categoryName },
      }),
    }),

    // Delete Category  =>> http://localhost:4000/api/category/:categoryId
    deleteCategory: builder.mutation({
      query: ({ categoryId }) => ({
        url: `${CATEGORIES}/${categoryId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApiSlice;
