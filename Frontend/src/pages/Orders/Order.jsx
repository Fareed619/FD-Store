/* eslint-disable no-undef */
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { FaArrowRight } from "react-icons/fa";
import { devices } from "../../../utils/styledConstants";
import Loader from "../../components/Loader";

import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
} from "../../redux/api/admin/orderApiSlice";
import { useEffect } from "react";
import { usePayByStripeMutation } from "../../redux/api/admin/stripeApiSlice";
import { loadStripe } from "@stripe/stripe-js";

const Order = () => {
  const { id: orderId } = useParams();

  // Get order's details from server
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payStripe] = usePayByStripeMutation();

  const makePayment = async (e) => {
    e.preventDefault();
    try {
      const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_KEY);

      const products = {
        items: order.orderItems,
        _orderId: order._id,
      };
      const res = await payStripe(products).unwrap();
      if (res.error) {
        throw new Error(res.error);
      }
      window.location = res.url;
    } catch (error) {
      toast.error(error.data.error);
    }
  };

  // Go to server and tell him that the order is deliverd
  const [deliverOrder, { isLoading: loadingDeliverOrder }] =
    useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const deliverTheOrder = async () => {
    try {
      const deliverd = await deliverOrder(order._id).unwrap();
      if (deliverd.error) {
        throw new Error(deliverOrder.error);
      }

      toast.success("The order deliverd successfuly");
      refetch();
    } catch (error) {
      toast.error(error.error);
    }
  };

  useEffect(() => {
    refetch();
  }, [deliverOrder, refetch, order]);
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <OrderWrapper>
        <h2>{error.data.message}</h2>
      </OrderWrapper>
    );
  }
  return (
    <OrderWrapper>
      <div className="order-container">
        <div className="order-items-details">
          <table>
            <thead className="order-items-details-thead">
              <tr>
                <th>Image</th>
                <th>product</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {order.orderItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src={`${item.image}`} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>{item.price}</td>
                  <td>$ {(item.qty * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="order-shipping-details">
          <div>
            <h2>Shipping</h2>
            <p>
              <strong>Order: </strong> {order._id}
            </p>
            <p>
              <strong>Name: </strong> {order.user.username}
            </p>
            <p>
              <strong>Email: </strong> {order.user.email}
            </p>
            <p>
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            <p>
              <strong>Method: </strong> {order.paymentMethod}
            </p>

            {order.isPaid ? (
              <div className="order-order-shipping-details-ispaid">
                <h4>
                  Paid At {"  "} {order.paidAt.substring(0, 10)}
                </h4>
              </div>
            ) : (
              <div className="order-order-shipping-details-ispaid">
                <h3>Not Paid</h3>
              </div>
            )}

            <div className="order-order-shipping-details-ordersummary">
              <h3>Order Summary</h3>
              <div>
                <span>Items</span>
                <span>$ {order.itemsPrice}</span>
              </div>
              <div>
                <span>Shipping</span>
                <span>$ {order.shippingPrice}</span>
              </div>
              <div>
                <span>Tax</span>
                <span>$ {order.taxPrice}</span>
              </div>
              <div>
                <span>Total</span>
                <span>$ {order.totalPrice}</span>
              </div>
            </div>

            {!order.isPaid && order?.user?.username === userInfo.username && (
              <div className="order-pay-now">
                <button onClick={makePayment}>
                  <span> Pay Now</span>
                  <span>
                    {" "}
                    <FaArrowRight />
                  </span>
                </button>
              </div>
            )}
            {order.isPaid && !order.isDelivered && userInfo.isAdmin && (
              <div className="order-deliver">
                <button onClick={deliverTheOrder}>
                  {loadingDeliverOrder ? "Delivering..." : "Mark As Deliverd"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </OrderWrapper>
  );
};

export default Order;

const OrderWrapper = styled.div`
  width: 90%;
  margin-left: 5rem;
  padding-top: 1.5rem;

  .order-container {
    display: flex;
    /* gap: 1rem; */
    .order-items-details {
      width: 70%;

      table {
        width: 90%;
        border: 1px solid gray;
        border-radius: 2px;
        padding: 0.4rem;

        tbody {
          tr {
            td {
              font-size: 15px;
              text-align: center;
              padding-top: 1rem;

              img {
                width: 50px;
                height: 50px;
                border-radius: 3px;
              }
            }
          }
        }
      }
    }

    .order-shipping-details {
      div {
        p {
          margin-top: 0.4rem;
          font-size: 15px;
          strong {
            color: var(--primary-clr-pink);
            font-size: 17px;
          }
        }
        .order-order-shipping-details-ispaid {
          margin-top: 1rem;
          padding: 0.4rem 1rem;
          background-color: #808080b6;
          border-radius: 3px;
        }
        .order-order-shipping-details-ordersummary {
          margin-top: 2rem;
          div {
            display: flex;
            justify-content: space-between;
            margin-top: 0.3rem;
          }
        }
        .order-pay-now {
          margin-top: 2rem;
          button {
            padding: 0.5rem 1rem;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            font-size: 15px;
            cursor: pointer;
            background-color: gray;
            color: white;
            border-radius: 4px;
            transition: all 0.4s ease;
            border: none;
            &:hover {
              scale: 1.1;
            }
          }
        }
        .order-deliver {
          button {
            padding: 0.5rem 1rem;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            font-size: 15px;
            cursor: pointer;
            background-color: var(--primary-clr-pink);
            color: white;
            border-radius: 4px;
            transition: all 0.4s ease;
            border: none;
            margin-top: 2rem;
          }
        }
      }
    }
  }

  @media ${devices.lg} {
    margin-left: 3rem;
    margin: auto;
    padding-top: 3rem;
    .order-container {
      flex-direction: column;
      .order-items-details {
        width: 60%;
        margin: auto;
        table {
          width: 100%;
          .order-items-details-thead {
            th {
              font-size: 15px;
            }
          }
        }
      }
      .order-shipping-details {
        width: 60%;
        margin: 2rem auto;
      }
    }
  }
  @media ${devices.md} {
    margin-left: 3rem;
    margin: auto;
    padding-top: 3rem;
    .order-container {
      flex-direction: column;
      .order-items-details {
        width: 70%;
        margin: auto;
        table {
          width: 100%;
          .order-items-details-thead {
            th {
              font-size: 15px;
            }
          }
        }
      }
      .order-shipping-details {
        width: 70%;
        margin: 2rem auto;
      }
    }
  }
  @media ${devices.sm} {
    margin-left: 0;
    margin: auto;
    padding-top: 3rem;
    .order-container {
      flex-direction: column;

      .order-items-details {
        width: 100%;
        table {
          width: 100%;
          .order-items-details-thead {
            th {
              font-size: 15px;
            }
          }
        }
      }
      .order-shipping-details {
        width: 90%;
        margin: 2rem auto;
      }
    }
  }
`;
