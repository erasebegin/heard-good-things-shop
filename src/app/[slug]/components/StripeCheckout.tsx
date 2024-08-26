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

  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!email) {
      setErrorMessage(
        "Please enter the email where you would like your download link to be sent",
      );

      return;
    }

    if (!stripe || !elements) {
      setErrorMessage(
        "stripe.js failed to load, check your browser settings and reload the page",
      );
      // Stripe.js hasn't yet loaded.
      return;
    }

    // const { error }: { error: any } = await stripe.confirmPayment({
    //   //`Elements` instance that was used to create the Payment Element
    //   elements,
    //   confirmParams: {
    //     return_url: `${process.env.NEXT_PUBLIC_BASEURL}/thank-you&email=${email}`,
    //   },
    // });

    if (false) {
      setErrorMessage(error?.message);
    } else {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASEURL}/api/handle-payment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          },
        );

        if (!response.ok) {
          throw new Error(
            `Error generating download token. status: ${response.status}`,
          );
        }

        const data = await response.json();
        console.log("Response data:", data);

        return data;
      } catch (error) {
        console.error("Error generating download token:", error);
        throw error;
      }
    }
  };

  return (
    <>
      <div className="mb-10 flex w-full max-w-md flex-col items-center justify-center rounded-xl border-2 border-pink-200 bg-orange-100 p-10 shadow-pink">
        <div className="w-full">
          <h1 className="pb-10 text-center text-6xl text-gray-700">CHECKOUT</h1>
          <h2 className="text-center text-xl">You are purchasing:</h2>
          <h2 className="pb-5 text-center text-2xl text-green-200">{title}</h2>
          <h3 className="pb-10 text-center text-2xl text-gray-700">
            for <span className="text-5xl">£{price}</span>
          </h3>
        </div>
        <div className="bg-green-200 px-5 py-5 rounded-lg text-white text-center">
          <p className="text-xl pb-3">We'll send you a</p>
          <p className="text-2xl pb-3">download link</p>
          <p className="pb-5">Where would you like us to send it?</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="email"
            type="email"
            className="rounded-md text-gray-700 py-3 px-5"
          />
        </div>
        <div className="px-3 py-10">
          <PaymentElement />
        </div>
        {errorMessage && (
          <p className="bg-red-400 text-white rounded-md p-3 mt-5 max-w-sm">
            {errorMessage}
          </p>
        )}
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
