import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { useGetMyOrdersQuery } from "../../redux/api/admin/orderApiSlice";
import { BASE_URL } from "../../redux/constants";
import { devices } from "../../../utils/styledConstants";
import { OrderListTable } from "../Admin/orders/OrderList";

const UserOrders = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <UserOrdersWrapper>
      <h2>My Orders </h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h3>{error?.data?.error || error.error}</h3>
      ) : (
        <OrderListTable>
          <thead className="order-list-thead">
            <tr>
              <th>ITEMS</th>
              <th>ID</th>
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
                    <img
                      src={`${BASE_URL}${order.orderItems[0].image}`}
                      alt=""
                    />
                  </td>

                  <td data-att="ID">{order._id}</td>
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
       
      )}
    </UserOrdersWrapper>
  );
};

export default UserOrders;

export const UserOrdersWrapper = styled.div`
  min-height: 100vh;
  width: 87%;
  margin: auto;
  padding-top: 1.5rem;
  position: relative;
  margin-bottom: 2rem;
  h2{
    margin-left: 1rem;
  }

  @media ${devices.lg} {
    width: 90%;
    margin-top:1rem;
    h2{
      margin-left:2.4rem;
    }
  }

  @media ${devices.md}{
    h2{
      margin-left:1rem;
    }
  }
 
`;
