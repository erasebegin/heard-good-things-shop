"use client";

import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "./StripeCheckout";
import { Stripe, loadStripe } from "@stripe/stripe-js";

type Props = {
  title: string;
  price: string;
  options: { clientSecret: string };
};

const StripeWrapper: React.FC<Props> = ({ title, price, options }) => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
  );

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripeCheckout title={title} price={price} />
    </Elements>
  );
};

export default StripeWrapper;
