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
      <div className="flex flex-col mb-10 items-center w-full justify-center p-10 rounded-xl bg-orange-100 shadow-pink border-pink-200 border-2">
        <div className="w-full">
          <h1 className="text-6xl text-gray-700 text-center pb-10">CHECKOUT</h1>
          <h2 className="text-xl text-center">You are purchasing:</h2>
          <h2 className="text-2xl text-center text-green-200 pb-5">{title}</h2>
          <h3 className="text-gray-700 text-2xl text-center pb-10">
            for <span className="text-5xl">£{price}</span>
          </h3>
        </div>
        <PaymentElement onChange={(something) => console.log({ something })} />
        {errorMessage && <p className="font-">{errorMessage}</p>}
      </div>
      <button
        className="bg-orange-100 rounded-lg p-3 text-green-200 text-xl border-2 border-pink-200 shadow-pinkSmall"
        type="button"
        onClick={handleSubmit}
      >
        Confirm Purchase
      </button>
    </>
  );
};

export default StripeCheckout;
