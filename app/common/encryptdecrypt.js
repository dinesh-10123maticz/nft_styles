
import CryptoJS, { AES, enc } from "crypto-js";

// import {encodekey} from '../../views/config/config' ;

// config

import config from '../../Config/config'


// let config ={}
// config.ENCODEKEY = "answerkey"
export const Encryptdata = (data) => {
  console.log("encodekeyysss" , config.ENCODEKEY)
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
  