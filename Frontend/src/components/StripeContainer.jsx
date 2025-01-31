/* eslint-disable no-undef */

import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeContainer;
