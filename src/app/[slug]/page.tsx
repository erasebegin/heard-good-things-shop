import { fetchShopItem, fetchShopItems } from "@/services/hygraph";
import { ShopItem } from "@/types/hygraph";
import Image from "next/image";
import Link from "next/link";
import { moonblossom } from "../fonts";
import PageHeader from "../components/PageHeader";

export async function generateStaticParams() {
  const res = await fetchShopItems();

  const shopItems = res.data.shopItems;

  return shopItems.map((shopItem: ShopItem) => ({
    slug: shopItem.slug,
  }));
}

const page = async ({ params }: { params: { slug: string } }) => {
  const { data, errors } = await fetchShopItem(params.slug);

  if (errors) {
    throw new Error("Couldn't load page content");
  }

  const { title, description, images, color, price, slug } =
    data.shopItem ?? {};

  interface ColorMap {
    [key: string]: string;
  }

  const colorMap: ColorMap = {
    green: "#418A35",
    pink: "#F19E94",
    orange: "#FDD298",
    blue: "#96D4E5",
  };

  return (
    <div className="relative flex flex-col items-center justify-center pt-10 md:pt-30 px-5 sm:px-5 max-w-[1200px] m-auto">
      <PageHeader />

      <div className="w-full flex justify-between pb-6 sm:pb-12">
        <Link href="/">
          <button
            className={`bg-orange-100 rounded-lg p-3 text-green-200 border-2 ${moonblossom.className}`}
            style={{
              boxShadow: `-5px 5px 0px ${colorMap[color]}`,
              borderColor: colorMap[color],
            }}
          >
            BACK
          </button>
        </Link>
        <Link href={`/${slug}/checkout`}>
          <button
            className={`bg-orange-100 rounded-lg p-3 text-green-200 border-2 ${moonblossom.className}`}
            style={{
              boxShadow: `-5px 5px 0px ${colorMap[color]}`,
              borderColor: colorMap[color],
            }}
          >
            CHECKOUT
          </button>
        </Link>
      </div>

      <div
        className="bg-orange-100 rounded-3xl p-3 sm:p-10 lg:p-20 flex flex-col sm:flex-row gap-10 border-2"
        style={{
          boxShadow: `-5px 5px 0px ${colorMap[color]}`,
          borderColor: colorMap[color],
        }}
      >
        <div className="basis-1/2">
          <Image
            src={images[0].url}
            height={400}
            width={400}
            alt={title}
            className="object-cover rounded-3xl"
          />
        </div>
        <div className="basis-1/2 flex flex-col gap-3">
          <h1 className="text-2xl sm:text-4xl">{title}</h1>
          <p className="text-lg sm:text-xl">£{price} GBP</p>
          <p
            suppressHydrationWarning
            className="font-light mb-3"
            dangerouslySetInnerHTML={{ __html: description?.html }}
          />
          <Link href={`/${slug}/checkout`}>
            <button
              className={`bg-yellow-200 p-3 rounded-lg ${moonblossom.className}`}
            >
              BUY IT NOW
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
