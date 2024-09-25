"use client";
import { useritems } from "@/data/item";
import React, { useEffect, useRef, useState } from "react";
import Filter from "./Filter";
import tippy from "tippy.js";
import { useSelector } from "react-redux";
import { collections3 } from "@/data/collections";
import Activity from "./Activity";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Token_MyList_Func, userRegister } from "@/actions/axios/user.axios";
import Nodata from "@/components/common/NoData";
import Nftcard from "@/components/card/nftcard";
import { Loader } from "@solana/web3.js";

export default function Collcetions({params}) {
  console.log("🚀 ~ Collcetions ~ params:", params)
  const [allItems, setAllItems] = useState(useritems);
  useEffect(() => {
    tippy("[data-tippy-content]");
  }, []);
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

  const customurl =  params?.customurl


  const location = useRouter()
  var LikeForwardRef = useRef();

  const { payload } = useSelector(state => state.LoginReducer.User)
  const { accountAddress } = useSelector(state => state.LoginReducer.AccountDetails)
  const { Admin_address,follow} = useSelector(state => state.LoginReducer)
  const [filter, setFilter] = useState('activity');
  var [filters, setFilters] = useState("LatestDrops");
  const [cursor, setcursor] = useState('');
  const [tab, SetTab] = useState('owned')
  const [loading, setLoading] = useState(true)
  const [Follow, SetFollow] = useState('follow');
  const [value, SetTabName] = useState('onsale')
  const [userProfile, setUserProfile] = useState({})
  const [Tokens, SetTokens] = useState({ 'activity': { 'loader': true, page: 1, list: [] } })
  const [Tokenss, SetTokenss] = useState({ 'owned': { 'loader': true, page: 1, list: [] } })
  const [LikedTokenList, setLikedTokenList] = useState([]);
  var [loader, setLoader] = useState(true);
  var navigate = useRouter();
  var [openpopup, setOpenpopup] = useState('');
  console.log('ljfkjfdsdfsdg',location)
  const [statechange,setStatechange]=useState(false)
  useEffect(() => {

      // if (location?.state?.Tab) {

      //     console.log("locatiojboard ", location, location.state, location.state.Tab);
      //     setFilter(location.state.Tab)
      //     SetTabName(location.state.Tab)

      // }
      
      if (typeof Tokens[filter] == 'undefined' || Tokens[filter].filter !== filter) {
          Tokens[filter] = { page: 1, list: [], loader: false };
          SetTokens(Tokens);
          Explore(1, filter);
      }
      if (typeof Tokenss[value] == 'undefined' || Tokenss[value].filter !== filters) {
          Tokenss[value] = { page: 1, list: [], loader: false };
          SetTokenss(Tokenss);
          Exploree(1, value);

      }
  }, [value, customurl, filter,location,statechange])

console.log("customurl",customurl);
  // useEffect(()=>{
  //    console.log("locatioj ",location,location.state,location.state.Tab);
  //     setFilter(location.state.Tab)
  //     }
  // ,[])

  useEffect(() => {
      getProfileDetails()
      Explore();
      Exploree()
      setFilter('activity')
      // if(accountAddress!==userProfile?.WalletAddress){
      // FollowUnFollow()
      // }
  }, [customurl, accountAddress, userProfile?.WalletAddress,follow ])

  useEffect(()=>{
      getProfileDetails() 
      // setFilter(location?.state?.Tab ? location?.state?.Tab  :  'activity')
      setFilter('activity')
   

  },[])

  console.log("Admin_address",Admin_address,follow)

  const Exploree = async (data, tab) => {
      console.log("🚀 ~ Exploree ~ data, tab:", data, tab)
      var page = data ? data : (Tokenss[value]?.page)
      var SendDATA = {
          TabName: tab ? tab : value,
          limit: (tab === "usercollection" || value === "usercollection") ? 100 : 12,
          CustomUrl: customurl,
          NFTOwner: (userProfile?.WalletAddress ? userProfile?.WalletAddress : accountAddress),
          page: page ?? 1,
          filter: filters,
          from: 'myItem',
          cursor: cursor
      }
      let Resp = await Token_MyList_Func(SendDATA)
      console.log('sfgfhgfs', value, tab, Resp, SendDATA)
      if (Resp?.success == 'success' && Resp.data.length > 0) {

          setcursor(Resp?.cursor)
          SetTokenss({
              ...Tokenss, ...{
                  [value]: {
                      list: [...Tokenss[value].list, ...Resp.data],
                      loader: (Resp.data.length == 0 || (SendDATA.TabName == "usercollection" && Resp.cursor == null)) ? false : true,
                      page: Tokenss[value].page,
                      filter: value,
                  }
              }
          })
          setLoading(false)
      } else
          SetTokenss({
              ...Tokenss,
              ...{
                  [value]: {
                      list: Tokenss[value].list,
                      loader: false,
                      page: Tokenss[value].page,
                      filter: value
                  },
              },
          });
  setLoading(false)
  }


  const getProfileDetails = async () => {
      var SendDATA = {
          CustomUrl: customurl,
          Type: 'getProfile',
          User: payload?.WalletAddress
      }
      var profileInfo = await userRegister(SendDATA)
      console.log('sennwduwidhdddd',profileInfo)
      if (profileInfo?.success == 'success' && profileInfo?.data?.WalletAddress) {
          setUserProfile(profileInfo.data)
          console.log("profuke", profileInfo.data)
          SetFollow(profileInfo.follow == "follow" ? "unfollow" : "follow")
      }
      else {
          const id = toast.loading("Searching User");
          toast.update(id, { render: 'User Not found', type: 'error', isLoading: false, autoClose: 700, closeButton: true, closeOnClick: true })
          setTimeout(function () {
              navigate.push('/')
          }, 2000);
      }
  }

  const FollowUnFollow = async () => {
      const id = toast.loading(Follow == "follow" ? "You are Following " + Name_showing(userProfile?.DisplayName) : "You are Un Following " + Name_showing(userProfile?.DisplayName))
      let SendData = {
          MyItemAddr: userProfile?.WalletAddress,
          ClickAddr: accountAddress,
          From: 'myitem',
          MyItemCustomUrl: userProfile?.CustomUrl,
          ClickCustomUrl: payload?.CustomUrl,
      }
      // console.log('senddataaa',SendData,userProfile,payload)
      let Resp = await FollowUnFollowFunc(SendData)
      if (Resp?.success) {
          SetFollow(Resp.msg == 'follow' ? 'unfollow' : 'follow')
          toast.update(id, { render: Resp.msg == 'follow' ? 'You are Following ' + Name_showing(userProfile?.DisplayName) + ' Successfully' : 'You are UnFollowing ' +Name_showing(userProfile?.DisplayName) + ' Successfully', type: 'success', isLoading: false, autoClose: 1000 })
      }
      else {
          toast.update(id, { render: 'Try Again', type: 'error', isLoading: false, autoClose: 1000, closeButton: true, closeOnClick: true })

      }
  }

  const Explore = async (data, tab) => {
      var page = data ? data : (Tokens[filter]?.page)
      var SendDATA = {
          TabName: tab ? tab : filter,
          limit: 12,
          CustomUrl: userProfile?.CustomUrl,
          NFTOwner: userProfile?.WalletAddress,
          page: page ?? 1,
          from: 'myItem',
          filter: 'LatestDrops',
      }
      let Resp = await Token_MyList_Func(SendDATA)
      console.log("Token_MyList_Func" ,SendDATA , Resp , filter)
      setLoader((Resp?.data?.length == 0 || (SendDATA?.TabName == "usercollection" && Resp?.cursor == null)) ? false : true)
      if (Resp?.success == 'success' && Resp?.data?.length > 0) {

          SetTokens({
              ...Tokens, ...{
                  [filter]: {
                      list: SendDATA.page == 1 ? [...Resp?.data] : [...Tokens[filter]?.list, ...Resp?.data] ,
                      loader: (Resp?.data?.length == 0 || (SendDATA?.TabName == "usercollection" && Resp?.cursor == null)) ? false : true,
                      page: Tokens[filter]?.page
                  }
              }
          })
      }
  }

  const LoadMore = () => {
      Tokens[filter].page = Tokens[filter].page + 1;
      SetTokens(Tokens);
      Explore(Tokens[filter].page);

  }

  const CoverImg = async (event) => {
      const toastupd = toast.loading("You Updated Image")
      var reader = new FileReader()
      const { id, files } = event.target;
      var fileNameExt = files[0].name.substr(files[0].name.lastIndexOf(".") + 1);
      if (event.target.files && event.target.files[0]) {
          if (files, id, files[0].type.includes("image")) {
              var file = event.target.files[0];
              var Resp;
              if (id == 'coverupload') {
                  Resp = await userRegister({ Type: 'cover', WalletAddress: payload.WalletAddress, Cover: files[0] })
                  // console.log('coverrr',Resp)
              }
              else {
                  Resp = await userRegister({ Type: 'profileimage', WalletAddress: payload.WalletAddress, Profile: files[0] })
                  // console.log('coverrr',Resp)
              }
              if (Resp?.success == 'success') {
                  window.location.reload()
                  getProfileDetails();
                  toast.update(toastupd, { render: Resp.msg, type: 'success', isLoading: false, autoClose: 700, closeButton: true, closeOnClick: true })
                  window.location.reload()
              }
              // let Resp = await userRegister({Type:'cover',CustomUrl:payload.CustomUrl,Cover:files[0]})
          }
          else {
              toast.update(toastupd, { render: "Profile or Cover Image Must be a Image", type: 'error', isLoading: false, autoClose: 700, closeButton: true, closeOnClick: true })
          }
      }

      // let formData = { ...formValue, ...{ [id]: files[0] } };
  }

  function LikeList(data) {
      setLikedTokenList(data)
  }




  return (
    <section className="relative py-24 pt-20">
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
        {/* Tabs Nav */}
        <ul
          className="nav nav-tabs scrollbar-custom mb-12 flex items-center justify-start overflow-x-auto overflow-y-hidden border-b border-jacarta-100 pb-px dark:border-jacarta-600 md:justify-center"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link active relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white`}
              id="on-sale-tab"
              data-bs-toggle="tab"
              data-bs-target="#on-sale"
              type="button"
              role="tab"
              aria-controls="onsale"
              aria-selected="true"
              onClick={() => SetTabName("onsale")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-1 h-5 w-5 fill-current"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm4.5 9H14a.5.5 0 1 0 0-1h-4a2.5 2.5 0 1 1 0-5h1V6h2v2h2.5v2H10a.5.5 0 1 0 0 1h4a2.5 2.5 0 1 1 0 5h-1v2h-2v-2H8.5v-2z" />
              </svg>
              <span className="font-display text-base font-medium">
                On Sale
              </span>
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white"
              id="owned-tab"
              data-bs-toggle="tab"
              data-bs-target="#owned"
              type="button"
              role="tab"
              aria-controls="owned"
              aria-selected="false"
              onClick={() => SetTabName("owned")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-1 h-5 w-5 fill-current"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12.414 5H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2zM4 5v14h16V7h-8.414l-2-2H4zm9 8h3l-4 4-4-4h3V9h2v4z" />
              </svg>
              <span className="font-display text-base font-medium">Owned</span>
            </button>
          </li>
          {/* <li className="nav-item" role="presentation">\
          // TODO: need to implement  

            <button
              className="nav-link relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white"
              id="created-tab"
              data-bs-toggle="tab"
              data-bs-target="#created"
              type="button"
              role="tab"
              aria-controls="created"
              aria-selected="false"
              onClick={() => SetTabName("created")}

              
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-1 h-5 w-5 fill-current"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M5 5v3h14V5H5zM4 3h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm2 9h6a1 1 0 0 1 1 1v3h1v6h-4v-6h1v-2H5a1 1 0 0 1-1-1v-2h2v1zm11.732 1.732l1.768-1.768 1.768 1.768a2.5 2.5 0 1 1-3.536 0z" />
              </svg>
              <span className="font-display text-base font-medium">
                Created (20)
              </span>
            </button>
          </li> */}
          {/* <li className="nav-item" role="presentation">
            <button
              className="nav-link relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white"
              id="collections-tab"
              data-bs-toggle="tab"
              data-bs-target="#collections"
              type="button"
              role="tab"
              aria-controls="collections"
              aria-selected="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-1 h-5 w-5 fill-current"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M10.9 2.1l9.899 1.415 1.414 9.9-9.192 9.192a1 1 0 0 1-1.414 0l-9.9-9.9a1 1 0 0 1 0-1.414L10.9 2.1zm.707 2.122L3.828 12l8.486 8.485 7.778-7.778-1.06-7.425-7.425-1.06zm2.12 6.364a2 2 0 1 1 2.83-2.829 2 2 0 0 1-2.83 2.829z" />
              </svg>
              <span className="font-display text-base font-medium">
                Collections
              </span>
            </button>
          </li> */}
          <li className="nav-item" role="presentation">
            <button
              className="nav-link relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white"
              id="activity-tab"
              data-bs-toggle="tab"
              data-bs-target="#activity"
              type="button"
              role="tab"
              aria-controls="activity"
              aria-selected="false"
              onClick={ ()=>{
                SetTabName("activity")
                setFilter("activity")}}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-1 h-5 w-5 fill-current"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M11.95 7.95l-1.414 1.414L8 6.828 8 20H6V6.828L3.465 9.364 2.05 7.95 7 3l4.95 4.95zm10 8.1L17 21l-4.95-4.95 1.414-1.414 2.537 2.536L16 4h2v13.172l2.536-2.536 1.414 1.414z" />
              </svg>
              <span className="font-display text-base font-medium">
                Activity
              </span>
            </button>
          </li>

          {/* //Favorite */}
          <li className="nav-item" role="presentation">
            <button
              className="nav-link relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white"
              id="favourite-tab"
              data-bs-toggle="tab"
              data-bs-target="#favourite"
              type="button"
              role="tab"
              aria-controls="favourite"
              aria-selected="false"
              onClick={ ()=>{
                setFilter("favourite");
                SetTabName("favourite")
              }}
            >
             <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-1 h-5 w-5 fill-current"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M10.9 2.1l9.899 1.415 1.414 9.9-9.192 9.192a1 1 0 0 1-1.414 0l-9.9-9.9a1 1 0 0 1 0-1.414L10.9 2.1zm.707 2.122L3.828 12l8.486 8.485 7.778-7.778-1.06-7.425-7.425-1.06zm2.12 6.364a2 2 0 1 1 2.83-2.829 2 2 0 0 1-2.83 2.829z" />
              </svg>
              <span className="font-display text-base font-medium">
              Favourite
              </span>
            </button>
          </li>
        </ul>
        {console.log("filterfilterfilter" , value)}

     {/* {   */}
    {/* //  loader 
    //  Tokens?.[value]?.loader || value != "activity" 
    //  ? 
    //  <div> loading  </div> 
    //  : */}
      <div className="tab-content">
        
        {/* <Filter /> */}
         
          {/* On Sale Tab */}
          {
          value === "onsale" &&   
           <div
           className={`tab-pane fade ${value === "onsale" && 'show active'}`}
       
          >
            {/* Filters */}
            {/* <Filter /> */}
            {/* end filters */}

            {/* Grid */}
            <div className={ Tokenss[value] && Tokenss[value]?.list?.length > 0 ? "grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4" : 'w-full'}>
              { Tokenss[value] &&  Tokenss[value]?.list?.length > 0 ?
                Tokenss[value]?.list.map((item, index) => (
                  <article key={index}>
              
                        <Nftcard
                  product={item}
                  index={index}
                  from = {'myItem'}
                  LikeList={LikeList}
                  LikedTokenList={LikedTokenList}
                  setLikedTokenList={setLikedTokenList}
                  LikeForwardRef={LikeForwardRef}
                  // datas={items2[index]}
                />
                  </article>
                ))
              : <> <Nodata /></> 
              }
            </div>



            {/* end grid */}
          </div>}
          {/* end on sale tab */}

          {/* Owned Tab */}

          {value === "owned" && 
          <div
            className={`tab-pane fade ${value === "owned" && 'show active'}`}
          
          >
            {console.log('ownedTab Tokens' , Tokenss,"value",value)}
            {/* Filters */}
            {/* end filters */}

            {/* Grid */}
            <div className={ Tokenss[value] && Tokenss[value]?.list?.length > 0 ? "grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4" : 'w-full'}>
              { Tokenss[value] && Tokenss[value]?.list?.length > 0 ?
                
                Tokenss[value]?.list?.map((item, index) => (
                  <article key={item._id}>
{                    console.log('ownedTab nftdataxas' , item) }
                   <Nftcard
                  product={item}
                  from = {'myItem'}
                  index={item._id}
                  LikeList={LikeList}
                  LikedTokenList={LikedTokenList}
                  setLikedTokenList={setLikedTokenList}
                  LikeForwardRef={LikeForwardRef}
                  // datas={items2[index]}
                />
                  
                  
                  </article>
                )) : <> 
                <Nodata />
                </>}
            </div>
            {/* end grid */}
          </div>}


          {/* end owned tab */}





          {/* Created Tab */}
     {  value == "created" &&    
     <div
            className={`tab-pane fade ${value === "created" && 'show active'}`}
     
          >
            {/* Filters */}
            {/* <Filter /> */}
            {/* end filters */}

            {/* Grid */}
            <div className={ Tokenss[value] && Tokenss[value]?.list?.length > 0 ? "grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4" : 'w-full'}>
              {allItems
                .filter((elm) => elm.type == "created")
                .map((elm, i) => (
                  <article key={i}>
                    <div className="block rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
                      <figure className="relative">
                        <Link href={`/item/${elm.id}`}>
                          <Image
                            width={230}
                            height={230}
                            src={elm.imageSrc}
                            alt="item 5"
                            className="w-full rounded-[0.625rem]"
                            loading="lazy"
                          />
                        </Link>
                        <div className="absolute top-3 right-3 flex items-center space-x-1 rounded-md bg-white p-2 dark:bg-jacarta-700">
                          <span
                            onClick={() => addLike(elm.id)}
                            className={`js-likes relative cursor-pointer before:absolute before:h-4 before:w-4 before:bg-[url('../img/heart-fill.svg')] before:bg-cover before:bg-center before:bg-no-repeat before:opacity-0 ${
                              elm.liked ? "js-likes--active" : ""
                            }`}
                            data-tippy-content="Favorite"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              className="h-4 w-4 fill-jacarta-500 hover:fill-red dark:fill-jacarta-200 dark:hover:fill-red"
                            >
                              <path fill="none" d="M0 0H24V24H0z" />
                              <path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z" />
                            </svg>
                          </span>
                          <span className="text-sm dark:text-jacarta-200">
                            {elm.likes}
                          </span>
                        </div>
                        <div className="absolute left-3 -bottom-3">
                          <div className="flex -space-x-2">
                            <a href="#">
                              <Image
                                width={24}
                                height={24}
                                src={elm.creatorAvatar}
                                alt="creator"
                                className="h-6 w-6 rounded-full border-2 border-white hover:border-accent dark:border-jacarta-600 dark:hover:border-accent"
                                data-tippy-content="Creator: Sussygirl"
                              />
                            </a>
                            <a href="#">
                              <Image
                                width={24}
                                height={24}
                                src={elm.ownerAvatar}
                                alt="owner"
                                className="h-6 w-6 rounded-full border-2 border-white hover:border-accent dark:border-jacarta-600 dark:hover:border-accent"
                                data-tippy-content="Owner: Sussygirl"
                              />
                            </a>
                          </div>
                        </div>
                      </figure>
                      <div className="mt-7 flex items-center justify-between">
                        <Link href={`/item/${elm.id}`}>
                          <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white">
                            {elm.title}
                          </span>
                        </Link>
                        <div className="dropup rounded-full hover:bg-jacarta-100 dark:hover:bg-jacarta-600">
                          <a
                            href="#"
                            className="dropdown-toggle inline-flex h-8 w-8 items-center justify-center text-sm"
                            role="button"
                            id="itemActions"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <svg
                              width="16"
                              height="4"
                              viewBox="0 0 16 4"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="fill-jacarta-500 dark:fill-jacarta-200"
                            >
                              <circle cx="2" cy="2" r="2" />
                              <circle cx="8" cy="2" r="2" />
                              <circle cx="14" cy="2" r="2" />
                            </svg>
                          </a>
                          <div
                            className="dropdown-menu dropdown-menu-end z-10 hidden min-w-[200px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
                            aria-labelledby="itemActions"
                          >
                            <button className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                              New bid
                            </button>
                            <hr className="my-2 mx-4 h-px border-0 bg-jacarta-100 dark:bg-jacarta-600" />
                            <button className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                              Refresh Metadata
                            </button>
                            <button className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                              Share
                            </button>
                            <button className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                              Report
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-sm">
                        <span className="mr-1 text-jacarta-700 dark:text-jacarta-200">
                          {elm.price}
                        </span>
                        <span className="text-jacarta-500 dark:text-jacarta-300">
                          {elm.bidCount}
                        </span>
                      </div>

                      <div className="mt-8 flex items-center justify-between">
                        <button
                          className="font-display text-sm font-semibold text-accent"
                          data-bs-toggle="modal"
                          data-bs-target="#buyNowModal"
                        >
                          Buy now
                        </button>
                        <Link
                          href={`/item/${elm.id}`}
                          className="group flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="mr-1 mb-[3px] h-4 w-4 fill-jacarta-500 group-hover:fill-accent dark:fill-jacarta-200"
                          >
                            <path fill="none" d="M0 0H24V24H0z" />
                            <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12h2c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8C9.25 4 6.824 5.387 5.385 7.5H8v2H2v-6h2V6c1.824-2.43 4.729-4 8-4zm1 5v4.585l3.243 3.243-1.415 1.415L11 12.413V7h2z" />
                          </svg>
                          <span className="font-display text-sm font-semibold group-hover:text-accent dark:text-jacarta-200">
                            View History
                          </span>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
            {/* end grid */}
          </div>}

     


          {/* end created tab */}
          {/* Activity Tab */}
          {filter === "activity" && <div
            className={`tab-pane fade ${value === "activity" && 'show active'}`}
           
          >
            <Activity 
           datas={Tokens[filter]}
           Loadmore={LoadMore}
           List={Tokens[filter]}
           filter={filter}
           Explore={Explore}
           SetTokens={SetTokens}
           Tokens={Tokens}
           userProfile={userProfile}
           Loader={loader} />
          </div>}
          {/* end activity tab */}


          {/* start for favroties */}
{filter === "favourite" &&
 <div
            className={`tab-pane fade ${value === "favourite" && 'show active'}`}
           
          >
            {console.log('Tokenssownwe' , Tokenss)}

            <div className={Tokens[filter]?.list.length > 0  ?  "grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4" : "w-full"}>
              { Tokens[filter]?.list.length > 0 ? Tokens[filter]?.list.map((item, index) => (
                  <article key={item._id}>
{                    console.log('nftdatfavouriteaxas' , item) }
                    
                   <Nftcard
                  product={item}
                  index={item._id}
                  from = {'myItem'}
                  setStatechange ={()=>setStatechange(!statechange)}
                  LikeList={LikeList}
                  LikedTokenList={LikedTokenList}
                  setLikedTokenList={setLikedTokenList}
                  LikeForwardRef={LikeForwardRef}
                  // datas={items2[index]}
                />
                  
                  
                  </article>
                )) : <> 
                <Nodata />
                </>}
            </div>
            {/* end grid */}
          </div>}
{/* end of favroties */}



        </div>
      {/* // } */}

        
      </div>
    </section>
  );
}
