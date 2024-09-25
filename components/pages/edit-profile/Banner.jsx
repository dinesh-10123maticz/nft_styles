"use client";
import Image from "next/image";

//core
import React, { useState } from "react";

//npm
import { toast } from "react-toastify";
import { useSelector , useDispatch } from "react-redux";

//Functions
import { userRegister } from "@/actions/axios/user.axios";
import { isEmpty,loadImageFromFile } from "@/actions/common";
import Config from '@/Config/config'


export default function Banner() {
  const [image, setImage] = useState("/img/user/banner.jpg");
  const dispatch = useDispatch()

  const updateIndication = useSelector((state)=>state.LoginReducer.updateIndication)
  const userData = useSelector((state)=>state.LoginReducer.User.payload)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const CoverImg = async (event) => {
    const toastupd = toast.loading("You Updated Image")
    handleImageChange(event)
    const { id, files } = event.target;
    const { width, height } = await loadImageFromFile(files[0]);


    if (height !== 300 || width !== 1920 ) {
      return toast.update(
        toastupd, {
          render: "Image size must be 300X1920",
          type: "error",
          isLoading: false,
          autoClose: 700,
          closeButton: true,
          closeOnClick: true,
        });
    }
    else{
      var fileNameExt = files[0].name.substr(files[0].name.lastIndexOf(".") + 1);
      if (event.target.files && event.target.files[0]) {
          if (files, id, files[0].type.includes("image")) {
              var file = event.target.files[0];
              var Resp;
                  Resp = await userRegister({ Type: 'cover', WalletAddress: userData.WalletAddress, Cover: files[0] })
              if (Resp?.success == 'success') {
                  dispatch({
                    type: "updateIndication",
                    'updateIndication': { updateIndication: !updateIndication }
                })
                  toast.update(toastupd, { render: Resp.msg, type: 'success', isLoading: false, autoClose: 700, closeButton: true, closeOnClick: true })
              }
          }
          else {
              toast.update(toastupd, { render: "Profile or Cover Image Must be a Image", type: 'error', isLoading: false, autoClose: 700, closeButton: true, closeOnClick: true })
          }
      }
    }

    
}
  return (
    <div className="relative">
      <Image
        width={1920}
        height={300}
        src={ isEmpty(userData?.Cover) ? image : `${Config?.IMG_URL}/user/${userData?.WalletAddress}/cover/${userData?.Cover}`}
        alt="banner"
        className="h-[18.75rem] object-cover w-[100%] "
      />
      <div className="container relative -translate-y-4">
        <div className="group absolute right-0 bottom-4 flex items-center rounded-lg bg-white py-2 px-4 font-display text-sm hover:bg-accent">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={CoverImg}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="mr-1 h-4 w-4 fill-jacarta-400 group-hover:fill-white"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z"></path>
          </svg>
          <span className="mt-0.5 block group-hover:text-white">
            Edit cover photo  (We recommend an Cover image of at least 300x1920) 
          </span>
        </div>
      </div>
    </div>
  );
}
