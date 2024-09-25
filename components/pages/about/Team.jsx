"use client";
import { Joinusteamlist, Sociallinks } from "@/actions/axios/cmsAxios";
import { teamMembers } from "@/data/team";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import config from "../../../Config/config";
export default function Team() {
  const [jointeam, setJointeam] = useState([]);
  const [link, setLink] = useState([]);

  useEffect(() => {
    Getjointeam();
    Getlink();
  }, []);

  const Getjointeam = async () => {
    try {
      let resp = await Joinusteamlist();
      console.log("🚀 ~ Getjointeam ~ resp:", resp);
      if (resp.status) {
        setJointeam(resp.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const Getlink = async () => {
    let link_res = await Sociallinks();
    console.log("linkss", link_res?.msg);
    setLink(link_res?.msg ?? []);
  };

  return (
    <section className="py-24">
      <div className="container">
        <h2 className="mb-12 text-center font-display text-3xl text-jacarta-700 dark:text-white">
          Meet Our Amazing Team
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-[1.875rem] lg:grid-cols-5">
          {jointeam.slice(0, 9).map((elm, i) => (
            <div
              key={i}
              className="rounded-2lg border border-jacarta-100 bg-white p-8 text-center transition-shadow hover:shadow-lg dark:border-jacarta-600 dark:bg-jacarta-700"
            >
              <Image
                width={130}
                height={130}
                src={`${config.IMG_URL}/${elm?.img}`}
                className="mx-auto mb-6 h-[8.125rem] w-[8.125rem] rounded-2.5xl"
                alt="team"
              />
              <h3 className="font-display text-md text-jacarta-700 dark:text-white">
                {elm.name}
              </h3>
              <span className="text-2xs font-medium tracking-tight text-jacarta-400">
                {elm.job}
              </span>

              <div className="mt-3 flex justify-center space-x-5">
                {/* {link.slice(2, 4).map((elm2, i2) => (
                  <a key={i2} href={elm2.link} className="group">
                    <Image
                      width={370}
                      height={250}
                      src={`${config.IMG_URL}/socialimg/${elm2?.img}`}
                      alt="post 2"
                      className="w-[20px] h-[20px] object-cover "
                    />
                  </a>
                ))} */}
              </div>
            </div>
          ))}

          <Link
            href="/careers"
            className="flex items-center justify-center rounded-2lg border border-jacarta-100 bg-white p-8 text-center transition-shadow hover:shadow-lg dark:border-jacarta-600 dark:bg-jacarta-700"
          >
            {/* <Link href={{ pathname: '/careers', query: { data: jointeam } }}></Link> */}

            <span className="font-display text-md text-jacarta-700 dark:text-white">
              Join us!
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
