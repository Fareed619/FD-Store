import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import ProgressSteps from "../../components/ProgressSteps";
import { devices } from "../../../utils/styledConstants";
import {
  savePaymentMethod,
  saveShippingAddress,
  resetCart,
} from "../../redux/features/cartSlice";
const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Payment
  useEffect(() => {
    if (!shippingAddress?.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const continueHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));

    navigate("/placeOrder");
  };
  return (
    <ShippingWrapper>
      <ProgressSteps step1 step2 />
      <div className="shipping-container">
        <form action="" className="shipping-form">
          <h2>Shipping</h2>
          <label>Address</label>
          <input
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <label>City</label>
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
          <label>Postal Code</label>
          <input
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <label>Country</label>
          <input
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
          <label htmlFor="">Select Method</label>
          <div style={{ margin: ".3rem 0" }}>
            <input
              type="radio"
              style={{ width: "fit-content" }}
              name="paymentMethod"
              required
              value="Stripe"
              checked={paymentMethod === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            <span>Stripe or Credit Card</span>
          </div>
          <button type="submit" onClick={continueHandler}>
            Continue
          </button>
        </form>
      </div>
    </ShippingWrapper>
  );
};

export default Shipping;

const ShippingWrapper = styled.div`
  width: 85%;
  margin: auto;
  height: 50vh;

  .shipping-container {
    display: flex;
    justify-content: center;
    height: 100%;

    .shipping-form {
      display: flex;
      flex-direction: column;
      width: 50%;

      h2 {
        margin-bottom: 1rem;
      }
      label {
        font-size: 14px;
        margin-bottom: 0.1rem;
      }

      input {
        width: 100%;
        padding: 0.4rem;
        border: 2px solid gray;
        border-radius: 3px;
        background-color: #00000049;
        color: white;
        outline: none;
        margin-bottom: 0.6rem;
      }
      input:focus {
        border: 2px solid #729af7b6;
      }
      span {
        font-size: 14px;
      }
      button {
        padding: 0.5rem 0;
        border: none;
        background-color: var(--primary-clr-pink);
        color: white;
        border-radius: 50px;
        outline: none;
        cursor: pointer;
        margin-top: 0.7rem;
      }
    }
  }

  @media ${devices.lg} {
    .shipping-container {
      .shipping-form {
        width: 70%;
      }
    }
  }

  @media ${devices.sm} {
    .shipping-container {
      .shipping-form {
        width: 100%;
      }
    }
  }
`;
