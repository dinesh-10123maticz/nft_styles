"use client";

import { getarticle, getCmsContent } from "@/actions/axios/cms.axios";
import { CollectionByCreator, Getpromotedtoken, SearchAction, Token_List_Func, TopCreatorApi } from "@/actions/axios/nft.axios";
import Nftcard from "@/components/card/nftcard";
import Nodata from "@/components/common/NoData";
import { items2 } from "@/data/item";
import Image from "next/image";
import Link from "next/link";
import config from "../../../Config/config"
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import tippy from "tippy.js";

export default function Categories() {
  const [allItems, setAllItems] = useState(items2);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filtered, setFiltered] = useState(allItems);
const sortingOptions = [{key : "BLTH" ,  value : "Price Low to High" } , {key : "BHTL" ,  value : "Price High to Low" } , {key : "OLD" ,  value : "Oldest" } , {key : "LatestDrops" ,  value : "Recently Created" }];
  const [activeSort, setActiveSort] = useState(sortingOptions[0].value);
  const [onlyVarified, setOnlyVarified] = useState(false);
  const [onlyNFSW, setOnlyNFSW] = useState(false);
  const [onlyLazyMinted, setOnlyLazyMinted] = useState(false);
  const { Categorys } = useSelector((state) => state.LoginReducer);
  const [creatorstatus, setCreator] = useState(false);
  const [TopCreator, SetTopCreator] = useState([]);

  var LikeForwardRef = useRef();
  const [LikedTokenList, setLikedTokenList] = useState([]);




  const [HotAuctionData, SetHotAuction] = useState({
    All: [],
    tab: "All",
  });
  const [SaleData, SetSaleData] = useState({
    All: [],
  });
  const [category, setCategory] = useState("All");
  const [CreateCollectionState, SetCreateCollectionState] = useState({
    All: [],
    tab: "All",
  });
  const [hotactionstate, SetHotAuctionstate] = useState(true);
  
  const [hotsalestate, SetHotsalestate] = useState(true);
  const [val, Setval] = useState("");
  const [blogstate, setblogstate] = useState(false);
  const [Searchdata, SetSearch] = React.useState(null);
  const [filter, setFilter] = useState({
    auction: "Recent",
    collection: "new",
    sale: "LatestDrops",
  });
  var [filterview, setFilterview] = useState({
    auction: "Recently created",
    collection: "Recently created",
    sale: "Recently created",
  });
  var [promotedToken, setPromotedtoken] = useState({});

  useEffect(() => {
    getarticles();
    TopCreatorFunc();
    HotAuction(1, "All");
    HotSales("All");
    // Collectionlist('All')
    CollectionByCreate("All");

  }, []);
  useEffect(() => {
    tippy("[data-tippy-content]");
  }, []); 
   const CollectionByCreate = async (data) => {
    var SendDATA = {
      tab: data,
      limit: 4,
      ProfileUrl: "",
      page: 1,
      from: "home",
      filter: filter.collection,
    };
    let Resp = await CollectionByCreator(SendDATA);
    // console.log('fhgngfngf',Resp)
    SetCreateCollectionState({
      ...CreateCollectionState,
      ...{
        [data]: Resp?.data,
        tab: data,
        filter: filter.collection,
      },
    });
    setCategory(data);
  };
  const getarticles = async () => {
    setblogstate(false);
    var resp = await getarticle({ skip: 0, limit: 12 });
    if (resp?.status) {
      setBlog(resp?.data);
      setblogstate(true);
    }
  };
  const HotAuction = async (data, tabs) => {
    var SendDATA = {
      TabName: tabs,
      limit: 20,
      ProfileUrl: "",
      page: 1,
      from: "Auction",
      filter: filter.auction,
    };
    let Resp = await Token_List_Func(SendDATA);
    if (Resp?.success == "success") {
      SetHotAuction({
        ...HotAuctionData,
        ...{
          [tabs]: Resp?.data,
          tab: tabs,
          filter: filter.auction,
        },
      });
      SetHotAuctionstate(false);
    } else {
      SetHotAuction({
        ...HotAuctionData,
        ...{
          [tabs]: Resp?.data,
          tab: tabs,
          filter: filter.auction,
        },
      });
      SetHotAuctionstate(false);
    }
  };

  const TopCreatorFunc = async () => {
    var resp = await TopCreatorApi();
    console.log("topcreator", resp);
    if (resp?.data?.length > 20) {
      SetTopCreator(resp?.data.slice(0, 20));
      setCreator(true);
    } else {
      SetTopCreator(resp?.data);
      setCreator(true);
    }
  }; 
  const addLike = (id) => {
    const items = [...allItems];
    const item = items.filter((elm) => elm.id == id)[0];
    const indexToReplace = items.findIndex((item) => item.id === id);
    if (!item.liked) {
      item.liked = true;
      item.likes += 1;
      items[indexToReplace] = item;
      setAllItems(items);
    } else {
      item.liked = false;
      item.likes -= 1;
      items[indexToReplace] = item;
      setAllItems(items);
    }
  };
  useEffect(() => {
    let tempfiltered = [];
    if (activeCategory == "all") {
      tempfiltered = allItems;
    } else {
      tempfiltered = allItems.filter((elm) => elm.category == activeCategory);
    }
    if (activeSort == "Price: Low to High") {
      tempfiltered = [...tempfiltered.sort((a, b) => a.price - b.price)];
    }
    if (activeSort == "Price: High to Low") {
      tempfiltered = [...tempfiltered.sort((a, b) => b.price - a.price)];
    }
    if (onlyVarified) {
      tempfiltered = [...tempfiltered.filter((elm) => elm.varified)];
    }
    if (onlyNFSW) {
      tempfiltered = [...tempfiltered.filter((elm) => elm.NFSW)];
    }
    if (onlyLazyMinted) {
      tempfiltered = [...tempfiltered.filter((elm) => elm.LazyMinted)];
    }

    setFiltered(tempfiltered);
  }, [
    activeCategory,
    allItems,
    activeSort,
    onlyVarified,
    onlyNFSW,
    onlyLazyMinted,
  ]);

  const HotSales = async (tabs) => {
    var SendDATA = {
      TabName: tabs,
      limit: 8,
      ProfileUrl: "",
      page: 1,
      from: "Sale",
      filter: filter.sale,
    };
    let Resp = await Token_List_Func(SendDATA);
    console.log("hot sales", Resp, "tabs", tabs);
    if (Resp?.success == "success") {
      SetSaleData({
        ...SaleData,
        ...{
          [tabs]: Resp?.data,
          tab: tabs,
          filter: filter.sale,
        },
      });
      SetHotsalestate(false);
    } else {
      SetSaleData({
        ...SaleData,
        ...{
          [tabs]: Resp?.data,
          tab: tabs,
          filter: filter.sale,
        },
      });
      SetHotsalestate(false);
    }
  };

  function LikeList(data) {
    setLikedTokenList(data);
  }
  const Collectionlist = async (tabs) => {
    var SendDATA = {
      TabName: tabs,
      limit: 4,
      ProfileUrl: "",
      page: 1,
      from: "collection",
    };
    let Resp = await Token_List_Func(SendDATA);
    if (Resp?.success == "success")
      setCategory({
        ...SaleData,
        ...{
          [tabs]: Resp?.data,
          tab: tabs,
        },
      });
  };




  const OnChange = async (value) => {
    // console.log("vallllllllllll",value);
    if (value) {
      Setval(value);
      var Resp = await SearchAction({
        keyword: value,
        limit: 3,
        page: 1,
        from: "home",
      });
      // console.log("response", Resp);
      if (Resp?.success === "success") {
        SetSearch(Resp);
      } else {
        SetSearch(null);
      }
    } else {
      SetSearch(null);
      Setval("");
    }
  };



  useEffect(() => {
    // if(filter?.auction)
    if (
      HotAuctionData.filter !== undefined &&
      filter.auction !== HotAuctionData.filter
    ) {
      HotAuction("hi", HotAuctionData.tab);
    }
    if (SaleData.filter !== undefined && filter.sale !== SaleData.filter) {
      HotSales(SaleData.tab);
    }
    if (
      CreateCollectionState.filter !== undefined &&
      filter.collection !== CreateCollectionState.filter
    ) {
      CollectionByCreate(CreateCollectionState.tab);
    }
  }, [filter]);

  const AuctionFilter = (val, show) => {
    setFilter({ ...filter, ...{ auction: val } });
    setFilterview({ ...filterview, ...{ auction: show } });
  };

  const SaleFilter = (val, show) => {
    setActiveSort(show)
    setFilter({ ...filter, ...{ sale: val } });
    setFilterview({ ...filterview, ...{ sale: show } });
  };
  const CollectionFilter = (val, show) => {
    setFilter({ ...filter, ...{ collection: val } });
    setFilterview({ ...filterview, ...{ collection: show } });
  };
  const geturl = async (id) => {
    var progress;
    var retdata;

    do {
      var resp = await createImg({ id: id });
      progress = resp.data.progress;
      console.log(progress, resp);
    } while (Number(progress) != 100);

    return retdata;
  };

  useEffect(() => {
    const preventContextMenu = (event) => {
      event.preventDefault();
    };

    const images = document.querySelectorAll("img");

    images.forEach((image) => {
      image.addEventListener("contextmenu", preventContextMenu);
    });

    return () => {
      images.forEach((image) => {
        image.removeEventListener("contextmenu", preventContextMenu);
      });
    };
  }, []);
  return (
    <section className="py-24">
      <div className="container">
        <h2 className="mb-8 text-center font-display text-3xl text-jacarta-700 dark:text-white">
          <span
            className="mr-1 inline-block h-6 w-6 bg-contain bg-center text-xl"
            style={{
              backgroundImage:
                "url(https://cdn.jsdelivr.net/npm/emoji-datasource-apple@7.0.2/img/apple/64/26a1.png)",
            }}
          ></span>
          Trending NFTs
        </h2>
        <div className="mb-8 flex flex-wrap items-center justify-between">
          <ul className="flex flex-wrap items-center">
          <li className="my-1 mr-2.5">
              <div
                onClick={() => setActiveCategory("all")}
                className={`  ${
                  activeCategory == "all" ? "bg-jacarta-100" : "bg-white"
                }  ${
                  activeCategory == "all"
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
            {Categorys.slice(0,6).map((item, i) => (
              <li
                onClick={() => HotSales(item.label)}
                key={i}
                className="my-1 mr-2.5"
              >
                <div
                  className={`  ${
                    activeCategory == item.label ? "bg-jacarta-100" : "bg-white"
                  }  ${
                    activeCategory == item.label
                      ? " dark:bg-jacarta-700"
                      : "dark:bg-jacarta-900"
                  } cursor-pointer group flex h-9 items-center rounded-lg border border-jacarta-100  px-4 font-display text-sm font-semibold text-jacarta-500 transition-colors hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600  dark:text-white dark:hover:border-transparent dark:hover:bg-accent dark:hover:text-white`}
                >
                   <img src={config.IMG_URL+"/category/"+item.image} className="w-[25px] h-[25px] rounded-[50%] p-[2px] object-cover"/>
                  <span className="ml-2">{item.label}</span>
                </div>
              </li>
            ))}




          </ul>
          <div className="dropdown my-1 cursor-pointer">
            <div
              className="dropdown-toggle inline-flex w-48 items-center justify-between rounded-lg border border-jacarta-100 bg-white py-2 px-3 text-sm dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white"
              role="button"
              id="categoriesSort"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="font-display">{activeSort}</span>
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
              className="dropdown-menu z-10 hidden min-w-[220px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
              aria-labelledby="categoriesSort"
            >
              <span className="block px-5 py-2 font-display text-sm font-semibold text-jacarta-300">
                Sort By
              </span>
              {sortingOptions.map((elm, i) => (
             
            //  Object.entries(elm).map(([key, value]) => (
            

                <button
                  onClick={() => SaleFilter(elm.key , elm.value)}
                  key={i}
                  className={
                    activeSort === elm.value
                      ? "dropdown-item flex w-full items-center justify-between rounded-xl px-5 py-2 text-left font-display text-sm text-jacarta-700 transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                      : "dropdown-item flex w-full items-center justify-between rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                  }
                >


            
          
                 
                  {/* {activeSort === elm.key && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="mb-[3px] h-4 w-4 fill-accent"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" />
                    </svg>
                  )} */}
                  {elm.value}
                </button>
            
            
            )
            
            )
            
            }
              {/* <span className="block px-5 py-2 font-display text-sm font-semibold text-jacarta-300">
                Options
              </span> */}
              {/* <div className="dropdown-item block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                <span className="flex items-center justify-between">
                  <span>Verified Only</span>
                  <input
                    type="checkbox"
                    name="check"
                    checked={onlyVarified}
                    onChange={(e) => {
                      setOnlyVarified((pre) => !pre);
                    }}
                    className="relative h-4 w-7 cursor-pointer appearance-none rounded-lg border-none bg-jacarta-100 shadow-none after:absolute after:top-0.5 after:left-0.5 after:h-3 after:w-3 after:rounded-full after:bg-jacarta-400 after:transition-all checked:bg-accent checked:bg-none checked:after:left-3.5 checked:after:bg-white checked:hover:bg-accent focus:ring-transparent focus:ring-offset-0 checked:focus:bg-accent"
                  />
                </span>
              </div>
              <div className="dropdown-item block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                <span className="flex items-center justify-between">
                  <span>NFSW Only</span>
                  <input
                    type="checkbox"
                    checked={onlyNFSW}
                    onChange={(e) => {
                      setOnlyNFSW((pre) => !pre);
                    }}
                    name="check"
                    className="relative h-4 w-7 cursor-pointer appearance-none rounded-lg border-none bg-jacarta-100 shadow-none after:absolute after:top-0.5 after:left-0.5 after:h-3 after:w-3 after:rounded-full after:bg-jacarta-400 after:transition-all checked:bg-accent checked:bg-none checked:after:left-3.5 checked:after:bg-white checked:hover:bg-accent focus:ring-transparent focus:ring-offset-0 checked:focus:bg-accent"
                  />
                </span>
              </div>
              <div className="dropdown-item block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                <span className="flex items-center justify-between">
                  <span>Show Lazy Minted</span>
                  <input
                    type="checkbox"
                    checked={onlyLazyMinted}
                    onChange={(e) => {
                      setOnlyLazyMinted((pre) => !pre);
                    }}
                    name="check"
                    className="relative h-4 w-7 cursor-pointer appearance-none rounded-lg border-none bg-jacarta-100 shadow-none after:absolute after:top-0.5 after:left-0.5 after:h-3 after:w-3 after:rounded-full after:bg-jacarta-400 after:transition-all checked:bg-accent checked:bg-none checked:after:left-3.5 checked:after:bg-white checked:hover:bg-accent focus:ring-transparent focus:ring-offset-0 checked:focus:bg-accent"
                  />
                </span>
              </div> */}
            </div>
          </div>
        </div>

        <div className={SaleData[SaleData.tab]?.length > 0 ? "grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4" : "w-full" }>
          {   hotsalestate == true ? (
                <>
                  <div className="text-center">
                    <h3>Loading...</h3>
                    {/* {/   <div className="pTag" >Come back soon ! or try to browse something for you on our marketplace</div> /} */}
                    {/*   <div className="pTag" >Nothing for ReSale at this time</div> */}
                    <div className="load-more">
                      {/* <Link to='/'><Button type="type" className="btn-load browse_marketplace" disableRipple>Browse Marketplace</Button></Link> */}
                    </div>
                  </div>
                </>
              )  : 
              SaleData[SaleData.tab]?.length > 0 ?  SaleData[SaleData.tab]?.slice(0, 20).map((item, index) => (
                        <article key={index}>
              <Nftcard 
              product={item}
              type="marketplace"
              index={index}
              LikeList={LikeList}
              LikedTokenList={LikedTokenList}
              setLikedTokenList={setLikedTokenList}
              LikeForwardRef={LikeForwardRef}
              />
              </article>
             ))
        :(
          <Nodata />
        )
        }
        </div>
      </div>
    </section>
  );
}
