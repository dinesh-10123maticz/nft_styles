import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import Categories from "@/components/homes/common/Categories";
import Topnft from "@/components/homes/common/Topnft";
import Hero from "@/components/homes/home-1/Hero";
import Hotbids from "@/components/homes/home-1/Hotbids";
import Process from "@/components/homes/common/Process";

export const metadata = {
  title: "Home 1 || NFT-STYLE ",
};
export default function HomePage1() {
  return (
    <>
      <Header1 />
      <main>
        <Hero />
        <Hotbids />
        {/*TODO : Topnft is ->  HOT AUCTION */}
        {/* <Topnft /> */}
        
        
        <Categories />
        <Process />
      </main>
      <Footer1 />
    </>
  );
}
