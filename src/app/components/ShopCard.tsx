"use client";
import { ShopItem } from "@/types/hygraph";
import Image from "next/image";
import Link from "next/link";

type Props = {
  data: ShopItem;
};

const ShopCard = (props: Props) => {
  const { price, title, images, color, slug } = props.data;

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
    <Link href={`/${slug}`}>
      <div
        className="rounded-3xl overflow-hidden shadow-md p-6 text-left bg-orange-100 border-2 max-w-[300px]"
        style={{
          boxShadow: `-5px 5px 0px ${colorMap[color]}`,
          borderColor: colorMap[color],
        }}
      >
        <Image
          className="w-291 h-291 object-cover mx-auto mb-6"
          src={images[0].url}
          alt="Mindfood Sample Pack"
          width={291}
          height={291}
        />
        <p className="font-light text-base mb-2">{title}</p>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold">£{price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ShopCard;
