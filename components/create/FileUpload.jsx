"use client";
import Image from "next/image";
import React, { useState } from "react";

//File
import { isEmpty } from "@/actions/common";
import Config from "@/Config/config";
import ImgAudVideo from "../common/imgvdo";

export default function FileUpload({ onChange, userPayload, NFTFormValue }) {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [thumbfile, setThumbfile] = useState(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type == "Orginal") {
          setFile(file);
          setImage(reader.result);
          setImageName(file.name); // Set the image name
        } else {
          setThumbfile(reader.result);
        }
      };
      reader.readAsDataURL(file);
      onChange(e, [file], type);
    }
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    console.log("file-->", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type == "Orginal") {
          setImage(reader.result);
          setFile(file);
          setImageName(file.name); // Set the image name
        } else {
          setThumbfile(reader.result);
        }
      };
      reader.readAsDataURL(file);
      onChange(e, [file], type);
    }
  };

  return (
    <div className="mb-6">
      <label className="mb-2 block font-display text-jacarta-700 dark:text-white">
        Image, Video, Audio, or 3D Model<span className="text-red">*</span>
      </label>
      <div className="mb-3 text-2xs dark:text-jacarta-300">
        {!imageName ? (
          "Drag or choose your file to upload (image size Must be 230X230)"
        ) : (
          <span className="text-green">Successfully Uploaded {imageName}</span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 flex-row flex-wrap flex max-[767px]:grid-cols-1 mb-4">
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, "Orginal")}
          style={{
            border: dragging ? "2px dashed #000" : "",

            borderRadius: "5px",
          }}
          className="group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed border-jacarta-100 bg-white py-20 px-5 text-center dark:border-jacarta-600 dark:bg-jacarta-700"
        >
          <div className="relative z-10 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="mb-4 inline-block fill-jacarta-500 dark:fill-white"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
            </svg>
            <div className="mx-auto max-w-xs text-xs dark:text-jacarta-300">
              JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size:
              100 MB
            </div>
          </div>
          <div className="absolute inset-4 cursor-pointer rounded bg-jacarta-50 opacity-0 group-hover:opacity-100 dark:bg-jacarta-600"></div>
          <div></div>
          {/* {image && (
          <div className="absolute inset-4 cursor-pointer rounded">
            <Image className="h-[100%] object-cover" src={image} alt="image" />
          </div>
        )} */}
          <input
            type="file"
            accept="image/*,video/*,audio/*,webgl/*,.glb,.gltf"
            id="file-upload"
            onChange={(e) => handleImageChange(e, "Orginal")}
            className="absolute inset-0 z-20 cursor-pointer opacity-0"
          />
        </div>
        <div>
          <div className="pTag mb-[10px]">Item Preview</div>

          <div className="block rounded-2.5xl w-[320px] border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
            <figure className="relative">
              <ImgAudVideo
                file={isEmpty(image) ? "/img/uploadimg.svg" : image}
                type={
                  file
                    ? file?.type?.includes("image")
                      ? "image"
                      : file?.type.includes("video")
                      ? "video"
                      : "audio"
                    : file
                }
              />
              {/* <Filerender src={isEmpty(image) ? "/img/products/item_5.jpg" : image} file={file}/> */}
              <div className="absolute left-3 -bottom-3">
                <div className="flex -space-x-2">
                  <a href="#">
                    <Image
                      width={20}
                      height={20}
                      src={
                        isEmpty(userPayload?.Profile)
                          ? "/img/avatars/owner_1.png"
                          : `${Config?.IMG_URL}/user/${userPayload?.WalletAddress}/profile/${userPayload?.Profile}`
                      }
                      alt="creator"
                      className="h-6 w-6 rounded-full border-2 border-white hover:border-accent dark:border-jacarta-600 dark:hover:border-accent"
                      data-tippy-content={`Creator:${userPayload?.DisplayName}`}
                    />
                  </a>
                  {/* <a href="#">
              <Image
                width={20}
                height={20}
                src={
                  isEmpty(userPayload)
                    ? '/img/avatars/owner_1.png'
                    : `${Config?.IMG_URL}/user/${userPayload?.WalletAddress}/profile/${userPayload?.Profile}`
                }
                alt="owner"
                className="h-6 w-6 rounded-full border-2 border-white hover:border-accent dark:border-jacarta-600 dark:hover:border-accent"
                data-tippy-content={`Owner : ${userPayload?.DisplayName}`}
              />
            </a> */}
                </div>
              </div>
            </figure>
            <div className="mt-7 flex items-center justify-between max-w-96">
              {/* <Link href={`/item/${props.datas.id}`}> */}
              <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white truncate">
                {isEmpty(NFTFormValue?.NFTName)
                  ? "NFT Name"
                  : NFTFormValue?.NFTName}
              </span>
              {/* </Link> */}
            </div>
            <div className="mt-2 text-sm">
              <span className="mr-1 text-jacarta-700 dark:text-jacarta-200">
                {isEmpty(NFTFormValue?.NFTPrice) ? "0" : NFTFormValue?.NFTPrice}{" "}
                {isEmpty(NFTFormValue?.CoinName)
                  ? Config.COIN_NAME
                  : NFTFormValue?.CoinName}
              </span>
              {/* <span className="text-jacarta-500 dark:text-jacarta-300">
         2/8
        </span> */}
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Preview */}
      {(file?.type?.includes("video") || file?.type?.includes("audio")) && (
        <div className="grid grid-cols-2 gap-3 flex-row flex-wrap flex max-[767px]:grid-cols-1 mb-4">
          <div
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
              border: dragging ? "2px dashed #000" : "",

              borderRadius: "5px",
            }}
            className="group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed border-jacarta-100 bg-white py-20 px-5 text-center dark:border-jacarta-600 dark:bg-jacarta-700"
          >
            <div className="relative z-10 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mb-4 inline-block fill-jacarta-500 dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
              </svg>
              <div className="mx-auto max-w-xs text-xs dark:text-jacarta-300">
                JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max
                size: 100 MB
              </div>
            </div>
            <div className="absolute inset-4 cursor-pointer rounded bg-jacarta-50 opacity-0 group-hover:opacity-100 dark:bg-jacarta-600"></div>
            <div></div>
            {/* {image && (
          <div className="absolute inset-4 cursor-pointer rounded">
            <Image className="h-[100%] object-cover" src={image} alt="image" />
          </div>
        )} */}
            <input
              type="file"
              accept="image/*,video/*,audio/*,webgl/*,.glb,.gltf"
              id="file-upload"
              onChange={(e) => handleImageChange(e, "Thump")}
              className="absolute inset-0 z-20 cursor-pointer opacity-0"
            />
          </div>
          <div>
            <div className="pTag">
              {" "}
              Thumbnail Preview (image size Must be 230X230)
            </div>
            <div className="block rounded-2.5xl w-[320px] border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
              <figure className="relative">
                <Image
                  width={230}
                  height={230}
                  src={
                    isEmpty(thumbfile) ? "/img/products/item_5.jpg" : thumbfile
                  }
                  alt="item 5"
                  className="w-full rounded-[0.625rem]"
                  loading="lazy"
                />

                <div className="absolute left-3 -bottom-3">
                  <div className="flex -space-x-2">
                    <a href="#">
                      <Image
                        width={20}
                        height={20}
                        src={
                          isEmpty(userPayload)
                            ? "/img/avatars/owner_1.png"
                            : `${Config?.IMG_URL}/user/${userPayload?.WalletAddress}/profile/${userPayload?.Profile}`
                        }
                        alt="creator"
                        className="h-6 w-6 rounded-full border-2 border-white hover:border-accent dark:border-jacarta-600 dark:hover:border-accent"
                        data-tippy-content={`Creator:${userPayload?.DisplayName}`}
                      />
                    </a>
                    {/* <a href="#">
              <Image
                width={20}
                height={20}
                src={
                  isEmpty(userPayload)
                    ? '/img/avatars/owner_1.png'
                    : `${Config?.IMG_URL}/user/${userPayload?.WalletAddress}/profile/${userPayload?.Profile}`
                }
                alt="owner"
                className="h-6 w-6 rounded-full border-2 border-white hover:border-accent dark:border-jacarta-600 dark:hover:border-accent"
                data-tippy-content={`Owner:${userPayload?.DisplayName}`}
              />
            </a> */}
                  </div>
                </div>
              </figure>
              <div className="mt-7 flex items-center justify-between">
                {/* <Link href={`/item/${props.datas.id}`}> */}
                <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white truncate">
                  {isEmpty(NFTFormValue?.NFTName)
                    ? "NFT Name"
                    : NFTFormValue?.NFTName}
                </span>
                {/* </Link> */}
              </div>
              <div className="mt-2 text-sm">
                <span className="mr-1 text-jacarta-700 dark:text-jacarta-200">
                  {isEmpty(NFTFormValue?.NFTPrice)
                    ? "0"
                    : NFTFormValue?.NFTPrice}{" "}
                  {isEmpty(NFTFormValue?.CoinName)
                    ? Config.COIN_NAME
                    : NFTFormValue?.CoinName}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
