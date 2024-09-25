'use Client'
import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import ItemDetails from "@/components/pages/item/ItemDetails";

export const metadata = {
  title: "Item Details || NFT STYLE ",
};


export async function generateStaticParams() {
  return [
    {
      params: {
        details: ['contractAddress', 'ownerAddress', 'itemId'],
      },
    },
  ];
}


export default function ItemDetailsPage({ params }) {
  return (
    <>
      <Header1 />
      <main className="mt-24">
        <ItemDetails params={params} />
      </main>
      <Footer1 />
    </>
  );
}
