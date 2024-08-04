import PageHeader from "@/app/components/PageHeader";
import { fetchShopItem } from "@/services/hygraph";
import { moonblossom } from "@/app/fonts";
import { loadStripe } from "@stripe/stripe-js";
import StripeWrapper from "../components/StripeWrapper";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY as string);

const Checkout = async ({ params }: { params: { slug: string } }) => {
  const { data, errors } = await fetchShopItem(params.slug);

  const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(data.shopItem.price) * 100,
    currency: "gbp",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  console.log({
    stripePromise,
    pubKey: process.env.STRIPE_PUBLISHABLE_KEY,
    privKey: process.env.STRIPE_PRIVATE_KEY,
    paymentIntent,
  });
  const options = {
    clientSecret: paymentIntent.client_secret as string,
  };

  if (errors) {
    throw new Error("Could not load page content");
  }

  return (
    <main
      className={`${moonblossom.className} flex min-h-screen flex-col items-center`}
    >
      <div className="relative flex flex-col place-items-center pt-10 md:pt-30">
        <PageHeader />

        <StripeWrapper
          title={data.shopItem.title}
          price={data.shopItem.price}
          stripePromise={stripePromise}
          options={options}
        />
      </div>
    </main>
  );
};

export default Checkout;
