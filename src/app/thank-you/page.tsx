import PageHeader from "@/app/components/PageHeader";
import { moonblossom } from "@/app/fonts";

const Checkout = async ({ params }: { params: { slug: string } }) => {
  return (
    <main
      className={`${moonblossom.className} flex min-h-screen flex-col items-center`}
    >
      <div className="relative flex flex-col place-items-center pt-10 md:pt-30">
        <PageHeader />

        <h1>Thank You</h1>
      </div>
    </main>
  );
};

export default Checkout;
