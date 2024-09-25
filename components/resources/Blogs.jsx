"use client";
import { getarticle } from "@/actions/axios/cmsAxios";
import { blogs2, blogs3 } from "@/data/blogs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import config from '../../Config/config'
export default function Blogs() {

  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(6)
  const [status, setStatus] = useState(true)
  useEffect(() => {
    getarticles();
  }, [])

  const [blogcard, setblogcard] = useState([])
  const [statuss, setStatuss] = useState([])
  const getarticles = async () => {
    var address = { skip, limit }
    var resp = await getarticle(address);
    console.log("articleaaa", resp);
    if (resp.status) {
      // setblogcard(resp.data)
      // setblogcardss(resp.data)
      setSkip(skip + limit)
      setStatus(false)
      setStatuss(resp.data)
      resp?.data?.length != 0 && setblogcard([...blogcard, ...resp.data])
    }
    else {
      setStatus(resp.status)
    }
  }

  return (
    <section className="relative py-16 md:py-24">
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
        {/* Featured Post */}
        {blogcard.map((elm, i) => (
          <article key={i} className="mb-[1.875rem] md:mb-16">
            <div className="flex flex-col overflow-hidden rounded-2.5xl transition-shadow hover:shadow-lg md:flex-row">
              <figure className="group overflow-hidden md:w-1/2">
                <Link href={`/single-post/${elm.url}`}>
                  <Image
                    width={570}
                    height={398}
                    src={`${config.IMG_URL}/${elm.img}`}
                    alt="post 1"
                    className="h-full w-full object-cover transition-transform duration-[1600ms] will-change-transform group-hover:scale-105"
                  />
                </Link>
              </figure>

              {/* Body */}
              <div className="rounded-b-[1.25rem] border border-jacarta-100 bg-white p-[10%] dark:border-jacarta-600 dark:bg-jacarta-700 md:w-1/2 md:rounded-none md:rounded-r-[1.25rem]">
                {/* Meta */}
                <div className="mb-3 flex flex-wrap items-center space-x-1 text-xs">
                  <a
                    href="#"
                    className="font-display text-jacarta-700 hover:text-accent dark:text-jacarta-200"
                  >
                    {elm.writer}
                  </a>
                  <span className="dark:text-jacarta-400">in</span>
                  <span className="inline-flex flex-wrap items-center space-x-1 text-accent">
                    <a>{elm.category}</a>
                  </span>
                </div>

                <h2 className="mb-4 font-display text-xl text-jacarta-700 hover:text-accent dark:text-white dark:hover:text-accent sm:text-3xl">
                  <Link href={`/single-post/${elm.url}`}> {elm.heading}</Link>
                </h2>
                <div className="mb-8 dark:text-jacarta-200">{elm.content.length > 100 ? <div dangerouslySetInnerHTML={{ __html: elm.content.slice(0, 100) + '...' }}></div> : <div dangerouslySetInnerHTML={{ __html: elm.content }}></div>}</div>

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

        <div className="grid grid-cols-1 gap-[1.875rem] sm:grid-cols-2 md:grid-cols-3">
          {/* Posts */}
          {status == true ? <>
            <div className="text-center">
              <center><h3>Loading...</h3></center>
            </div>
          </>
            :
            blogcard.map((elm, i) => (
              <article key={i}>
                <div className="overflow-hidden rounded-2.5xl transition-shadow hover:shadow-lg">
                  <figure className="group overflow-hidden">
                    <Link href={`/single-post/${elm.url}`}>
                      <Image
                        width={370}
                        height={250}
                        src={`${config.IMG_URL}/${elm.img}`}
                        alt="post 2"
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
                      <span className="dark:text-jacarta-400">in</span>
                      <span className="inline-flex flex-wrap items-center space-x-1 text-accent">
                        {elm.category}
                      </span>
                    </div>

                    <h2 className="mb-4 font-display text-xl text-jacarta-700 hover:text-accent dark:text-white dark:hover:text-accent">
                      <Link href={`/single-post/${elm.url}`}> {elm.heading.slice(0,22)+"..."}</Link>
                    </h2>
                    <div className="mb-8 dark:text-jacarta-200 min-h-[40px] h-full">{elm.content.length > 100 ? <div dangerouslySetInnerHTML={{ __html: elm.content.slice(0, 70) + '...' }}></div> : <div dangerouslySetInnerHTML={{ __html: elm.content }}></div>}</div>

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

        {/* Load More */}
        {statuss?.length == 0 ? "" : <div className="mt-10 text-center">
          {/* <Link
            href="/blog"
            className="inline-block rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
          >
            Load More
          </Link> */}
          <button   className="inline-block rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark" onClick={() => getarticles()}>Load More</button>
        </div>}
      </div>
    </section>
  );
}
