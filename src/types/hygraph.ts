export type ShopItemsQueryResult = {
  general: General;
  shopItems: Array<ShopItem>;
};

export type General = {
  footerText: string;
};

export type ShopItem = {
  id: string;
  price: number;
  title: string;
  slug: string;
  digitalFileGuid: string;
  color: "orange" | "blue" | "green" | "pink";
  images: Array<{
    id: string;
    url: string;
  }>;
  description: {
    html: string;
  };
};
