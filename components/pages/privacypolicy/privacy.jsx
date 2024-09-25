"use client";
import { getCmsContent } from "@/actions/axios/cmsAxios";
import { caseStudies } from "@/data/caseStudies";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Privacy() {

  const [privacy,setPrivacy]=useState([])
  useEffect(()=>
  {
    privacypolicy();
  },[])
   const privacypolicy =async()=>{
  
       var resp = await getCmsContent("privacypolicy");
       console.log("setPrivacy",resp.data)
       if(resp?.status)
       setPrivacy(resp.data);
   }
  return (
    <>
      <section className="relative py-32">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <Image
            width={1920}
            height={900}
            src="/img/gradient.jpg"
            alt="gradient"
            className="h-full w-full"
          />
        </picture>
        <picture className="pointer-events-none absolute inset-0 -z-10 hidden dark:block">
          <Image
            width={1920}
            height={900}
            src="/img/gradient_dark.jpg"
            alt="gradient dark"
            className="h-full w-full"
          />
        </picture>
        <div className="container relative z-10">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="mb-6 text-center font-display text-4xl font-medium text-jacarta-700 dark:text-white">
              {privacy?.description}
            </h1>
            {/* <div className="text-lg leading-normal dark:text-jacarta-200">
              Be part of our young and innovative team, and we build trust,
              embrace feedback, grow rapidly, and love our work.
            </div> */}
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="container">
        <div className="mb-8 dark:text-jacarta-300">
              {/* SEO was about achieving significant uplifts in rankings, traffic,
              and revenue. They were ambitious in becoming the market leader
              online for advertising agencies. To achieve their version of
              success we customised a 24 month campaign. The core strategy
              leveraged: */}
              <div dangerouslySetInnerHTML={{__html:privacy?.answer}}></div>
            </div>
         
        </div>
      </section>
    </>
  );
}
