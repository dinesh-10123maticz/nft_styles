import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import Banner from "@/components/pages/collection/Banner";
import Collection from "@/components/pages/collection/Collection";
import Profile from "@/components/pages/collection/Profile";

export const metadata = {
  title: "Collection Details || NFT STYLE ",
};

export async function generateStaticParams() {
  return [
    {
      params: {
        id: "id",
      },
    },
  ];
}
export default function ClooectionSinglePage({ params }) {
  return (
    <>
      <Header1 />
      <main className="pt-[5.5rem] lg:pt-24">
        <Banner />
        <Profile id={params.id} />
        <Collection />
      </main>
      <Footer1 />
    </>
  );
}

// ClooectionSinglePage.getInitialProps = async (params) => {
//   let pageProps = params;
//   return pageProps;
// };
