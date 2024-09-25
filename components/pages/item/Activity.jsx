"use client";
import Image from "next/image";
import { timeAgo } from "@/actions/common";
import Nodata from "@/components/common/NoData";
// import { activity } from "@/data/itemDetails";
import Link from "next/link";
import { useEffect, useState } from "react";

export const activity = [
  {
    id: 1,
    action: "bid",
    currency: "ETH",
    amount: "30 ETH",
    user: "AD496A",
    token: "Polymorph: MORPH Token",
    timeAgo: "19 days ago",
    svgPath: `M14 20v2H2v-2h12zM14.586.686l7.778 7.778L20.95 9.88l-1.06-.354L17.413 12l5.657 5.657-1.414 1.414L16 13.414l-2.404 2.404.283 1.132-1.415 1.414-7.778-7.778 1.415-1.414 1.13.282 6.294-6.293-.353-1.06L14.586.686zm.707 3.536l-7.071 7.07 3.535 3.536 7.071-7.07-3.535-3.536z`,
  },
  {
    id: 2,
    action: "transfer",
    currency: "ETH",
    amount: ".00510 ETH",
    user: "The_vikk",
    token: "Polymorph: MORPH Token",
    timeAgo: "16 days ago",
    svgPath: `M16.05 12.05L21 17l-4.95 4.95-1.414-1.414 2.536-2.537L4 18v-2h13.172l-2.536-2.536 1.414-1.414zm-8.1-10l1.414 1.414L6.828 6 20 6v2H6.828l2.536 2.536L7.95 11.95 3 7l4.95-4.95z`,
  },
  {
    id: 3,
    action: "putonsale",
    currency: "ETH",
    amount: "1.50 ETH",
    user: "CryptoGuysNFT",
    token: "Polymorph: MORPH Token",
    timeAgo: "19 days ago",
    svgPath: `M6.5 2h11a1 1 0 0 1 .8.4L21 6v15a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6l2.7-3.6a1 1 0 0 1 .8-.4zM19 8H5v12h14V8zm-.5-2L17 4H7L5.5 6h13zM9 10v2a3 3 0 0 0 6 0v-2h2v2a5 5 0 0 1-10 0v-2h2z`,
  },
];
const Bid = `M14 20v2H2v-2h12zM14.586.686l7.778 7.778L20.95 9.88l-1.06-.354L17.413 12l5.657 5.657-1.414 1.414L16 13.414l-2.404 2.404.283 1.132-1.415 1.414-7.778-7.778 1.415-1.414 1.13.282 6.294-6.293-.353-1.06L14.586.686zm.707 3.536l-7.071 7.07 3.535 3.536 7.071-7.07-3.535-3.536z`
const sale  = `M6.5 2h11a1 1 0 0 1 .8.4L21 6v15a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6l2.7-3.6a1 1 0 0 1 .8-.4zM19 8H5v12h14V8zm-.5-2L17 4H7L5.5 6h13zM9 10v2a3 3 0 0 0 6 0v-2h2v2a5 5 0 0 1-10 0v-2h2z`
const Transfer = `M16.05 12.05L21 17l-4.95 4.95-1.414-1.414 2.536-2.537L4 18v-2h13.172l-2.536-2.536 1.414-1.414zm-8.1-10l1.414 1.414L6.828 6 20 6v2H6.828l2.536 2.536L7.95 11.95 3 7l4.95-4.95z`
export default function Activity({data}) {
  console.log("itemaxxttivity" , data)
  const [filterAction, setfilterAction] = useState(null);
  const [filteredItems, setFilteredItems] = useState(activity);
  useEffect(() => {
    if (filterAction) {
      setFilteredItems(data.filter((elm) => elm.Activity?.toLowerCase() == filterAction?.toLowerCase()));
    } else {
      setFilteredItems(data);
    }
  }, [filterAction , data]);

  return (
    <>
      <div className=" border border-b-0 border-jacarta-100 bg-light-base px-4 pt-5 pb-2.5 dark:border-jacarta-600 dark:bg-jacarta-700">
        <div className="flex flex-wrap">
          <button
            onClick={() => setfilterAction()}
            className={
              !filterAction
                ? "mr-2.5 mb-2.5 inline-flex items-center rounded-xl border border-transparent bg-accent px-4 py-3 hover:bg-accent-dark dark:hover:bg-accent-dark fill-white"
                : "group mr-2.5 mb-2.5 inline-flex items-center rounded-xl border border-jacarta-100 bg-white px-4 py-3 hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:border-transparent dark:hover:bg-accent hover:fill-white dark:fill-white "
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className={`mr-2 h-4 w-4 `}
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M10.9 2.1l9.899 1.415 1.414 9.9-9.192 9.192a1 1 0 0 1-1.414 0l-9.9-9.9a1 1 0 0 1 0-1.414L10.9 2.1zm.707 2.122L3.828 12l8.486 8.485 7.778-7.778-1.06-7.425-7.425-1.06zm2.12 6.364a2 2 0 1 1 2.83-2.829 2 2 0 0 1-2.83 2.829z"></path>
            </svg>
            <span
              className={`text-2xs font-medium ${
                !filterAction ? "text-white" : ""
              } `}
            >
              Listing
            </span>
          </button>

          {activity.map((elm, i) => (
            <button
              key={i}
              onClick={() => setfilterAction(elm?.action?.toLowerCase())}
              className={
                filterAction == elm.action
                  ? "mr-2.5 mb-2.5 inline-flex items-center rounded-xl border border-transparent bg-accent px-4 py-3 hover:bg-accent-dark dark:hover:bg-accent-dark fill-white"
                  : "group mr-2.5 mb-2.5 inline-flex items-center rounded-xl border border-jacarta-100 bg-white px-4 py-3 hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:border-transparent dark:hover:bg-accent hover:fill-white dark:fill-white "
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className={`mr-2 h-4 w-4  `}
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d={elm.svgPath}></path>
              </svg>
              <span
                className={`text-2xs font-medium ${
                  filterAction == elm.action ? "text-white" : ""
                } `}
              >
                {elm.action}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        role="table"
        className="scrollbar-custom max-h-72 w-full overflow-y-auto rounded-lg rounded-tl-none border border-jacarta-100 bg-white text-sm dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white"
      >
        <div
          className="sticky top-0 flex bg-light-base dark:bg-jacarta-600"
          role="row"
        >
          <div className="w-[17%] py-2 px-4" role="columnheader">
            <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
              Event
            </span>
          </div>
          <div className="w-[17%] py-2 px-4" role="columnheader">
            <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
              Price
            </span>
          </div>
          <div className="w-[22%] py-2 px-4" role="columnheader">
            <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
              From
            </span>
          </div>
          <div className="w-[22%] py-2 px-4" role="columnheader">
            <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
              To
            </span>
          </div>
          <div className="w-[22%] py-2 px-4" role="columnheader">
            <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
              Date
            </span>
          </div>
        </div>
        {filteredItems.length > 0 ?
         filteredItems.map((elm, i) => (
          <div key={i} className="flex" role="row">
            {console.log('amxiac' , elm)}
            <div
              className="flex w-[17%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
              role="cell"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-2 h-4 w-4 fill-jacarta-700 group-hover:fill-white dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d={elm.svgPath}></path>
              </svg>
              {elm.Activity}
            </div>
            <div
              className="flex w-[17%] items-center whitespace-nowrap border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
              role="cell"
            >
              <span className="-ml-1" data-tippy-content={elm.CoinName}>
       
                 <Image
                width={138}
                height={138}
                src="/img/chains/Sol_small.png"
                alt="Sol"
                className=" border-[5px] w-[30px]"
              />
              </span>
              <span className="text-sm font-medium tracking-tight text-green">
                {elm.NFTPrice}
              </span>
            </div>
            <div
              className="flex w-[22%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
              role="cell"
            >
             { elm.From === "NullAddress" ? 
              elm.From 
             :<Link href={`/user/${elm.From_CustomUrl}`} className="text-accent">
                {elm?.From?.slice(0, 10)}...
              </Link>}
            </div>
            <div
              className="flex w-[22%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
              role="cell"
            >
              <Link href={`/user/${elm.To_CustomUrl}`} className="text-accent">
                {elm.To?.slice(0, 10)}...
              </Link>
            </div>
            <div
              className="flex w-[22%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
              role="cell"
            >
              {/* <a
                href="#"
                className="flex flex-wrap items-center text-accent"
                target="_blank"
                rel="nofollow noopener"
                title="Opens in a new window"
                data-tippy-content="March 13 2022, 2:32 pm"
              > */}
                <span className="mr-1">{timeAgo(elm.updatedAt)}</span>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="h-4 w-4 fill-current"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z" />
                </svg> */}
              {/* </a> */}
            </div>
          </div>
        )) : <><Nodata /></>}
      </div>
    </>
  );
}
