'use Client'
import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import Collections from "@/components/pages/Collections";
export const metadata = {
  title: "Collcetions || NFT STYLE ",
};


export default function CollectionsPage({params}) {
  return (
    <>
      <Header1 />
      <main>
        <Collections params={params}/>
      </main>
      <Footer1 />
    </>
  );
}
