"use client";
import { getCmsContent } from "@/actions/axios/cmsAxios";
import Image from "next/image";
import { useEffect, useState } from "react";
import config from '../../../Config/config'
export default function PageTitle() {

  const [aboutusTop, setAboutusTop] = useState({});

  useEffect(()=>{ 
    GetAboutusTop()
  },[])
  const GetAboutusTop = async () => {
    var resp = await getCmsContent("aboutus_top");
    console.log("setAboutusTop", resp.data)
    if (resp?.status) setAboutusTop(resp.data);
  };

  return (
    <section className="relative pt-24 lg:pb-96">
      <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
        <Image
          width={1920}
          height={789}
          src="/img/gradient_light.jpg"
          // src={`${config.IMG_URL}/cmsimg/${aboutusTop?.img}`}
          alt="gradient"
          className="h-full w-full"
        />
      </picture>
      <div className="container">
        <div className="mx-auto max-w-2xl py-16 text-center">
          <h1 className="mb-8 font-display text-4xl font-medium text-jacarta-700 dark:text-white">
            {/* About NFT-Style */}
            {aboutusTop?.description}
          </h1>
          <div className="text-lg leading-normal dark:text-jacarta-300">
            {/* Every digital creation available through MakersPlace is an authentic
            and truly unique digital creation, signed and issued by the creator
            — made possible by blockchain technology. */}
            <div dangerouslySetInnerHTML={{__html:aboutusTop?.answer}}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
