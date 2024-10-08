import Footer1 from "@/components/footer/Footer1";
import PageTitle from "@/components/resources/platform-status/PageTitle";
import Status from "@/components/resources/platform-status/Status";

export const metadata = {
  title: "Platform Status || NFT STYLE ",
};

export default function PlatformStatusPage() {
  return (
    <>
      {/* <Header5 /> */}
      <main className="pt-[5.5rem] lg:pt-24">
        <PageTitle />
        <Status />
      </main>
      <Footer1 />
    </>
  );
}
