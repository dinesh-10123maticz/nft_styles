import axios from "axios";
import Config from "@/Config/config"
import React, {
  useState,

} from "react";
import config from '@/Config/config'
import CryptoJS, { AES, enc } from "crypto-js";


export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0) ||
  (typeof value === "string" && value === "0") ||
  (typeof value === "number" && value === 0);


export const address_showing = (item) => {
  if (item && item.toString().length > 10) {
    var slice_front = item.slice(0, 9);
    var slice_end = item.slice(item.length - 9, item.length - 1);
    return slice_front + "...." + slice_end;
  } else return item;
};
export const Name_showing = (item) => {
  if (item && item.toString().length > 15) {
    var slice_front = item.slice(0, 14);
    return slice_front + "....";
  } else return item;
};

export const copydata = (data) => {
  var copyText = data;
  navigator?.clipboard?.writeText(copyText);
  return copyText;
};

export const NumANdDotOnly = (data) => {
  var data = data.toString();
  var str = data
    ? data.includes(".")
      ? data.split(".").length >= 3
        ? (data.split(".")[0] + "." + data.split(".")[1]).toString()
        : data
      : data
    : data;
  return str.toString().replace(Config.NumDigitOnly, "");
};

export const NumberOnly = (data) => {
  return data.toString().replace(Config.NumberOnly, "");
};

function getFileExtension(filename) {
  return filename?.split('.').pop();
}

export const AppenData = (data) => {
  
  var formdata = new FormData()
  var SendDta = Object.entries(data).map((item) => {
      if (Array.isArray(item[1])) {
          var come = item[1].map((data) => {
              if (data?.type && data?.size) {
                  formdata.append(item[0], data)
              }
              else {
                  formdata.append(item[0], Encryptdata(data))

              }
              return formdata
          })
          return come

      }
      else {
      
          if (  getFileExtension(item[1]?.name) == 'glb' || (item[1]?.type && item[1]?.size)) {
              //file type
              formdata.append(item[0], item[1])
          }
          else {
              formdata.append(item[0], Encryptdata(item[1]))

          }
          return formdata
      }
  })
  return SendDta
}


// Common Axios Function
export const axiosFunc = async (data) => {
  try {
    let Resp = await axios(data);
    return Resp;
  } catch (e) {
    return { success: "error", msg: null };
  }
};

export function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return x;
}
export const ImgValidation = (data,img) =>{
  let { type , size } = data
  if(img == 'thumb')
      {
          if(!type.includes('image')) return 'File Must be Image'
          if(size >= 1024 * 1024 * 5) return 'File Must be Less than 5 Mb'
      }   
  else{
      if(img == 'pro') if(size >= 1024 * 1024 * 48) return 'File Must be Less than 50 Mb'
      else if(size >= 1024 * 1024 * 48) return 'File Must be Less than 50 Mb'

  }
}
export default function ImgAudVideo({
  file,
  type,
  classname,
  thumb,
  origFile,
  from,
  noimg,
  page,
  glb
}) {
  var [Check,setCheck] = useState(false)
  const Audioaction =()=>{
    var aud = document.getElementById("nftaudio");
    if(Check==false){
      aud.play();
      setCheck(!Check)
    }
    else{
      aud.pause();
      setCheck(!Check)
    }
  }
  return file ? (
    type === "image" ? (
      <img
        src={file}
        alt="img"
        className={classname}
        onContextMenu="return false;"
        onError={event => {
          event.target.src = origFile
        }}
      />
    ) : type === "video" ? (
      <video
        loop={true}
        controlsList="nodownload"
        
        autoPlay={true}
        controls = {page ? false  : true }
        muted =  
        {page ? true  : true }
        poster={thumb}
        onContextMenu="return false;"
        type="video/*"
        src={file}
        onError={event => {
          event.target.src = origFile
        }}
      >
      </video>
    ) : type === "audio" ? (
      <>
        {" "}
        <img src={thumb} alt="favicon" onClick={Audioaction} className={classname} />
        <audio
          controlsList="nodownload"
          id="nftaudio" className="auid_pos_cen"
          controls 
          // autoPlay
          // loop
          // muted
          src={file}
        >
        </audio>
      </>
    ) :  (
      < MediaRenderer style={from == "model" && {objectFit:"cover", objectPosition:"center"}}  autoPlay={true} preload={`${config.IMG_URL}/nft/${glb?.NFTCreator}/Compressed/NFT_THUMB/${glb?.CompressedThumbFile}`} src={from == "model" ? `${config.IMG_URL}/nft/${glb?.NFTCreator}/Compressed/NFT_THUMB/${glb?.CompressedThumbFile}` : config.IPFS + glb?.NFTOrginalImageIpfs}  poster={config.IPFS + glb?.NFTOrginalImageIpfs}   controls={true}   height={from == "model" ?  "100%" : "100%"}  width={from == "model" ? "100%" :"100%"} alt={"loading"}/>

    )
  ) : (
    <img src={noimg} alt="noimg" className={classname} />


  )
}
export  const DateTimeForm = (date,datealone,timealone,ampm) => {
  try{
    if(datealone){
      return `${MinuteHourFormat(new Date(date)?.getDate())}/${MinuteHourFormat(new Date(date)?.getMonth()+1)}/${MinuteHourFormat(new Date(date)?.getFullYear())}`
    }
    else if(timealone){
      if(ampm){
        return `${MinuteHourFormat(new Date(date)?.getHours() > 12 ? new Date(date)?.getHours() - 12 : new Date(date)?.getHours()) }:${MinuteHourFormat(new Date(date)?.getMinutes())} ${new Date(date)?.getHours() >= 12 ? 'p.m' : 'a.m' }`
      }
      else{
        return `${MinuteHourFormat(new Date(date)?.getHours())}:${MinuteHourFormat(new Date(date)?.getMinutes())} `
      }
    }
    else if(ampm){
      return `${MinuteHourFormat(new Date(date)?.getDate())}/${MinuteHourFormat(new Date(date)?.getMonth()+1)}/${MinuteHourFormat(new Date(date)?.getFullYear())}, ${new Date(date)?.getHours()}:${new Date(date)?.getMinutes() } ${new Date(date)?.getHours() >= 12 ? 'p.m' : 'a.m'} `
    }
    return `${new Date(date)?.getDate()}:${new Date(date)?.getMonth()+1}:${new Date(date)?.getFullYear()},${new Date(date)?.getHours()}:${new Date(date)?.getMinutes()} `
  }
  catch(err){
    return "No Date"
  }
}
export const MinuteHourFormat = (data) => {
  return ((Number(isEmpty(data) ? 0 : data ) < 10 ? '0' : '')+data)
}

export const Encryptdata = (data) => {
  const encJson = CryptoJS.AES.encrypt(JSON.stringify(data), config.ENCODEKEY).toString();
  const encData = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(encJson)
  );
  return encData;
}

export const Decryptdata = (data) => {
  try{

  const decData = CryptoJS.enc.Base64.parse(data)?.toString(CryptoJS.enc.Utf8);
  const bytes = CryptoJS.AES.decrypt(decData, config.ENCODEKEY).toString(CryptoJS.enc.Utf8);
  return JSON.parse(bytes)
  }
  catch(e){
    return ''
  }
}

export function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
      return interval + " year" + (interval > 1 ? "s" : "") + " ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
      return interval + " month" + (interval > 1 ? "s" : "") + " ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
      return interval + " day" + (interval > 1 ? "s" : "") + " ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
      return interval + " hour" + (interval > 1 ? "s" : "") + " ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
      return interval + " minute" + (interval > 1 ? "s" : "") + " ago";
  }
  return Math.floor(seconds) + " second" + (seconds > 1 ? "s" : "") + " ago";
}


export async function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const fileURL = URL.createObjectURL(file);
    img.src = fileURL;
    img.onload = function () {
      const width = img.width;
      const height = img.height;
      resolve({ width, height });
    };
  });
}