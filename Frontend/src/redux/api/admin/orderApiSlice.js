import apiSlice from "../apiSlice";
import { ORDERS_URL } from "../../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create Order  http://localhost:4000/api/orders
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
      }),
    }),

    // Get Order Details   => http://localhost:4000/api/orders/:id
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
    }),

    //  Pay Order  => http://localhost:4000/api/orders/:id/pay
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: details,
      }),
    }),

    /// Get  My  order => http://localhost:4000/api/orders/mine
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),

    // get All the orders =>  http://localhost:4000/api/orders
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
    }),

    // Deliver Order   ==> http://localhost:4000/api/orders/:id/deliver
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),

    // Get Total Orders   http://localhost:4000/api/orders/total-orders
    getTotalOrders: builder.query({
      query: () => `${ORDERS_URL}/total-orders`,
    }),

    // Get Total Sales   http://localhost:4000/api/orders/total-sales
    getTotalSales: builder.query({
      query: () => `${ORDERS_URL}/total-sales`,
    }),

    // Get Total Sales By Date   http://localhost:4000/api/orders/total-sales-by-date
    getTotalSalesByDate: builder.query({
      query: () => `${ORDERS_URL}/total-sales-by-date`,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
  useGetOrdersQuery,
  usePayOrderMutation
} = orderApiSlice;
