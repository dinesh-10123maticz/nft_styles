import axios from 'axios'
// import Config from '../views/config/config'
// import { connectWallet } from '../views/hooks/useWallet';
// import { Category, Currency, USDPRICE, TOKENPRICE} from '../actions/axioss/cms.axios'
// import CopyToClipboard from "react-copy-to-clipboard";

// import { useSelector ,useDispatch } from "react-redux";
// import { getFormLabelUtilityClasses } from '@mui/material';
import { Encryptdata } from './encryptdecrypt';

export const isEmpty = value =>
value === undefined ||
value === null ||
(typeof value === 'object' && Object.keys(value).length === 0) ||
(typeof value === 'string' && value.trim().length === 0) ||
(typeof value === 'string' && Number(value) === 0)||
(typeof value === 'number' && Number(value) === 0);


// Address cut function like 0x123...345
// export const address_showing=(item)=>{
//     if(item&&item.toString().length>10){
//     var slice_front = item.slice(0,9)
//     var slice_end  = item.slice(item.length-9,item.length-1)
//     return slice_front+'....'+slice_end
//     }
//     else return item
// }

// export const Name_showing=(item)=>{
// if(item&&item.toString().length>10){
// var slice_front = item.slice(0,9)
// // var slice_end  = item.slice(item.length-9,item.length-1)
// return slice_front+'....'
// }
// else return item
// }

// export const NumWithSpecificDecimal = (data) => {
//   var data = data.toString()
//   var str = data ? data.includes('.') ? data.split('.').length >= 3 ? (data.split('.')[0] + '.' + data.split('.')[1]).toString() : data : data : data
//   console.log('dsuiufuidfkdhkffnnn',str.toString().replace(Config.DecimalAlloweddigits, ''))
//   if(Config.DecimalAlloweddigits.test(data)) return data
//   else return ''

// }
// Copy Text
// export const copydata = (data) =>{
//   // <CopyToClipboard
//   //                     text={data}
//   //                     onCopy={() =>
//   //                       toast.success("Address Copied")
//   //                     } >

//   //                     <i className="fas fa-sticky-note notes_fa cur_pointer"></i>
//   //                   </CopyToClipboard>
//     // var copyText = data;
//     //  navigator.clipboard.writeText(copyText);
//      //toast.success("Copied Successfully")
// }

// export const NumANdDotOnly = (data) => {
//   var data = data.toString()
//  var str = data ? data.includes('.') ? data.split('.').length >=3 ? (data.split('.')[0] + '.' + data.split('.')[1]).toString() : data : data : data
//    return str.toString().replace(Config.NumDigitOnly,'')
//  }

// export const NumberOnly = (data) => {
//   return data.toString().replace(Config.NumberOnly,'')
// }

// Common Formdata function
export const AppenData = (data) => {
  var formdata = new FormData()
  var SendDta = Object.entries(data).map((item) => {
      if (Array.isArray(item[1])) {
          var come = item[1].map((data) => {
              if (data?.type && data?.size) {
                  //file
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
          if (item[1]?.type && item[1]?.size) {
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
export const axiosFunc    =   async   (data)  =>  {
  try{
      let Resp    =   await axios(data)
      // console.log('resppppp',Resp,data)
      return Resp
  }
  catch(e){
      return {success:'error',msg:null}
  }
}

// export const switchnetwork=async(chainid,switched)=>{
//   // const dispatch=useDispatch()
//   var obj= await connectWallet(localStorage.getItem("walletConnectType"),chainid,"switched")
//   console.log("localStorage.getItem",localStorage.getItem("walletConnectType"),chainid,"switched");
//   // }else{
//     // var obj= await connectWallet(localStorage.getItem("walletConnectType"),e)
//   // }
//   console.log("OOOOBBJJ",obj)
//   const chainId = await obj.web3.eth.getChainId();
//   if(chainId == chainid){
//    var currency=await  getcurrency(chainid)
//     return({
//       status : true,
//       data : {
//       type: "Account_Section",
//       Account_Section: {AccountDetails:obj}
      
//       },
//       currency : currency
//   })
//   }
//   else{
//     return ({status :false,msg  : " Please switch network"})
//   }
// }
// export const getcurrency=async (chainid)=>{
//   // const {Network} = useSelector((state)=>state.LoginReducer)
//   console.log("NETWORKssddsds",chainid);
//   let Resp = await Currency();
    
//         if (Resp?.msg) {
//           var sen = [];
//           var bnb=Resp?.msg.filter((item)=> item.ChainId == Config?.BNBCHAIN)
//           var eth=Resp?.msg.filter((item)=> item.ChainId == Config?.ETHCHAIN)
//           console.log('aaaaaaasssssssssssssssssssssssssaa',sen,bnb,eth)
//           var bnbdatas = await Promise.all(
//             bnb[0]?.CurrencyDetails ||
//               []?.map(async (data) => {
//                 if (data.label == "BNB" || data.label == "ETH")
//                   var USD = await USDPRICE(data.label);
//                 else var USD = await TOKENPRICE(data.address);
//                 sen.push({
//                   value: data.value,
//                   label: data.label,
//                   address: data.address,
//                   usd: USD ? USD : 0,
//                   decimal: data.decimal,
//                 });
//               })
//           );
//           var ethdatas = await Promise.all(
//             eth[0]?.CurrencyDetails ||
//               []?.map(async (data) => {
//                 if (data.label == "BNB" || data.label == "ETH")
//                   var USD = await USDPRICE(data.label);
//                 else var USD = await TOKENPRICE(data.address);
//                 sen.push({
//                   value: data.value,
//                   label: data.label,
//                   address: data.address,
//                   usd: USD ? USD : 0,
//                   decimal: data.decimal,
//                 });
//               })
//           );
//           console.log('aaaaaaasssssssssssssssssssssssss',sen,bnbdatas,ethdatas,chainid)
//           return({
//             type: "Register_Section",
//             Register_Section: {
//               currency : chainid == Config.BNBCHAIN ?  bnbdatas : ethdatas 
//             },
//           });
//         }
// }