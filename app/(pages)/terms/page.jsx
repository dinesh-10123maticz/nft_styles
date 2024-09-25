import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import Terms from "@/components/pages/terms/terms";
import Faq from "@/components/pages/faq/faq";

export const metadata = {
  title: "Not Found || NFT STYLE ",
};
export default function NotFoundPage() {
  return (
    <>
      <Header1 />
      <main className="pt-[5.5rem] lg:pt-24">
        <Terms />
       {/* <Faq/> */}
      </main>
      <Footer1 />
    </>
  );
}
