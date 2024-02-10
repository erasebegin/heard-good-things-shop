import { fetchShopItem, fetchShopItems } from "@/services/hygraph";
import { ShopItem } from "@/types/hygraph";
import Image from "next/image";
import Link from "next/link";

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
    <div className="relative flex flex-col items-center justify-center pt-10 md:pt-30 px-3 sm:px-5 max-w-[939px] m-auto">
      <Image
        src="/hgt_header.svg"
        alt="Heard Good Things logo"
        className="mb-20 md:mb-32"
        width={372}
        height={372}
        priority
      />

      <div className="w-full flex pb-12">
        <Link href="/">
          <button
            className="bg-orange-100 rounded-lg p-3 text-green-200 border-2"
            style={{
              boxShadow: `-5px 5px 0px ${colorMap[color]}`,
              borderColor: colorMap[color],
            }}
          >
            BACK
          </button>
        </Link>
      </div>

      <div
        className="bg-orange-100 rounded-3xl p-5 border-2 flex gap-10"
        style={{
          boxShadow: `-5px 5px 0px ${colorMap[color]}`,
          borderColor: colorMap[color],
        }}
      >
        <Image
          src={images[0].url}
          height={488}
          width={488}
          alt={title}
          className="w-[488px] h-[488px]"
        />
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl">{title}</h1>
          <p>£{price} GBP</p>
          <p
            className="font-light mb-3"
            dangerouslySetInnerHTML={{ __html: description?.html }}
          />
          <button className="bg-yellow-200 p-3 rounded-lg">BUY IT NOW</button>
          <button
            className="snipcart-add-item"
            data-item-id={slug}
            data-item-price={price}
            data-item-description={description.text}
            data-item-image={images[0].url}
            data-item-name={title}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
