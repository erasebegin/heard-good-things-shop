"use client";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

type Props = { title: string; price: string };

const StripeCheckout: React.FC<Props> = ({ title, price }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <>
      <div className="mb-10 flex w-full flex-col items-center justify-center rounded-xl border-2 border-pink-200 bg-orange-100 p-10 shadow-pink">
        <div className="w-full">
          <h1 className="pb-10 text-center text-6xl text-gray-700">CHECKOUT</h1>
          <h2 className="text-center text-xl">You are purchasing:</h2>
          <h2 className="pb-5 text-center text-2xl text-green-200">{title}</h2>
          <h3 className="pb-10 text-center text-2xl text-gray-700">
            for <span className="text-5xl">£{price}</span>
          </h3>
        </div>
        <PaymentElement />
        {errorMessage && <p className="font-">{errorMessage}</p>}
      </div>
      <button
        className="rounded-lg border-2 border-pink-200 bg-orange-100 p-3 text-xl text-green-200 shadow-pinkSmall"
        type="button"
        onClick={handleSubmit}
      >
        Confirm Purchase
      </button>
    </>
  );
};

export default StripeCheckout;
