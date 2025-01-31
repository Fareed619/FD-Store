import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";

import { addToCart, removeFromCart } from "../../redux/features/cartSlice.js";

import CartProduct from "../../components/CartProduct.jsx";
import { devices } from "../../../utils/styledConstants.js";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };
  return (
    <CartWrapper>
      {cartItems?.length === 0 ? (
        <h3 style={{ textAlign: "center" }}>
          Your cart is empty{" "}
          <Link to="/" style={{ color: "rgb(219 39 119)" }}>
            Go To Shop
          </Link>
        </h3>
      ) : (
        <>
          <h2>Shopping Cart</h2>{" "}
          {cartItems?.map((item) => (
            <CartProduct
              item={item}
              key={item._id}
              addToCartHandler={addToCartHandler}
              removeFromCartHandler={removeFromCartHandler}
            />
          ))}
          <div className="cart-proceed-to-check">
            <h3>
              Items (
              {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
            </h3>
            <h2>
              ${" "}
              {Number(
                cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
              ).toFixed(2)}
            </h2>
            <button onClick={checkoutHandler} >Proceed To Checkout</button>
          </div>
        </>
      )}
    </CartWrapper>
  );
};

export default Cart;

const CartWrapper = styled.div`
  width: 70%;
  margin: auto;
  padding-top: 1.5rem;

  .cart-proceed-to-check {
    margin-top: 2rem;
    h2 {
      margin: 0.4rem 0;
    }
    button {
      padding: 0.4rem 2.3rem;
      background-color: var(--primary-clr-pink);
      border: none;
      outline: none;
      border-radius: 20px;
      color: white;
      font-size: 17px;
      cursor: pointer;
      margin-bottom:2rem;
    }
  }

  @media ${devices.xs} {
    .cart-proceed-to-check{
      button{
        padding: .2rem 1rem;
      }
    }

  }
`;
