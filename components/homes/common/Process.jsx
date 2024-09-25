"use client";
import { Newsletter, getCmsContent, roadmaplist } from "@/actions/axios/cmsAxios";
import { process3 } from "@/data/process";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import config from '../../../Config/config'
import { isEmpty } from "@/app/common/common";
export default function Process() {

  const [subscriber, setSubscriber] = useState([]);
  const [email, setEmail] = useState('');
  console.log("emailserrro", email)
  const [Error, SetError] = useState({});
  const [Roadmap, setRoadmap] = useState([]);
  console.log("Roadmap", Roadmap);

  useEffect(() => {
    GetSubscriber()
 
    getRoadmap()
  }, [])
  const GetSubscriber = async () => {
    var resp = await getCmsContent("subscriber");
    console.log("subscriber", resp)
    if (resp?.status) setSubscriber(resp.data);
  };

  const getRoadmap = async () => {
    let Resp = await roadmaplist()
    console.log("roadmaplist", Resp.data);
    if (Resp?.status) {
      setRoadmap(Resp.data)

    }

  }

  const NewsLetter = async () => {
    const id = toast.loading("Subscribing...");

    let err = {};
    if (email == '') err.email = "Email Id Required";
    if (email && !(config.EMAIL).test(email)) err.email = 'Invalid Email ID Format';
    SetError(err);

    if (isEmpty(err)) {
      let resp = await Newsletter({ email: email });
      if (resp.success === 'success') {
        console.log("sucesssssssss");
        toast.update(id, { render: "Successfully Subscribed", type: "success", isLoading: false, autoClose: 1000, closeButton: true, closeOnClick: true })
        setEmail('');
      }
      else {
        toast.update(id, { render: "Already User", type: 'error', isLoading: false, autoClose: 1000, closeButton: true, closeOnClick: true })
        SetError({ email: resp.msg });
      }
    }
    else {
      toast.update(id, { render: err.email, type: 'error', isLoading: false, autoClose: 1000, closeButton: true, closeOnClick: true })
    }


  }

  return (
    <section className="relative py-24 dark:bg-jacarta-800">
      <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
        <Image
          width={1920}
          height={789}
          src="/img/gradient_light.jpg"
          priority
          alt="gradient"
          className="h-full w-full"
        />
      </picture>
      <div className="container">
        <h2 className="mb-16 text-center font-display text-3xl text-jacarta-700 dark:text-white">
          Create and sell your NFTs
        </h2>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {Roadmap.map((elm, i) => (
            <div key={i} className="text-center">
              <div
                className={`mb-6 inline-flex rounded-full bg-[${elm.backgroundColor}] p-3`}
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${elm.bgClass}`}
                >
                  <Image
                    width={24}
                    height={24}
                    src={`${config.IMG_URL}/Roadmapimg/${elm?.image}`}
                    alt="process"
                  />
                </div>
              </div>
              <h3
                dir="ltr"
                className="mb-4  font-display text-lg text-jacarta-700 dark:text-white"
              >
                {elm.heading}
              </h3>
              <div className="dark:text-jacarta-300"><div dangerouslySetInnerHTML={{ __html: elm?.description }}></div></div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-2xl text-center text-lg text-jacarta-700 dark:text-white">
          {/* Join our mailing list to stay in the loop with our newest feature
          releases, NFT drops, and tips and tricks for navigating NFT-Style */}
          <div dangerouslySetInnerHTML={{ __html: subscriber?.answer }}></div>
        </div>

        <div className="mx-auto mt-7 max-w-md text-center">
          <form onSubmit={(e) => e.preventDefault()} className="relative">
            <input
              type="email"
              // dir="ltr"
              name="email"
              placeholder="Email address"

              className="w-full rounded-full border border-jacarta-100 py-3 px-4 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder-white"
              value={'' || email} onChange={(e) => { setEmail(e.target.value) }} required="" id="email" autoComplete="off"
            />
            <button className="absolute top-2 right-2 rtl:left-2 rtl:right-auto rounded-full bg-accent px-6 py-2 font-display text-sm text-white hover:bg-accent-dark" type="button" id="subscribe-button" onClick={NewsLetter}>
              Subscribe
            </button>
            <span id="email-error" className="error-msg">{Error && Error.email}</span>

          </form>
        </div>
      </div>
    </section>
  );
}
