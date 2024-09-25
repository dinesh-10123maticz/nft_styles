"use client";
import { Joinusteamlist, Joinusteamlistfront } from "@/actions/axios/cmsAxios";
import { jobData } from "@/data/careers";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Positions() {
  const [jointeam, setJointeam] = useState([])
  const [statuss, setStatuss] = useState([])
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(6)
  useEffect(() => {
    Getjointeam()
   

  }, [])

  const Getjointeam = async () => {
    try {
      var address = { skip, limit }
      let resp = await Joinusteamlistfront(address)
      console.log("jointeam", resp.data)
      if (resp.status) {
        // setJointeam(resp.data)
        setSkip(skip + limit)
      setStatuss(resp.data)
      resp?.data?.length != 0 && setJointeam([...jointeam, ...resp.data])

      }
    } catch (error) {
      console.log("error", error)
    }
  }
  return (
    <section className="relative pb-24">
      <div className="container">
        <div className="grid gap-7 md:grid-cols-3">
          {jointeam.map((elm, i) => (
            <div
              key={i}
              className="rounded-2.5xl border border-jacarta-100 bg-white p-12 text-center transition-shadow hover:shadow-xl dark:border-jacarta-600 dark:bg-jacarta-700"
            >
              <h3 className="mb-1 font-display text-lg text-jacarta-700 dark:text-white">
                {elm.job}
              </h3>
              <span className="mb-4 block text-xs text-jacarta-400 dark:text-jacarta-300">
                Experience – {elm.experience}
              </span>
              <div className="mb-8 dark:text-jacarta-300"><div dangerouslySetInnerHTML={{__html:elm.description}}></div></div>
              <Link href="/contact" className="text-sm font-bold text-accent">
                Apply Now
              </Link>
            </div>
          ))}
        </div>
        {statuss?.length == 0 ? "" : <div className="mt-10 text-center">
          {/* <Link
            href="/blog"
            className="inline-block rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
          >
            Load More
          </Link> */}
          <button   className="inline-block rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark" onClick={() => Getjointeam()}>Load More</button>
        </div>}
        <div className="mx-auto mt-20 max-w-md rounded-2lg bg-light-base py-5 px-10 text-center dark:bg-jacarta-700 sm:flex sm:items-center sm:text-left">
          <h4 className="mb-2 text-center font-display font-semibold text-jacarta-700 dark:text-white sm:mb-0 sm:text-left">
            Didn’t see your dream job?
          </h4>
          <Link
            href="/contact"
            className="ml-auto inline-block rounded-full bg-accent py-2.5 px-8 text-center text-sm font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
          >
            <span>Get In Touch</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
