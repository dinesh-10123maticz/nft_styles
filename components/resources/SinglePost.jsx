/* eslint-disable react/no-unescaped-entities */
"use client"
import { Sociallinks, getarticle, getrelatedpostarticle } from "@/actions/axios/cmsAxios";
import { allBlogs, blogs2 } from "@/data/blogs";
import { socialLinks, socials2 } from "@/data/resources";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import config from '../../Config/config'

export default function SinglePost({ id }) {
  console.log("itemss11", id)
  const [blog, setblog] = useState()
  const [status, setStatus] = useState(false)
  console.log("blogblog", blog)
  const [blogcard, setblogcard] = useState([])
  const [link, setLink] = useState([]);

  useEffect(() => {
    fetchbloginformation(id)
    getRelatedpostarticles(id)
    Getlink()
  }, [])
  async function fetchbloginformation(id) {
    let info = await getarticle({ url: id })
    console.log("sdjdjdjdjdjd", info)
    setblog(info?.data)
    setStatus(true)

  }

  const Getlink = async () => {

    let link_res = await Sociallinks();
    console.log("linkss", link_res?.msg);
    setLink(link_res?.msg ?? [])
  }
  const getRelatedpostarticles = async (data) => {
    // var address = { skip, limit }
    var resp = await getrelatedpostarticle({ url: id });
    console.log("articleaaa", resp);
    if (resp.status) {
      // setblogcard(resp.data)
      // setblogcardss(resp.data)

      resp?.data?.length != 0 && setblogcard([...blogcard, ...resp.data])
    }
    else {
      setStatus(resp.status)
    }
  }
  const item = allBlogs.filter((elm) => elm.url == id)[0] || allBlogs[0];
  // console.log("itemss",item)
  return (
    <section className="relative py-16 md:py-24">
      {
        status == false ? <>
          <div className="text-center">
            <center><h3>Loading...</h3></center>
          </div>
        </> : <>
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
            <header className="mx-auto mb-16 max-w-lg text-center">
              <div className="mb-3 inline-flex flex-wrap items-center space-x-1 text-xs">
                <span className="inline-flex flex-wrap items-center space-x-1 text-accent">
                  <a href="#">NFT's</a>
                  <a href="#">DIGITAL ART</a>
                </span>
              </div>

              <h1 className="mb-4 font-display text-2xl text-jacarta-700 dark:text-white sm:text-5xl">
                {blog?.heading}
              </h1>

              {/* Author */}
              <div className="inline-flex items-center">
                {/* <Image
                  width={40}
                  height={40}
                  // src="/img/blog/author.jpg"
                  src={`${config.IMG_URL}/${blog?.img}`}
                  alt="author"
                  className="mr-4 h-10 w-10 shrink-0 rounded-full"
                /> */}

                <div className="text-left">
                  <span className="text-2xs font-medium tracking-tight text-jacarta-700 dark:text-jacarta-200">
                    {blog?.writer}
                  </span>

                  {/* Date / Time */}
                  <div className="flex flex-wrap items-center space-x-2 text-sm text-jacarta-400">
                    <span>
                      <time>{blog?.date && `${new Date(blog?.date).toLocaleString("default", { month: "long" })} ${new Date(blog?.date).getDate()}, ${new Date(blog?.date).getFullYear()}`}</time>
                    </span>
                    <span>•</span>
                    <span>3 min read</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Featured image */}
            <figure className="mb-16">
              <Image
                width={1170}
                height={678}
                // item.imgSrc ? item.imgSrc : "/img/blog/single_post_featured.jpg"

                src={
                  `${config.IMG_URL}/${blog?.img}`
                }
                alt="post 1"
                className="w-full rounded-2.5xl"
              />
            </figure>

            {/* Article */}
            <article className="mb-12">
              {/* Content */}
              <div className="article-content">
                <div className="text-lg leading-normal">
                  {/* Since we launched Tezos at the end of 2021, many awesome creator.
              From a barely understood abbreviation (hello, right click
              savers!), it turned into a massive cultural phenomenon adopted by
              blue chip companies like Adidas and Twitter in a few short months.
            </div>
              <div className="pTag" >
              Just like the NFT space has grown, so has Rarible.com. What
              started with a few people in a café grew into a passionate team of
              over 100, and counting!
            </div>
              <div className="pTag" >
              And that team has been busy. In 2021, we've shipped more features
              than ever before, scaled to a multi-chain platform with Flow and
              Tezos integrations, and watched our community soar on every social
              media channel.
            </div>
            
            

              And of course, we couldn't have done it without you! You are
              creating Rarible day by day - by using the platform, requesting
              features, sharing your feedback, being as active and passionate as
              you are.
            </div>
            <h2 className="text-xl">A Picture is Worth a Thousand Words</h2>
              <div className="pTag" >
              Ut perspiciatis, unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam eaque ipsa,
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt, explicabo. Donec quam felis, ultricies nec,
              pellentesque eu, pretium quis, sem. */}
                <div dangerouslySetInnerHTML={{ __html: blog?.content }}></div>

                </div>

                {/* <div className="article-content-wide my-12 grid grid-cols-1 gap-[1.875rem] sm:grid-cols-2">
              <Image
                width={570}
                height={403}
                src="/img/blog/gallery_1.jpg"
                alt="gallery 1"
                className="rounded-2lg"
              />
              <Image
                width={570}
                height={403}
                src="/img/blog/gallery_2.jpg"
                alt="gallery 2"
                className="rounded-2lg"
              />
            </div> */}
                {/*   <div className="pTag" >
              Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
              aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
              imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
              mollis pretium. Integer tincidunt. Lorem ipsum dolor sit amet,
              consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
              Aenean massa. Cum sociis Theme natoque penatibus et magnis dis
              parturient montes, nascetur ridiculus mus. Aenean imperdiet. Etiam
              ultricies. Ut enim.
            </div>
            <blockquote className="!my-10 text-xl italic text-jacarta-700 dark:text-white">
              “Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut
              libero venenatis faucibus. Nullam quis.”
              <cite className="mt-3 block text-2xs not-italic tracking-tight text-jacarta-400">
                — Vincent De Paul
              </cite>
            </blockquote>
              <div className="pTag" >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Cum sociis Theme natoque penatibus et magnis dis parturient
              montes, nascetur ridiculus mus. Aenean imperdiet. Etiam ultricies.
              Ut enim.
            </div> */}
              </div>
            </article>

            <div className="mx-auto max-w-[48.125rem]">
              {/* Share */}
              <div className="mb-16 flex items-center">
                <span className="mr-4 text-sm font-bold dark:text-jacarta-300">
                  Share:
                </span>
                <div className="flex space-x-2">
                  {link.map((elm, i) => (
                    <a
                      key={i}
                      href={elm.link}
                      className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-accent" target="blank"
                    >
                      {/* <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="facebook"
                    className="h-4 w-4 fill-jacarta-400 transition-colors group-hover:fill-white dark:group-hover:fill-white"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d={elm.svgPath}></path>
                  </svg> */}
                      <Image
                        width={370}
                        height={250}
                        src={`${config.IMG_URL}/socialimg/${elm?.img}`}
                        alt="post 2"
                        className="w-[20px] h-[20px] object-cover "
                      />
                    </a>
                  ))}
                </div>
              </div>

              {/* Author */}
              {/* <div className="mb-16 flex rounded-2.5xl border border-jacarta-100 bg-white p-8 dark:border-jacarta-600 dark:bg-jacarta-700">
            <Image
              width={144}
              height={144}
              src="/img/blog/author_large.jpg"
              alt="author"
              className="mr-4 h-16 w-16 shrink-0 self-start rounded-lg md:mr-8 md:h-[9rem] md:w-[9rem]"
            />
            <div>
              <span className="mb-3 mt-2 block font-display text-base text-jacarta-700 dark:text-white">
                ib-themes
              </span>
              <div className="mb-4 dark:text-jacarta-300">
                Aenean commodo ligula eget dolor. Aenean massa. Cum sociis Theme
                natoque penatibus et magnis dis parturient montes.
              </div>
              <div className="flex space-x-5">
                {socials2.map((elm, i) => (
                  <a key={i} href={elm.href} className="group">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon={elm.icon}
                      className="h-4 w-4 fill-jacarta-400 group-hover:fill-accent dark:group-hover:fill-white"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox={
                        elm.icon == "discord" ? "0 0 640 512" : "0 0 512 512"
                      }
                    >
                      <path d={elm.svgPath}></path>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div> */}

              {/* Related */}
              <h2 className="mb-8 font-display text-3xl text-jacarta-700 dark:text-white">
                Related Posts
              </h2>
              <div className="grid grid-cols-1 gap-[1.875rem] sm:grid-cols-2">
                {/* Posts */}
                {blogcard.slice(0, 2).map((elm, i) => (
                  <article key={i}>
                    <div className="overflow-hidden rounded-2.5xl transition-shadow hover:shadow-lg">
                      <figure className="group overflow-hidden">
                        <Link href={`/single-post/${elm.url}`}>
                          <Image
                            width={370}
                            height={250}
                            // src={elm.imgSrc}
                            src={`${config.IMG_URL}/${elm?.img}`}
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
                          <span className="dark:text-jacarta-400">in</span>
                          <span className="inline-flex flex-wrap items-center space-x-1 text-accent">
                            {elm.category}
                          </span>
                        </div>

                        <h2 className="mb-4 font-display text-xl text-jacarta-700 hover:text-accent dark:text-white dark:hover:text-accent">
                          <Link href={`/single-post/${elm.url}`}> {elm.heading}</Link>
                        </h2>
                        <div className="mb-8 dark:text-jacarta-200">{elm.content.length > 100 ? <div dangerouslySetInnerHTML={{ __html: elm.content.slice(0, 100) + '...' }}></div> : <div dangerouslySetInnerHTML={{ __html: elm.content }}></div>}</div>

                        {/* Date / Time */}
                        <div className="flex flex-wrap items-center space-x-2 text-sm text-jacarta-400">
                          <span>
                            <time>{elm?.date && `${new Date(elm?.date).toLocaleString("default", { month: "long" })} ${new Date(elm?.date).getDate()}, ${new Date(elm?.date).getFullYear()}`}</time>
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
            {/* end related */}
          </div>
        </>}

    </section>
  );
}
