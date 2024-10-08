"use client";
import { useEffect, useState } from "react";
import tippy from "tippy.js";
import Socials from "../collection/Socials";
import CopyToClipboard from "@/utlis/AddClipboard";
import Image from "next/image";

//Functions
import { isEmpty } from "@/actions/common";
import { userRegister } from "@/actions/axios/user.axios";
import Config from '@/Config/config'
import { useSelector } from "react-redux";

export default function Profile({params}) {
  
  console.log("🚀 ~ Profile ~ params:", params)
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const [CustomUrl,setCustomurl]=useState(params?.customurl);
  const [userData, setUserData] = useState({});
  console.log('userData1-->',userData,CustomUrl)
  const { web3, accountAddress, coinBalance } = useSelector((state) => state.LoginReducer.AccountDetails)
  const [loved, setLoved] = useState();

  useEffect(() => {
    tippy("[data-tippy-content]");
    new CopyToClipboard();
  }, []);


  const reloadPage = () => {
    window.location.reload();
  };
  useEffect(() => {
    getProfileDetails();
  }, [CustomUrl]);

  const getProfileDetails = async () => {
    var SendDATA = {
      CustomUrl: CustomUrl,
      Type: "getProfile",
    };
    console.log('SendDATA-->',SendDATA)
    var profileInfo = await userRegister(SendDATA);
    console.log('profileInfo-->',profileInfo)
    if (profileInfo?.success == "success" && profileInfo?.data?.WalletAddress) {
      setUserData(profileInfo?.data);
    }
  };




  return (
    <>
    <div className="relative">
      <Image
        width={1920}
        height={300}
        src={isEmpty(userData?.Cover) ? "/img/user/banner.jpg" : `${Config?.IMG_URL}/user/${userData?.WalletAddress}/cover/${userData?.Cover}`}
        alt="banner"
        className="h-[18.75rem] object-cover"
      />
    </div>
    <section className="relative bg-light-base pb-12 pt-28 dark:bg-jacarta-800">
      <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <figure className="relative">
          <Image
            width={138}
            height={138}
            src={isEmpty(userData?.Profile)
              ? "/img/user/user_avatar.gif"
              : `${Config?.IMG_URL}/user/${userData?.WalletAddress}/profile/${userData?.Profile}`}
            alt="collection avatar"
            className="rounded-xl border-[5px] border-white dark:border-jacarta-600"
          />
          {userData?.isVerified && <div
            className="absolute -right-3 bottom-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green dark:border-jacarta-600"
            data-tippy-content="Verified Collection"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="h-[.875rem] w-[.875rem] fill-white"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
            </svg>
          </div>}
        </figure>
      </div>

      <div className="container">
        <div className="text-center">
          <h2 className="mb-2 font-display text-4xl font-medium text-jacarta-700 dark:text-white">
            {userData?.DisplayName}
          </h2>
          <div className="mb-8 inline-flex items-center justify-center rounded-full border border-jacarta-100 bg-white py-1.5 px-4 dark:border-jacarta-600 dark:bg-jacarta-700">
            <span data-tippy-content="SOL">
            <Image
                  width={138}
                  height={138}
                  src="/img/chains/Sol_small.png"
                  alt="Sol"
                  className=" border-[5px] w-[30px]"
                />
            </span>
            <button
              className="js-copy-clipboard max-w-[10rem] select-none overflow-hidden text-ellipsis whitespace-nowrap dark:text-jacarta-200"
              data-tippy-content="Copy"
            >
              <span>{userData?.WalletAddress}</span>
            </button>
          </div>

          <div className="mx-auto mb-2 max-w-xl text-lg dark:text-jacarta-300">
           {userData?.Bio}
          </div>
          <span className="text-jacarta-400">Joined {months[new Date(userData?.createdAt).getMonth()]} {new Date(userData?.createdAt).getFullYear()}</span>

          <div className="mt-6 flex items-center justify-center space-x-2.5">
            <div className="dropdown rounded-xl border border-jacarta-100 bg-white hover:bg-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-jacarta-600">
              <a
                href="#"
                className="dropdown-toggle inline-flex h-10 w-10 items-center justify-center text-sm"
                role="button"
                id="collectionShare"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-tippy-content="Share"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="h-4 w-4 fill-jacarta-500 dark:fill-jacarta-200"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M13.576 17.271l-5.11-2.787a3.5 3.5 0 1 1 0-4.968l5.11-2.787a3.5 3.5 0 1 1 .958 1.755l-5.11 2.787a3.514 3.514 0 0 1 0 1.458l5.11 2.787a3.5 3.5 0 1 1-.958 1.755z" />
                </svg>
              </a>
              <div
                className="dropdown-menu dropdown-menu-end z-10 hidden min-w-[200px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
                aria-labelledby="collectionShare"
              >
                <Socials data={userData} />
              </div>
            </div>
            { CustomUrl != accountAddress  && <div className="dropdown rounded-xl border border-jacarta-100 bg-white hover:bg-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-jacarta-600">
              <a
                href="#"
                className="dropdown-toggle inline-flex h-10 w-10 items-center justify-center text-sm"
                role="button"
                id="collectionActions"
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
                aria-labelledby="collectionActions"
              >
                <hr className="my-2 mx-4 h-px border-0 bg-jacarta-100 dark:bg-jacarta-600" />
                <button onClick={reloadPage}className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                  Refresh Metadata
                </button>
                <button className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                  Report
                </button>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
