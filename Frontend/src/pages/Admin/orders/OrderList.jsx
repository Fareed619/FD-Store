import { useGetOrdersQuery } from "../../../redux/api/admin/orderApiSlice";
import Loader from "../../../components/Loader";
import AdminTopComponents from "../AdminTopComponent";
import { styled } from "styled-components";
import { AdminWrappr } from "../admin.style";
import { Link } from "react-router-dom";
import { devices } from "../../../../utils/styledConstants";
import { useEffect } from "react";

const OrderList = () => {
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();

  useEffect(() => {
    refetch();
  }, [refetch, orders]);
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <h2>{error?.data?.error || error.error}</h2>;
  }

  return (
    <AdminOrderList>
      <AdminTopComponents content="Orders" addition="list" />

      <OrderListTable>
        <thead className="order-list-thead">
          <tr>
            <th>ITEMS</th>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
          </tr>
        </thead>
        <tbody className="order-list-tbody">
          {orders.map((order) => (
            <>
              <tr key={order._id}>
                <td>
                  <img src={`${order.orderItems[0].image}`} alt="" />
                </td>

                <td data-att="ID">{order._id}</td>
                <td data-att="USER">
                  {order.user ? order.user.username : "N/A"}
                </td>
                <td data-att="DATE">
                  {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                </td>
                <td data-att="TOTAL">$ {order.totalPrice}</td>
                <td data-att="PAID">
                  {" "}
                  {order.isPaid ? (
                    <p className="userorder-completed">Completed</p>
                  ) : (
                    <p className="userorder-pending">Pending</p>
                  )}
                </td>
                <td data-att="COMPLETED">
                  {" "}
                  {order.isDelivered ? (
                    <p className="userorder-completed">Completed</p>
                  ) : (
                    <p className="userorder-pending">Pending</p>
                  )}
                </td>

                <td>
                  <Link to={`/order/${order._id}`}>
                    {" "}
                    <button>More</button>
                  </Link>
                </td>
              </tr>
              <hr className="order-list-hr" />
            </>
          ))}
        </tbody>
      </OrderListTable>
    </AdminOrderList>
  );
};

export default OrderList;

const AdminOrderList = styled.div`
  min-height: 100vh;
  width: 87%;
  margin: auto;
  padding-top: 1.5rem;
  position: relative;
  margin-bottom: 2rem;

  @media ${devices.lg} {
    width: 90%;
  }
`;

export const OrderListTable = styled.table`
  width: 95%;
  margin: 2rem 0;
  margin-left: 1rem;
  thead {
    tr {
      th {
        text-align: start;
      }
    }
  }

  tbody {
    .order-list-hr {
      display: none;
    }
    tr {
      td {
        padding-top: 1rem;
        img {
          width: 70px;
          height: 50px;
          border-radius: 4px;
        }
        .userorder-completed {
          background-color: green;
          border-radius: 50px;
          text-align: center;
          padding: 0.2rem 0;
          width: 6rem;
        }
        .userorder-pending {
          background-color: #ff0000ac;
          border-radius: 50px;
          text-align: center;
          padding: 0.2rem 0;
          width: 6rem;
        }

        button {
          color: white;
          border: none;
          padding: 0.6rem 1rem;
          background-color: var(--primary-clr-pink);
          border-radius: 5px;
          cursor: pointer;
        }
      }
    }
  }

  @media ${devices.lg} {
    margin: 2rem auto;
    margin-left: 2rem;
    width: 100%;

    tbody {
      font-size: 15px;
      tr {
        td {
          img {
            width: 50px;
            height: 30px;
            border-radius: 4px;
          }
          .userorder-completed {
            width: 5rem;
          }
          .userorder-pending {
            width: 5rem;
          }
          button {
            padding: 0.5rem 0.8rem;
          }
        }
      }
    }
  }
  @media ${devices.md} {
    margin: 2rem auto;
    width: 100%;
    .order-list-thead {
      th {
        display: none;
      }
    }
    .order-list-tbody {
      .order-list-hr {
        display: block;
        width: 90%;
        margin: 0.3rem 0;
      }
      td {
        display: block;
        width: 90%;
        color: rgba(255, 255, 255, 0.8);

        img {
          width: 60%;
          height: 120px;
        }
        .userorder-pending {
          display: inline;
          padding: 0.1rem 1rem;
        }
        .userorder-completed {
          display: inline;
          padding: 0.1rem 1rem;
        }
        button {
          width: 50%;
        }
      }

      td:not(:first-child, :last-child)::before {
        content: attr(data-att) ": ";
        font-weight: 700;
        color: white;
      }
    }
  }
`;
