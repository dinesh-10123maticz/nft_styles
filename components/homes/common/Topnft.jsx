"use client";
import { useEffect, useRef, useState } from "react";
import { items2 } from "@/data/item";
import { collections } from "@/data/collections";
import tippy from "tippy.js";
import Image from "next/image";
import Link from "next/link";
import Nftcard from "@/components/card/nftcard";
import { useSelector } from "react-redux";
import { getarticle, getCmsContent, getnftarticle } from "@/actions/axios/cms.axios";
import { CollectionByCreator, Getpromotedtoken, Token_List_Func, TopCreatorApi } from "@/actions/axios/nft.axios";
import Nodata from "@/components/common/NoData";
const labels = ["Last 24 Hours", "Last 7 Days", "Last 30 Days"];
export default function Topnft() {

  const [hotactionstate, SetHotAuctionstate] = useState(true);

  const [hotsalestate, SetHotsalestate] = useState(true);

  const { Categorys } = useSelector((state) => state.LoginReducer);
  const payload = useSelector((state) => state.LoginReducer.AccountDetails);

  const [activeLabel, setActiveLabel] = useState(labels[0]);
  useEffect(() => {
    tippy("[data-tippy-content]");
  }, []);
  const [allItems, setAllItems] = useState(items2);

  var renderer = ({
    days,
    Month,
    Year,
    hours,
    minutes,
    seconds,
    completed,
  }) => {
    if (completed) {
      return <span>Waiting for Owner To Accept</span>;
    } else {
      return (
        <span>
          {" "}
          <span className="hourds">{formatTime(days)} d</span>{" "}
          <span className="semicolan">:</span>{" "}
          <span className="hourds">{formatTime(hours)} h</span>{" "}
          <span className="semicolan">:</span>{" "}
          <span className="hourds">{formatTime(minutes)} m</span>{" "}
          <span className="semicolan">:</span>{" "}
          <span className="hourds">{formatTime(seconds)} s</span>{" "}
        </span>
      );
    }
  };
  const formatTime = (time) => {
    return String(time).padStart(2, "0");
  };

  /** lp */
  const [blog, setBlog] = useState([]);
  const [creatorstatus, setCreator] = useState(false);
  const [TopCreator, SetTopCreator] = useState([]);

  var LikeForwardRef = useRef();
  const [LikedTokenList, setLikedTokenList] = useState([]);

  const [homecontent, setHomecontent] = useState([]);

  const [homecontentmidd, setHomecontentmidd] = useState([]);

  console.log(":payload", payload);

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
  const [val, Setval] = useState("");
  const [blogstate, setblogstate] = useState(false);
  const [Searchdata, SetSearch] = useState(null);
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

  // const [homecontent,setHomecontent]=useState([]);
  // const[homecontentmidd,setHomecontentmidd]=useState([])
  // console.log("------------------",category);

  useEffect(() => {
    getarticles();
    // Getandselldata();
    // Getandsellnft();
    // GetPromtion();

    TopCreatorFunc();
    HotAuction(1, "All");
    HotSales("All");
    // Collectionlist('All')
    CollectionByCreate("All");
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
  const TopCreatorFunc = async () => {
    var resp = await TopCreatorApi();
    console.log("topcreator", resp);
    if (resp?.data?.length > 8) {
      SetTopCreator(resp?.data.slice(0, 8));
      setCreator(true);
    } else {
      SetTopCreator(resp?.data);
      setCreator(true);
    }
  };
  // console.log("HotAuctionData",HotAuctionData)
  const HotAuction = async (data, tabs) => {
    var SendDATA = {
      TabName: tabs,
      limit: 8,
      ProfileUrl: "",
      page: 1,
      from: "Auction",
      filter: filter.auction,
    };
    let Resp = await Token_List_Func(SendDATA);
    console.log('SetHotAuctionstate' ,Resp )
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

  // const Getandselldata = async () => {
  //   var resp = await getCmsContent("homepage_top");
  //    console.log("cmslistdfgfd",resp.data)
  //   if (resp?.status) setHomecontent(resp.data);
  // };
  // const Getandsellnft = async () => {
  //   var resp = await getCmsContent("homepage_middle");
  //   console.log("cmslist", resp?.data);
  //   if (resp?.status) setHomecontentmidd(resp?.data);
  // };



  // const GetPromtion = async () => {
  //   // var resp = await Getpromotedtoken()
  //   var protoken = await Getpromotedtoken();
  //   console.log("DGJFGJFJD", protoken);
  //   if (protoken?.success == "success") {
  //     console.log(protoken?.data[0], "protoken");
  //     setPromotedtoken(protoken?.data[0]);
  //     setBannerstatus(false);
  //   }
  // };

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
    setFilter({ ...filter, ...{ sale: val } });
    setFilterview({ ...filterview, ...{ sale: show } });
  };

  const CollectionFilter = (val, show) => {
    setFilter({ ...filter, ...{ collection: val } });
    setFilterview({ ...filterview, ...{ collection: show } });
  };
;



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
        <div className="mb-12 text-center font-display text-3xl text-jacarta-700 dark:text-white">
          <h2 className="inline">Hot Auction</h2>{" "}
          {/* <div className="dropdown inline cursor-pointer">
            <button
              className="dropdown-toggle inline-flex items-center text-accent"
              type="button"
              id="collectionSort"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {activeLabel}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-8 w-8 fill-accent"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
              </svg>
            </button>
            <div
              className="dropdown-menu z-10 hidden min-w-[200px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
              aria-labelledby="collectionSort"
            >
              {labels.map((elm, i) => (
                <div
                  onClick={() => setActiveLabel(elm)}
                  key={i}
                  className=" cursor-pointer dropdown-item block rounded-xl px-5 py-2 text-sm transition-colors hover:bg-jacarta-50 dark:hover:bg-jacarta-600"
                >
                  {elm}
                </div>
              ))}
            </div>
          </div> */}
        </div>

        <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
          { hotactionstate == true  ? 
          <div className="text-center">
                            <h3>Loading...</h3>
           </div> : 
           payload && HotAuctionData[HotAuctionData.tab]?.length > 0 ?
           HotAuctionData[HotAuctionData.tab]
           ?.slice(0, 8).map((item, index ) => (
                        <article key={index}>
              <Nftcard  product={item}
                        type="marketplace"
                        index={index}
                        LikeList={LikeList}
                        LikedTokenList={LikedTokenList}
                        setLikedTokenList={setLikedTokenList}
                        LikeForwardRef={LikeForwardRef}/>
              </article>
          ))
        :
          (
            <Nodata />
          )
        }
           {HotAuctionData[HotAuctionData.tab]?.length > 0 && (
              <div className="col-md-12">
                <div className="btn-loadmore wow fadeInUp" data-aos="fade-up">
                  <NavLink to="/explore" className="tf-button style-8 loadmore">
                    Explore More
                    {/* <i className="far fa-long-arrow-right"></i> */}
                  </NavLink>
                </div>
              </div>
            )}

        </div>
      </div>
    </section>
  );
}
