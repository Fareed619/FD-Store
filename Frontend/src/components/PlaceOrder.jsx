import ProgressSteps from "./ProgressSteps";
import { styled } from "styled-components";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { clearCartItmes } from "../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrderMutation } from "../redux/api/admin/orderApiSlice";
import { devices } from "../../utils/styledConstants";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  console.log(cart)

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart?.shippingAddress?.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress?.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMehtod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItmes());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <PlaceOrderWrapper>
      <ProgressSteps step1 step2 step3 />
      <div className="place-order-container">
        {cart.cartItems?.length === 0 ? (
          <h2>Your cart is empty</h2>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="td-image">
                      <img src={`${item.image}`} alt="" />
                    </td>
                    <td>
                      <Link
                        to={`/product/${item.product}`}
                        style={{ color: "white" }}
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td>{item.qty}</td>
                    <td>{item.price.toFixed(2)}</td>
                    <td>$ {(item.qty * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Second section  (Order Summary) */}
            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="order-summary-details">
                <ul>
                  <li>
                    <span>Items:</span> $ {cart.itemsPrice}
                  </li>
                  <li>
                    <span>Shipping:</span> $ {cart.shippingPrice}
                  </li>
                  <li>
                    <span>Tax:</span> $ {cart.taxPrice}
                  </li>
                  <li>
                    <span>Total:</span> $ {cart.totalPrice}
                  </li>
                </ul>

                {error && <h2>{error.data.message}</h2>}
                <div className="order-summary-details-address">
                  <h3>Shipping</h3>
                  <p>
                    <span>Address: </span>
                    {cart.shippingAddress?.address},{" "}
                    {cart.shippingAddress?.city},
                    {cart.shippingAddress?.postalCode},
                    {cart.shippingAddress?.country}
                  </p>
                </div>

                <div className="order-pyment-method">
                  <h3>Payment Method</h3>
                  <span>Method :</span>
                  <p> {cart.paymentMehtod}</p>
                </div>
              </div>
              <button
                type="button"
                className="place-order-btn"
                disabled={cart.cartItems === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
              {isLoading && <Loader />}
            </div>
          </>
        )}
      </div>
    </PlaceOrderWrapper>
  );
};

export default PlaceOrder;

const PlaceOrderWrapper = styled.div`
  width: 85%;
  margin: auto;

  .place-order-container {
    table {
      width: 90%;
      margin: auto;
      tr {
        display: flex;
        width: 100%;
        padding: 1rem 0;
      }

      th,
      td {
        flex: 1 1 0;
        text-align: start;
      }

      .td-image {
        img {
          width: 50px;
          height: 50px;
          object-fit: cover;
        }
      }
    }
    .order-summary {
      width: 90%;
      margin: 1rem auto;

      .order-summary-details {
        background-color: #00000068;
        width: 90%;
        padding: 0.5rem 1.5rem;
        margin-top: 0.6rem;
        border-radius: 3px;
        display: flex;
        justify-content: space-between;
        span {
          color: white;
          font-weight: 500;
        }

        ul {
          list-style: none;
          li {
            margin: 0.3rem 0;
            color: rgba(255, 255, 255, 0.7);
          }
        }
        div {
          p {
            font-size: 15px;
          }
        }
        .order-pyment-method {
          p {
            display: inline;
            color: rgba(255, 255, 255, 0.7);
          }
        }
        .order-summary-details-address {
          p {
            color: rgba(255, 255, 255, 0.7);
          }
        }
      }

      .place-order-btn {
        margin: auto;
        margin-top: 1rem;
        width: 50%;
        padding: 0.5rem 1rem;
        border-radius: 50px;
        border: none;
        outline: none;
        background-color: var(--primary-clr-pink);
        color: white;
        cursor: pointer;
        font-size: 16px;
      }
    }
  }

  @media ${devices.md} {
    width: 90%;
    .place-order-container {
      table {
        width: 100%;
        th,
        td {
          font-size: 15px;
        }
      }
      .order-summary {
        width: 100%;
        .order-summary-details {
          width: 100%;
          flex-direction: column;
          gap: 1rem;
          h3 {
            font-size: 19px;
          }
          p {
            font-size: 14px;
          }
        }
      }
    }
  }
`;
