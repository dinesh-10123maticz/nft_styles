import Image from "next/image";
import Link from "next/link";
import React from "react";

//npm
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Countdown from "react-countdown";

//file
import ImgAudVideo from "../common/imgvdo";
import Config from "@/Config/config";
import { LikeRef } from "../common/LikeRef";
import { isEmpty } from "@/actions/common";
import { Wallet } from "@project-serum/anchor";

export default function Nftcard({
  datas,
  product,
  index,  
  from,
  setStatechange,
  LikeList,
  LikedTokenList,
  setLikedTokenList,
  LikeForwardRef,
  hotnft
}) {
  console.log("product-->", product,product?.cur_owner_Profile);
  const payload = useSelector(
    (state) => state.LoginReducer.AccountDetails
  );

  const AccountDetails = useSelector(
    (state) => state.LoginReducer.AccountDetails
  );
  const addLike = (id) => {
    const items = [...datas];
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

  const LikeAction = async () => {
    if (AccountDetails?.accountAddress) {
      var check = await LikeForwardRef.current.hitLike(product);
      console.log("check-->", check);
      toast.success("you " + check + "d token", {
        autoClose: 500,
        closeButton: true,
        closeOnClick: true,
      });
      
    } else
      toast.error("Connect Wallet", {
        autoClose: 1000,
        closeButton: true,
        closeOnClick: true,
      });
      if(setStatechange){
        setStatechange()
      }
  };

  let renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Auction Completed!</span>;
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

  let formatTime = (time) => {
    return String(time).padStart(2, "0");
  };

  const isObject  = (data)=>{
return typeof data === 'object'
  }

 const  isObjectCreator_WalletAddress = (data , value )=>{
  if(isObject(data)){
    return data?.[value]
  }
return data

 }
//  const  isObjectCreator_WalletAddress = (data)=>{
//   if(isObject(data)){
//     return product?.Creator_WalletAddress.WalletAddress
//   }
// return product?.Creator_WalletAddress

//  }

  return (
    <div className={`block rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700 h-full ${hotnft && 'min-h-[419px]'}`}>
      <figure className="relative">
        <Link
          href={`/item/${product?.ContractAddress}/${product?.NFTOwner}/${product?.NFTId}`}
        >
          <div class="h-[230px] w-full relative">
            <ImgAudVideo
              file={`${Config.IMG_URL}/nft/${product?.NFTCreator}/Compressed/NFT/${product?.CompressedFile}`}
              origFile={`${Config.IMG_URL}/nft/${product?.NFTCreator}/Original/NFT/${product?.NFTOrginalImage}`}
              thumb={`${Config.IMG_URL}/nft/${product?.NFTCreator}/Compressed/NFT_THUMB/${product?.CompressedThumbFile}`}
              classname={"w-full h-full object-cover"}
              type={
                product?.CompressedFile
                  ? product?.CompressedFile?.includes(".webp") ||
                    product?.CompressedFile?.includes(".png")
                    ? "image"
                    : product?.CompressedFile.includes(".webm")
                    ? "video"
                    : "audio"
                  : product?.CompressedFile
              }
            />
              {product.PutOnSaleType === "TimedAuction" &&
            new Date(product.EndClockTime).getTime() >= Date.now() && (
              <div className="featured-countdown absolute top-[15px] left-[5px] bg-[#0000008a] rounded-[10px] px-[5px]">
                {/* <Countdown
                      date={product.EndClockTime}
                      // autoStart={true}
                      renderer={renderer}
                    /> */}

                {new Date(product?.ClockTime) > Date.now() ? (
                  <span className="js-countdown text-white text-[14px]">Auction Starts in {Math.ceil((new Date(product.ClockTime).getTime() - new Date(Date.now()).getTime()) / (1000 * 3600 * 24))} Days</span>
                )
                  :
                  ((new Date(product?.EndClockTime) > Date.now()) ?
                    <span className="js-countdown text-white text-[14px]">
                      {/* <img className="img-fluid timer" src={timer} alt="ff" /> */}
                      {new Date(
                        product?.EndClockTime
                      ).getTime() >= Date.now() && (
                          <Countdown
                            date={product?.EndClockTime}
                            // autoStart={true}
                            renderer={renderer}
                          />
                        )}
                    </span>
                    :
                    <span className="js-countdown text-white text-[14px]">Auction Ended</span>
                  )}
              </div>
            )}
          </div>
        
          {/* <Image
            width={230}
            height={230}
            src={datas.imageSrc}
            alt="item 5"
            className="w-full rounded-[0.625rem]"
            loading="lazy"
          /> */}
        </Link>
        <div className="absolute top-3 right-3 flex items-center space-x-1 rounded-md bg-white p-2 dark:bg-jacarta-700">
          <LikeRef
            ref={LikeForwardRef}
            setLikedTokenList={setLikedTokenList}
            LikeList={LikeList}
          />
          <span
            onClick={() => LikeAction()}
            className={`js-likes relative cursor-pointer before:absolute before:h-4 before:w-4 before:bg-[url('../img/heart-fill.svg')] before:bg-cover before:bg-center before:bg-no-repeat before:opacity-0 ${
              LikedTokenList?.some(
                (value) => value.NFTId === product.NFTId
              ) ? "js-likes--active" : ""
            }`}
            data-tippy-content="Favorite"
          >
            <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="h-4 w-4 fill-jacarta-500 dark:fill-jacarta-200"
                >
                  <path fill="none" d="M0 0H24V24H0z" />
                  <path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z" />
                </svg>
          </span>
          
        </div>
        <div className="absolute left-3 -bottom-3">
          <div className="flex -space-x-2">
            <a href={`${'/user'}${'/'}${isObjectCreator_WalletAddress(product?.Creator_WalletAddress , "WalletAddress")}`}>
              <Image
                width={20}
                height={20}
                src={
                  isEmpty(product?.Creator_Profile)
                    ? "/img/avatars/owner_1.png"
                    : `${Config?.IMG_URL}/user/${isObjectCreator_WalletAddress(product?.Creator_WalletAddress , "WalletAddress") }/profile/${isObjectCreator_WalletAddress(product?.Creator_Profile, "Profile")}`
                }
                alt="creator"
                className="h-6 w-6 rounded-full border-2 border-white hover:border-accent dark:border-jacarta-600 dark:hover:border-accent"
                data-tippy-content={`Creator: ${product?.Creator_DisplayName ?? product?.Creator_CustomUrl}`}
              />
            </a>
            <a href={`${'/user'}${'/'}${product?.cur_owner_CustomUrl ? product?.cur_owner_CustomUrl : product?.tokencreator_list?.CustomUrl ?  product?.tokencreator_list?.CustomUrl :  product?.CustomUrl}`}>
              <Image
                width={20}
                height={20}
                src={
                  from == "myItem" ?
                  isEmpty(product?.Creator_Profile) ?
                  "/img/avatars/owner_1.png"
                  :
                  `${Config?.IMG_URL}/user/${isObjectCreator_WalletAddress(product?.Creator_WalletAddress , "WalletAddress") }/profile/${isObjectCreator_WalletAddress(product?.Creator_Profile, "Profile")}`
                  :
                  isEmpty(product?.cur_owner_Profile)
                    ? "/img/avatars/owner_1.png"
                    : `${Config?.IMG_URL}/user/${product?.NFTOwner}/profile/${product?.cur_owner_Profile}`
                }
                alt="owner"
                className="h-6 w-6 rounded-full border-2 border-white hover:border-accent dark:border-jacarta-600 dark:hover:border-accent"
                data-tippy-content={`Owner: ${product?.cur_owner_DisplayName}`}
              />
            </a>
          </div>
        </div>
      </figure>
      <div className="mt-7 flex items-center justify-between">
        <Link
          href={`/item/${product?.ContractAddress}/${product?.NFTOwner}/${product?.NFTId}`}
        >
          <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white">
            {product?.NFTName}
          </span>
        </Link>
        
      </div>
     <div className="mt-2 text-sm flex items-center justify-between">
     { product?.PutOnSaleType == "FixedPrice" && product?.NFTPrice &&  product?.NFTPrice !== "0" && 
     <span className="flex items-center whitespace-nowrap rounded-md border border-jacarta-100 py-1 px-2 dark:border-jacarta-600">
         <span data-tippy-content="SOL">

            <Image
              width={80}
              height={80}
              src="/img/chains/Sol_small.png"
              alt="Sol"
              className=" border-[5px] w-[30px]"
            />
          </span>
          {console.log("pxxxroduct" , product)}
      <span className="text-sm font-medium tracking-tight text-green">
          {product?.NFTPrice} {product?.CoinName}
          </span>
          </span>}

        <span className="mr-1 text-jacarta-700 dark:text-jacarta-200">
          {/* {isEmpty(product?.PutOnSale) ? product?.PutOnSaleType == "UnlimitedAuction" ? product?.PutOnSaleType : product?.PutOnSaleType == "Fixed" : "" } {} */}
        </span>


        <span className="text-jacarta-500 dark:text-jacarta-300">
          {product?.NFTBalance}/{product?.NFTQuantity}
        </span>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          className="font-display text-sm font-semibold text-accent "
          // data-bs-toggle="modal"
          // data-bs-target="#buyNowModal"
        >
         {( payload && product?.NFTOwner == payload?.accountAddress )
                  ?
                   "Owned"
                  :
                   (product?.PutOnSaleType == "FixedPrice")
                    ? 
                    "Buy Now"
                    : 
                    "Not Listed"
                    }
        </button>
        {/* <Link
          href={`/item/${datas.id}`}
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
          <span className=" rtl:mr-1 font-display text-sm font-semibold group-hover:text-accent dark:text-jacarta-200">
            View History
          </span>
        </Link> */}
      </div>
    </div>
  );
}
