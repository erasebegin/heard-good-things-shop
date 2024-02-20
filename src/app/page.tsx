import { fetchShopItems } from "@/services/hygraph";
import { ShopItem } from "@/types/hygraph";
import ShopCard from "./components/ShopCard";
import PageHeader from "./components/PageHeader";

export default async function Home() {
  const { data, errors } = await fetchShopItems();

  if (errors) {
    throw new Error("Could not load page content");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-10 md:pt-20">
      <PageHeader />
      <div className="relative flex flex-col place-items-center pt-10 md:pt-30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-8 px-3">
          {data?.shopItems?.map((shopItem: ShopItem) => (
            <ShopCard key={shopItem.id} data={shopItem} />
          ))}
        </div>
      </div>
    </main>
  );
}
