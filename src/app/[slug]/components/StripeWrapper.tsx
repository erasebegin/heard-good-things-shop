"use client";

import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "./StripeCheckout";
import { Stripe } from "@stripe/stripe-js";

type Props = {
  title: string;
  price: string;
  stripePromise: Promise<Stripe | null>;
  options: { clientSecret: string };
};

const StripeWrapper: React.FC<Props> = ({
  title,
  price,
  stripePromise,
  options,
}) => {
  console.log({ stripePromise, options });
  return (
    <Elements stripe={stripePromise} options={options}>
      <StripeCheckout title={title} price={price} />
    </Elements>
  );
};

export default StripeWrapper;
