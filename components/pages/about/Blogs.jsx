"use client";
import { getarticle } from "@/actions/axios/cmsAxios";
import { blogs2 } from "@/data/blogs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import config from '../../../Config/config'
export default function Blogs() {
  const [blogcard, setblogcard] = useState([])
  console.log("blodfgcard",blogcard)
  useEffect(() => {

    getarticles()
  }, [])
  const getarticles = async () => {
    // var address = { skip, limit }
    var resp = await getarticle();
    console.log("articleaaa", resp);
    if (resp.status) {

      setblogcard(resp.data)
    }
    else {
     console.log("error")
    }
  }
  return (
    <section className="relative py-24">
      <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
        <Image
          width={1920}
          height={789}
          src="/img/gradient_light.jpg"
          alt="gradient"
          className="h-full w-full"
        />
      </picture>
      <div className="container">
        <h2 className="mb-12 text-center font-display text-3xl text-jacarta-700 dark:text-white">
          You Might Have Read About Us In The News
        </h2>
        <div className="grid grid-cols-1 gap-[1.875rem] sm:grid-cols-2 md:grid-cols-3">
          {/* blogs2 replace blogcard */}
          {blogcard.slice(0, 3).map((elm, i) => (
            <article key={i}>
              <div className="overflow-hidden rounded-2.5xl transition-shadow hover:shadow-lg">
                <figure className="group overflow-hidden">
                  <Link href={`/single-post/${elm.url}`}>
                    <Image
                      width={570}
                      height={398}
                      // src={elm.imgSrc}
                      src={`${config.IMG_URL}/${elm.img}`}
                      alt="post 2"
                      // className="h-full w-full object-cover transition-transform duration-[1600ms] will-change-transform group-hover:scale-105"
                      className="h-[250px] w-full object-cover transition-transform duration-[1600ms] will-change-transform group-hover:scale-105"

                    />
                  </Link>
                </figure>

                {/* Body */}
                <div className="rounded-b-[1.25rem] border border-t-0 border-jacarta-100 bg-white p-[10%] dark:border-jacarta-600 dark:bg-jacarta-700">
                  {/* Meta */}
                  <div className="mb-3 flex flex-wrap items-center space-x-1 text-xs">
                    <a
                      href="#"
                      className="font-display text-jacarta-700 hover:text-accent dark:text-jacarta-200"
                    >
                      {elm.writer}
                    </a>
                    <span className="dark:text-jacarta-400">insdsd</span>
                    <span className="inline-flex flex-wrap items-center space-x-1 text-accent">
                      {elm.category}
                    </span>
                  </div>

                  <h2 className="mb-4 font-display text-xl text-jacarta-700 hover:text-accent dark:text-white dark:hover:text-accent">
                    <Link href={`/single-post/${elm.url}`}> {elm.heading.slice(0,10)+".."}</Link>
                  </h2>
                  <div className="mb-8 dark:text-jacarta-200 min-h-[40px] h-full">{elm.content.length > 100 ? <div dangerouslySetInnerHTML={{ __html: elm.content.slice(0, 100) + '...' }}></div> : <div dangerouslySetInnerHTML={{ __html: elm.content }}></div>}</div>

                  {/* Date / Time */}
                  <div className="flex flex-wrap items-center space-x-2 text-sm text-jacarta-400">
                    <span>
                      <time>{elm.date && `${new Date(elm?.date).toLocaleString("default", { month: "long" })} ${new Date(elm?.date).getDate()}, ${new Date(elm?.date).getFullYear()}`}</time>
                    </span>
                    <span>•</span>
                    <span>3 min read</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
