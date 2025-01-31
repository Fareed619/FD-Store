import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import App from "./App.jsx";
import Login from "./pages/Auth/Login/Login.jsx";
import Register from "./pages/Auth/Register/Register.jsx";
import Users from "./pages/Admin/users/Users.jsx";
import PrivateRoutes from "./pages/Admin/PrivateRoutes.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Categories from "./pages/Admin/categories/Categories.jsx";
import Products from "./pages/Admin/products/Products.jsx";
import CreateProduct from "./pages/Admin/products/CreateProduct.jsx";
import UpdateProduct from "./pages/Admin/products/UpdateProduct.jsx";
import Home from "./pages/Home/Home.jsx";
import FavoritePage from "./pages/Favorite/FavoritePage.jsx";
import ProductDetailes from "./components/ProductDetailes.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import Shipping from "./pages/Orders/Shipping.jsx";
import PlaceOrder from "./components/PlaceOrder.jsx";
import Order from "./pages/Orders/Order.jsx";
import Success from "./components/Success.jsx";
import Cancel from "./components/Cancel.jsx";
import UserOrders from "./pages/profile/UserOrders.jsx";
import OrderList from "./pages/Admin/orders/OrderList.jsx";
import AdminDashboard from "./pages/Admin/dashboard/AdminDashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<FavoritePage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/placeOrder" element={<PlaceOrder />} />
      <Route path="/product/:productId" element={<ProductDetailes />} />
      <Route path="order/:id" element={<Order />} />
      <Route path="/success/:orderId" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="/user-orders" element={<UserOrders />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<PrivateRoutes />}>
        <Route path="users" element={<Users />} />
        <Route path="categories" element={<Categories />} />
        <Route path="products" element={<Products />} />
        <Route path="createProduct" element={<CreateProduct />} />
        <Route path="updateProduct/:productId" element={<UpdateProduct />} />
        <Route path="orderslist" element={<OrderList />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider
      router={router}
      future={{ v7_startTransition: true }}
    ></RouterProvider>
  </Provider>
);
