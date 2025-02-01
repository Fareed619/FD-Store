/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom";
import { usePayOrderMutation } from "../redux/api/admin/orderApiSlice";
import Loader from "../components/Loader";
import { useEffect } from "react";
const Success = () => {
  const { orderId } = useParams();

  const [payOrder, { isLoading, error }] = usePayOrderMutation();
  const body = {
    orderId,
    details: "",
  };

  const payTheOrder = async () => {
    try {
      await payOrder(body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    payTheOrder();
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <h2 style={{ width: "85%", margin: "auto", paddingTop: "1rem" }}>
        {error?.data?.error || error.error}
      </h2>
    );
  }
  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        paddingTop: "1rem",
        fontSize: "20px",
      }}
    >
      <h2>Thank you for your trust. </h2>

      <Link to={`/order/${orderId}`} style={{ color: "white" }}>
        Go Back
      </Link>
    </div>
  );
};

export default Success;
