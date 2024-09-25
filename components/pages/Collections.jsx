"use client";
import { collections3 } from "@/data/collections";
import { items2 } from "@/data/item";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

//npm
import { useSelector } from "react-redux";

//files
import Nftcard from "../card/nftcard";
import NoData from "../common/NoData";
import Loading from "../common/Loading";
import config from "@/Config/config"

//functions
import { Token_List_Func } from "@/actions/axios/nft.axios";

const categories = [
  {
    id: 1,
    name: "Art",
    icon: "M12 2c5.522 0 10 3.978 10 8.889a5.558 5.558 0 0 1-5.556 5.555h-1.966c-.922 0-1.667.745-1.667 1.667 0 .422.167.811.422 1.1.267.3.434.689.434 1.122C13.667 21.256 12.9 22 12 22 6.478 22 2 17.522 2 12S6.478 2 12 2zm-1.189 16.111a3.664 3.664 0 0 1 3.667-3.667h1.966A3.558 3.558 0 0 0 20 10.89C20 7.139 16.468 4 12 4a8 8 0 0 0-.676 15.972 3.648 3.648 0 0 1-.513-1.86z",
  },
  {
    id: 2,
    name: "Collectibles",
    icon: "M2 4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v5.5a2.5 2.5 0 1 0 0 5V20a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4zm6.085 15a1.5 1.5 0 0 1 2.83 0H20v-2.968a4.5 4.5 0 0 1 0-8.064V5h-9.085a1.5 1.5 0 0 1-2.83 0H4v14h4.085zM9.5 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z",
  },
  {
    id: 3,
    name: "Domain",
    icon: "M5 15v4h4v2H3v-6h2zm16 0v6h-6v-2h4v-4h2zm-8.001-9l4.4 11h-2.155l-1.201-3h-4.09l-1.199 3H6.6l4.399-11h2zm-1 2.885L10.752 12h2.492l-1.245-3.115zM9 3v2H5v4H3V3h6zm12 0v6h-2V5h-4V3h6z",
  },
  { id: 4, name: "Music", icon: "M12 13.535V3h8v3h-6v11a4 4 0 1 1-2-3.465z" },
  {
    id: 5,
    name: "Photography",
    icon: "M2 6c0-.552.455-1 .992-1h18.016c.548 0 .992.445.992 1v14c0 .552-.455 1-.992 1H2.992A.994.994 0 0 1 2 20V6zm2 1v12h16V7H4zm10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2a5 5 0 1 1 0-10 5 5 0 0 1 0 10zM4 2h6v2H4V2z",
  },
  {
    id: 6,
    name: "Virtual World",
    icon: "M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.008 8.008 0 0 0 5.648 6.667zM10.03 13c.151 2.439.848 4.73 1.97 6.752A15.905 15.905 0 0 0 13.97 13h-3.94zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.008 8.008 0 0 0 19.938 13zM4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333 8.008 8.008 0 0 0 4.062 11zm5.969 0h3.938A15.905 15.905 0 0 0 12 4.248 15.905 15.905 0 0 0 10.03 11zm4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.008 8.008 0 0 0-5.648-6.667z",
  },
];

const sortingOptions = [
  { value: "recentlisted", label: "Recently Listed" },
  { value: "recentcreated", label: "Recently Created" },
  { value: "recentsold", label: "Recently Sold" },
  { value: "PriceHighToLow", label: "High to Low" },
  { value: "PriceLowToHigh", label: "Low to High" },
  { value: "oldest", label: "Oldest" },
];
export default function Collections({ params }) {
  const { category } = params;
  console.log("🚀 ~ Collections ~ params:", params)
  
  const [currentSorting, setCurrentSorting] = useState(sortingOptions[0]);
  const userData = useSelector((state)=>state.LoginReducer.User.payload)
  const [TabName, SetTabName] = useState(category ?? "All");
  const [filtered, setFiltered] = useState(items2);
  const categories = useSelector((state) => state.LoginReducer.Categorys);
  const [LikedTokenList, setLikedTokenList] = useState([]);
  const [filter, setFilter] = useState(sortingOptions[1]?.value);
  var [filtershow, setFiltershow] = useState(sortingOptions[1]?.label);
  var LikeForwardRef = useRef();
  const [Tokens, SetTokens] = useState({
    All: { loader: true, page: 1, list: [] },
  });
  const [loadingstate, setLoadingstate] = useState(false);

  useEffect(() => {
    let tempfiltered = [];
    if (TabName == "All") {
      tempfiltered = items2;
    } else {
      tempfiltered = items2.filter((elm) => elm.category == TabName);
    }
    setFiltered(tempfiltered);
  }, [TabName]);

  useEffect(() => {
    if (
      typeof Tokens[TabName] == "undefined" ||
      Tokens[TabName].filter !== filter
    ) {
      Tokens[TabName] = { page: 1, list: [], loader: false };
      SetTokens(Tokens);
      Explore(1, TabName);
    }
  }, [TabName, filter]);

  const Explore = async (data, tab) => {
    setLoadingstate(true);

    var page = data ? data : Tokens[TabName]?.page;
    var SendDATA = {
      TabName: tab ? tab : TabName,
      limit: 12,
      ProfileUrl: userData?.ProfileUrl ? userData.ProfileUrl : "",
      page: page ?? 1,
      from: "Explore",
      filter: filter,
    };
    let Resp = await Token_List_Func(SendDATA);
    console.log("Check datad", Resp);
    if (Resp?.data) {
      SetTokens({
        ...Tokens,
        ...{
          [TabName]: {
            list: [...Tokens[TabName].list, ...Resp.data],

            loader:
              Resp.data.length == 0 ||
              (SendDATA.TabName == "usercollection" && Resp.cursor == null)
                ? false
                : true,
            page: Tokens[TabName].page,
            filter: filter,
          },
        },
      });
      setLoadingstate(false);
    } else
      SetTokens({
        ...Tokens,
        ...{
          [TabName]: {
            list: Tokens[TabName].list,
            loader: false,
            page: Tokens[TabName].page,
            filter: filter,
          },
        },
      });
    setLoadingstate(false);
  };
  const LoadMore = () => {
    let token = Tokens
    token[TabName].page = token[TabName].page + 1;
    SetTokens(token);
    Explore(token[TabName].page);
  };
  function LikeList(data) {
    setLikedTokenList(data);
  }

  return (
    <section className="relative py-24">
      <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
        <Image
          width={1920}
          height={789}
          priority
          src="/img/gradient_light.jpg"
          alt="gradient"
          className="h-full w-full"
        />
      </picture>
      <div className="container">
        <h1 className="py-16 text-center font-display text-4xl font-medium text-jacarta-700 dark:text-white">
          Explore
        </h1>

        <div className="mb-8 flex flex-wrap items-center justify-between">
          <ul className="flex flex-wrap items-center">
          <li className="my-1 mr-2.5">
              <div
                onClick={() => SetTabName("All")}
                className={`  ${
                  TabName == "All" ? "bg-jacarta-100" : "bg-white"
                }  ${
                  TabName == "All"
                    ? " dark:bg-jacarta-700"
                    : "dark:bg-jacarta-900"
                } cursor-pointer group flex h-9 items-center rounded-lg border border-jacarta-100  px-4 font-display text-sm font-semibold text-jacarta-500 transition-colors hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600  dark:text-white dark:hover:border-transparent dark:hover:bg-accent dark:hover:text-white`}
              >
                 <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-[20px] w-[20px] fill-current text-black dark:text-white ml-[5px] mr-[7px]"
                style={{ fill: "currentColor" }}
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d={"M22 12.999V20a1 1 0 0 1-1 1h-8v-8.001h9zm-11 0V21H3a1 1 0 0 1-1-1v-7.001h9zM11 3v7.999H2V4a1 1 0 0 1 1-1h8zm10 0a1 1 0 0 1 1 1v6.999h-9V3h8z"}
                />
              </svg>{"   "}
                All
              </div>
            </li>
            {categories.map((elm, i) => (
              <li
                onClick={() => SetTabName(elm.value)}
                key={i}
                className="my-1 mr-2.5"
              >
                <div
                  className={`  ${
                    TabName == elm.value ? "bg-jacarta-100" : "bg-white"
                  }  ${
                    TabName == elm.value
                      ? " dark:bg-jacarta-700"
                      : "dark:bg-jacarta-900"
                  } cursor-pointer group flex h-9 items-center rounded-lg border border-jacarta-100  px-4 font-display text-sm font-semibold text-jacarta-500 transition-colors hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600  dark:text-white dark:hover:border-transparent dark:hover:bg-accent dark:hover:text-white`}
                >
                                 <img src={config.IMG_URL+"/category/"+elm?.image} className="w-[25px] h-[25px] rounded-[50%] p-[2px] mr-[5px] object-cover"/>
                  <span>{elm.value}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="dropdown relative my-1 cursor-pointer">
            <div
              className="dropdown-toggle inline-flex w-48 items-center justify-between rounded-lg border border-jacarta-100 bg-white py-2 px-3 text-sm dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white"
              role="button"
              id="categoriesSort"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="font-display">{filtershow}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-4 w-4 fill-jacarta-500 dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
              </svg>
            </div>

            <div
              className="dropdown-menu z-10 hidden w-full whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
              aria-labelledby="categoriesSort"
            >
              {" "}
              {sortingOptions.map((elm, i) => (
                <button
                  onClick={() => {
                    setFilter(elm?.value);
                    setFiltershow(elm?.label);
                  }}
                  key={i}
                  className="dropdown-item flex w-full items-center justify-between rounded-xl px-5 py-2 text-left font-display text-sm text-jacarta-700 transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                >
                  {elm.label}
                  {filter == elm?.value && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="h-4 w-4 fill-accent"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={TabName && Tokens[TabName]?.list.length > 0 ? "grid grid-cols-1 gap-[1.875rem] md:grid-cols-3 lg:grid-cols-4" : "w-full"}>
          {loadingstate == true ? (
            <Loading />
          ) : TabName && Tokens[TabName]?.list.length > 0 ? (
            Tokens[TabName]?.list.map((item, index) => (
              <article key={index}>
                <Nftcard
                
                  product={item}
                  index={index}
                  LikeList={LikeList}
                  LikedTokenList={LikedTokenList}
                  setLikedTokenList={setLikedTokenList}
                  LikeForwardRef={LikeForwardRef}
                  datas={items2[index]}
                />
              </article>
            ))
          ) : (
            <NoData />
          )}
          {/* {filtered.map((elm, i) => (
             <article key={i}>
            <Nftcard datas={elm} index={i}/>
            </article>
          ))} */}
        </div>
        <div class="mt-8 flex items-center justify-center">
          {Tokens[TabName]?.loader &&
          (<button
            class="w-40 rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
            onClick={LoadMore}
          >
            Load More
          </button>)}
        </div>
      </div>
    </section>
  );
}
