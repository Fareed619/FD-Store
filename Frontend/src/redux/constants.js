export const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:4000" : "https://fd-store-api.onrender.com";
export const AUTH = "/api/auth";
export const USERS = "/api/users";
export const PROFILES = "/api/profiles";
export const CATEGORIES = "/api/category";
export const PRODUCTS_URL = "/api/products";
export const ORDERS_URL = "/api/orders";
export const STRIPE_URL = "/api/stripe";
