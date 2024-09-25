// import axios  from "axios"
import config from '../../Config/config'
import { Encryptdata, Decryptdata } from "../../app/common/encryptdecrypt.js"
import { AppenData, axiosFunc } from "../../app/common/common.js"

// export const getSubscribers  = async()=>{

//   try{
//       var resp = await axios({

//               'method':'GET',
//               'url':`${config.AdminAPI}/getSubscribers`,
//       })
//       console.log("tokonwer resp",resp.data)
//       let response = Decryptdata(resp?.data)

//       return response;
//   }
//   catch(err){console.log("err in gettok owner",err)}
// }


// export const addbulkusers  = async(data)=>{
//     console.log('====================================');
//     console.log("dafatata",data);
//     console.log('====================================');
//     try{
//         var resp = await axios({

//                 'method':'post',
//                 'url':`${config.AdminAPI}/exceltomail`,
//                 'headers' : {
//                     "content-type":"multipart/form-data",
//                      "Authorization":localStorage.getItem("token")
//                 },
//                 'data' : data
//         })
//         console.log("bulk users resp",resp.data)
//         let response = Decryptdata(resp?.data)
//         return response;
//     }
//     catch(err){console.log("err in bulk users",err)}
//   }


// export const changeMaySent = async(data)=>{
//   console.log("token data",data)
//   try{
//       var resp = await axios({
//           "method":"POST",
//           "url":`${config.AdminAPI}/user/changemaysent`,
//           "headers":{
//             "Content-Type": 'application/json',

//               "Authorization":localStorage.getItem("token")
//           },
//           "data":{data:Encryptdata(data)},
//       })

//       let response = Decryptdata(resp?.data)
//         return response;
//   }
//   catch(err){
//       console.log('add token err',err)
//   }
// }

// export const changesocialstate = async(data)=>{
//     console.log("token data",data)
//     try{
//         var resp = await axios({
//             "method":"POST",
//             "url":`${config.AdminAPI}/user/changesocialstate`,
//             "headers":{
//                 "Content-Type": 'application/json',
//                 "Authorization":localStorage.getItem("token")
//             },
//             "data":{data:Encryptdata(data)},
//         })

//         let response = Decryptdata(resp?.data)
//         return response;
//     }
//     catch(err){
//         console.log('add token err',err)
//     }
//   }


// export const sendSubscriberMail = async (data) => {
//     console.log("sklfs",data)
//   try { 
//       let respData = await axios({
//           'method': 'post',
//           'url': `${config.AdminAPI}/sendSubscribeMail`,
//           "headers":{
//             "Content-Type": 'application/json',

//             "Authorization":localStorage.getItem("token")
//         },
//         "data":{data:Encryptdata(data)},
//       });

//       let response = Decryptdata(respData?.data)
//       return response;
//   }catch (error) {
//       return {
//           loading: false,
//           error : error
//       }
//   }
// }


// export const addSocial = async (data) => {
//     console.log("sklfs",data)
//   try { 
//     var formdata = AppenData(data)
//       let respData = await axios({
//           'method': 'post',
//           'url': `${config.AdminAPI}/addsociallinks`,
//           "headers":{
//             'Content-Type': 'multipart/form-data',

//             "Authorization":localStorage.getItem("token")
//         },
//         "data":formdata[0]

//       });

//       let response = Decryptdata(respData?.data)
//       return response;
//   }catch (error) {
//       console.log("errr")
//   }
// }


// export const getSocialData  = async()=>{

//     try{
//         var resp = await axios({

//                 'method':'GET',
//                 'url':`${config.AdminAPI}/getsociallinks`,
//         })
//         console.log("tokonwer resp",resp.data)
//       let response = Decryptdata(resp?.data)

//         return response;
//     }
//     catch(err){console.log("err in gettok owner",err)}
//   }



//   export const editDeleteSocial = async(data)=>{
//     console.log("token data",data)
//     let formdata = AppenData(data)
//     try{
//         var resp = await axios({
//             "method":"POST",
//             "url":`${config.AdminAPI}/editdeletesocial`,
//             "headers":{
//                 "Content-Type": 'application/json',

//                 "Authorization":localStorage.getItem("token")
//             },
//             "data": data.action == "edit" ? formdata[0]:{data:Encryptdata(data)}
//             // {data:Encryptdata(data)},
//         })

//         let response = Decryptdata(resp?.data)
//         return response;
//     }
//     catch(err){
//         console.log('add token err',err)
//     }
//   }


// export const getUserList  = async()=>{

//     try{
//         var resp = await axios({

//                 'method':'GET',
//                 'url':`${config.AdminAPI}/getuserlist`,
//         })
//         console.log("tokonwer resp",resp.data[0])
//         let response = Decryptdata(resp?.data)

//         return response;
//     }
//     catch(err){console.log("err in gettok owner",err)}
//   }


//   export const adminAccess = async(data)=>{
//     console.log("token data",data)
//     try{
//         var resp = await axios({
//             "method":"POST",
//             "url":`${config.AdminAPI}/user/changeadminstatus`,
//             "headers":{
//                 "Content-Type": 'application/json',

//                 "Authorization":localStorage.getItem("token")
//             },
//             "data":{data:Encryptdata(data)},
//         })

//         let response = Decryptdata(resp?.data)
//         return response;
//     }
//     catch(err){
//         console.log('add token err',err)
//     }
//   }


//   export const getFaqList  = async()=>{

//     try{
//         var resp = await axios({

//                 'method':'GET',
//                 'url':`${config.AdminAPI}/getfaqlist`,
//         })
//         console.log("tokonwer resp",resp.data)
//         let response = Decryptdata(resp?.data)

//         return response;
//     }
//     catch(err){console.log("err in gettok owner",err)}
//   }


//   export const addFaqCall = async(data)=>{
//     console.log("token data",data)
//     try{
//         var resp = await axios({
//             "method":"POST",
//             "url":`${config.AdminAPI}/addfaq`,
//             "headers":{
//                 "Content-Type": 'application/json',

//                 "Authorization":localStorage.getItem("token")
//             },
//             "data":{data:Encryptdata(data)},
//         })

//         let response = Decryptdata(resp?.data)
//         return response;
//     }
//     catch(err){
//         console.log('add token err',err)
//     }
//   }

//   export const getFaqContentsList  = async()=>{

//     try{
//         var resp = await axios({

//                 'method':'GET',
//                 'url':`${config.AdminAPI}/getfaqcontentslist`,
//         })
//         console.log("tokonwer resp",resp.data)
//         let response = Decryptdata(resp?.data)

//         return response;
//     }
//     catch(err){console.log("err in gettok owner",err)}
//   }

//   export const addFaqcontentCall = async(data)=>{
//     console.log("token data",data)
//     try{
//         var resp = await axios({
//             "method":"POST",
//             "url":`${config.AdminAPI}/addfaqcontent`,
//             "headers":{
//                 "Content-Type": 'application/json',

//                 "Authorization":localStorage.getItem("token")
//             },
//             "data":{data:Encryptdata(data)},
//         })

//         let response = Decryptdata(resp?.data)
//         return response;
//     }
//     catch(err){
//         console.log('add token err',err)
//     }
//   }

//   export const getnfttags = async (filterData) => {
//     console.log('yes')
//     try {
//         let respData = await axios({
//             'method': 'get',
//             'url': `${config.AdminAPI}/getnfttag`,

//         });

//         console.log("respData",respData.data)
//         let response = Decryptdata(respData?.data)

//        return response;
//     }
//     catch (err) {
//         return {
//             loading: false,
//             error: err.response.data.errors
//         }
//     }
// }


// export const editNftTags = async(payload)=>{
//     console.log("paylaod to edittag",payload)
//     try{
//         var resp = await axios({
//             "method":"POST",
//             "url":`${config.AdminAPI}/editnfttag`,
//             "headers":{
//                 "Content-Type": 'application/json',

//                 "Authorization":localStorage.getItem("token")
//             },
//             "data":{data:Encryptdata(payload)}
//         })

//         console.log("reponse",resp.data)
//         let response = Decryptdata(resp?.data)
//         return response;
//     }catch(err){
//         console.log("err",err)
//     }
//     }



// export const ArtistAdd = async (data)=> {
//     console.log("datatatatatat",data);
//     var formdata = new FormData()
//     formdata.append('ArtistName',data.ArtistName)
//     formdata.append('WalletAddress',data.WalletAddress)
//     formdata.append('ArtistUrl',data.ArtistUrl)
//     formdata.append('ArtistBanner',data.ArtistBanner)
//     formdata.append('ArtistProfile',data.ArtistProfile)
//     formdata.append('ArtistBio',data.ArtistBio)
//     formdata.append('twitter',data.twitter)
//     formdata.append('facebook',data.facebook)
//     formdata.append('youtube',data.youtube)
//     formdata.append('instagram',data.instagram)
//     formdata.append('heading1',data.heading1)
//     formdata.append('heading2',data.heading2)
//     formdata.append('bio1',data.bio1)
//     formdata.append('bio2',data.bio2)
//     formdata.append('image2',data.image2)
//     formdata.append('image1',data.image1)
//     formdata.append('from',data.from)

//     formdata.append('ArtistNotableDescription',data.ArtistNotableDescription)

//     try{
//         var resp = await axios({
//             "method":"POST",
//             "url":`${config.AdminAPI}/user/ArtistAdd`,
//             "headers":{
//                 // "Authorization":localStorage.getItem("token"),
//                 'Content-Type': 'multipart/form-data',

//             },
//             "data":formdata
//         })
//         let response = Decryptdata(resp?.data)
//         return response;
//     }catch(err){
//         console.log("err",err)
//     }
// }
// export const ArtistList = async (data)=> {

//     try{
//         var resp = await axios({
//             "method":"GET",
//             "url":`${config.AdminAPI}/user/ArtistList`,

//         })
//         let response = Decryptdata(resp?.data)

//         return response;

//     }catch(err){
//         console.log("err",err)
//     }
// }
// export const TokenList =  async (data)=>{
//     try{
//         var resp = await axios({
//             "method":"GET",
//             "url":`${config.AdminAPI}/gettokencheck`,
//             params : data
//         })

//         let response = Decryptdata(resp?.data)
//         console.log("responseess",response,resp.data);
//         return response;
//     }catch(err){
//         console.log("err",err)
//     }
// }

// export const NPOLIST = async (data)=>{
//     try{
//         var resp = await axios({
//             "method":"GET",
//             "url":`${config.AdminAPI}/token/npolist`,
//         })
//         let response = Decryptdata(resp?.data)

//         return response
//     }catch(err){
//         console.log("err",err)
//         return false

//     }
// }


// export const NPOAdd = async (data)=> {
//     var formdata = new FormData()
//     formdata.append('NPO_DisplayName',data.NPO_DisplayName)
//     formdata.append('NPO_CustomUrl',data.NPO_CustomUrl)
//     formdata.append('NPO_Cover',data.NPO_Cover)
//     formdata.append('NPO_Profile',data.NPO_Profile)
//     formdata.append('NPO_Bio',data.NPO_Bio)
//     formdata.append('twitter',data.twitter)
//     formdata.append('facebook',data.facebook)
//     formdata.append('youtube',data.youtube)
//     formdata.append('instagram',data.instagram)
//     formdata.append('from',data.from)
//     formdata.append('NPO_Address',data.NPO_Address)

//     try{
//         var resp = await axios({
//             "method":"POST",
//             "url":`${config.AdminAPI}/token/nopadd`,
//             "headers":{
//                 // "Authorization":localStorage.getItem("token"),
//                 'Content-Type': 'multipart/form-data',

//             },
//             "data":formdata
//         })
//         let response = Decryptdata(resp?.data)
//         return response;
//     }catch(err){
//         console.log("err",err)
//     }
// }

// export const FindpromoDrop = async() => {
//     try{
//         var resp = await axios({
//             "method":"GET",
//             "url":`${config.Back_Url}/bulk/FindpromoDrop`,
//         })
//        let response = Decryptdata(resp?.data)
//         return response;
//     }catch(err){
//         console.log("err",err)
//         return false

//     }
// }
// export const getDroppromoList = async(data) => {
//     console.log("dsjdjaskdhhaskdkashdkas",data)
//     try{
//         var resp = await axios({
//             "method":"GET",
//             "url":`${config.Back_Url}/bulk/getDroppromoList`,
//             "params" : data
//         })
//         let response = Decryptdata(resp?.data)
//         return response;
//     }catch(err){
//         console.log("err",err)
//         return false

//     }
// }



// export const generate = async(data) => {
//     try{
//         var resp = await axios({
//             "method":"post",
//             "url":`${config.Back_Url}/bulk/generate`,
//             "headers": {
//                 "Content-Type": 'application/json'
//             },
//             "data" : {data:Encryptdata(data)}
//         })
//         let response = Decryptdata(resp?.data)
//         return response;
//     }catch(err){
//         console.log("err",err)
//         return false

//     }
// }

// export const SendMails = async(data) => {
//     try{
//         var resp = await axios({
//             "method":"post",
//             "url":`${config.Back_Url}/user/SendMails`,
//             "headers": {
//                 "Content-Type": 'application/json'
//             },
//             "data" : {data:Encryptdata(data)}
//         })
//         let response = Decryptdata(resp?.data)
//         return response;
//     }catch(err){
//         console.log("err",err)
//         return false

//     }
// }
// export const GetUsersData = async(data) => {
//     try{
//         var resp = await axios({
//             "method":"get",
//             "url":`${config.Back_Url}/user/GetUsersData`,
//             })
//         let response = Decryptdata(resp?.data)

//         return response
//     }catch(err){
//         console.log("err",err)
//         return false

//     }
// }


// export const CheckBalance = async(data) => {
//     try{
//         var resp = await axios({
//             "method":"post",
//             "url":`${config.Back_Url}/bulk/CheckBalance`,
//             "headers": {
//                 "Content-Type": 'application/json'
//             },
//             "data" : {data:Encryptdata(data)}
//         })
//         let response = Decryptdata(resp?.data)
//         return response;
//     }catch(err){
//         console.log("err",err)
//         return false

//     }
// }


// export const getReferral = async(data) => {
//     try{
//         var resp = await axios({
//             "method":"GET",
//             "url":`${config.AdminAPI}/getReferralPersentage`,
//             "data" :  data
//         })
//         let response = Decryptdata(resp?.data)
//         return response;
//     }catch(err){
//         console.log("err",err)
//         return false
//     }
// }

// export const addReferalPersentage = async(data) => {
//     try{
//         var resp = await axios({
//             "method":"GET",
//             "url":`${config.AdminAPI}/addReferalPersentage`,
//             params :  data
//         })
//         let response = Decryptdata(resp?.data)
//         return response;
//     }catch(err){
//         console.log("err",err)
//         return false
//     }
// }

// //tokonomics
// export const addTokonomics = async(data) => {
//     console.log("datsdfdf",data);
//     try{
//         var resp = await axios({
//             "method":"post",
//             "url":`${config.AdminAPI}/addtokonomics`,
//             data :  {data:Encryptdata(data)}
//         })
//         let response = Decryptdata(resp?.data)
//         // resp?.data

//         return response;
//     }catch(err){
//         console.log("err",err)
//         return false
//     }
// }

// export const getTokomics = async(data) => {
//     try{
//         var resp = await axios({
//             "method":"GET",
//             "url":`${config.AdminAPI}/gettokonomics`,
//             "data" :  data
//         })
//         let response = Decryptdata(resp?.data)
//         return response;
//     }catch(err){
//         console.log("err",err)
//         return false
//     }
// }
export const Category = async (data) => {
    var senddata = {
        method: 'GET',
        url: `${config.ADMIN_URL}/getcategory`,
        params: { data: Encryptdata(data) }
    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)
    return Resp.data
}
export const Currency = async (data) => {
    var senddata = {
        method: 'get',
        url: `${config.ADMIN_URL}/currencylist`,
        params: data
    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp?.data)

    return Resp.data
}
export const USDPRICE = async (data) => {
    var senddata = {
        'method': 'get',
        'url': `https://min-api.cryptocompare.com/data/price?fsym=${data}&tsyms=USD`,
    }
    let Resp = await axiosFunc(senddata);

    return Resp?.data?.USD;
}
export const TOKENPRICE = async (data) => {
    var senddata = {
        'method': 'get',
        'url': `https://api.pancakeswap.info/api/v2/tokens/${data}`,
    }
    let Resp = await axiosFunc(senddata);

    return Resp?.data?.data?.price;
}
export const getCmsContent = async (data) => {
    // debugger
    console.log('dataaaaa', data)

    try {
        var resp = await axiosFunc({

            'method': 'GET',
            'url': `${config.ADMIN_URL}/getcmslist`,

            'params': data ? { data: Encryptdata(data) } : {}
        })
        console.log("tokonwer resp", resp.data)
        let response = Decryptdata(resp.data)
        console.log("ressssss", response);
        return response;
    }
    catch (err) { console.log("err in gettok owner", err) }

}

export const getarticle = async (data) => {
    try {
        var resp = await axiosFunc({
            "method": "get",
            "url": `${config.ADMIN_URL}/getarticle`,
            "params": data
        })
        let response = Decryptdata(resp.data)
        return response;
    }
    catch (err) {
        throw err
    }
}

export const getabouuser = async (data) => {
    try {
        var resp = await axiosFunc({
            "method": "get",
            "url": `${config.ADMIN_URL}/getaboutuser`,
            "params": { data: Encryptdata(data) }
        })
        let response = Decryptdata(resp.data)
        return response;
    }
    catch (err) {
        throw err
    }
}

export const roadmaplist = async (data) => {
    try {
        var resp = await axiosFunc({
            "method": "post",
            "url": `${config.ADMIN_URL}/roadmaplist`,
            'headers': {

                "Content-Type": 'application/json'
            },
            "data": { data: Encryptdata(data) }
        })
        let response = Decryptdata(resp.data)
        return response;
    }
    catch (err) {
        throw err
    }
}

export const Sociallinks = async () => {

    var senddata = {
        method: 'get',
        url: `${config.BACK_URL}/user/social`
    }
    let Resp = await axiosFunc(senddata);
    Resp.data = Decryptdata(Resp.data)
    return Resp.data;
}

export const Newsletter = async (data) => {
    var senddata = {
        method: 'POST',
        url: `${config.BACK_URL}/user/newsletter`,
        'headers': {
            "Content-Type": 'application/json',
        },
        data: { data: Encryptdata(data) }
    }
    console.log('hdghgh', senddata)
    let Resp = await axiosFunc(senddata);
    Resp.data = Decryptdata(Resp.data)

    return Resp.data;
}

export const getrelatedpostarticle = async (data) => {
    console.log("getrelatedpostarticle", data)
    try {
        var resp = await axiosFunc({
            "method": "get",
            "url": `${config.ADMIN_URL}/getrelatedpostarticle`,
            "params": data
        })
        let response = Decryptdata(resp.data)
        return response;
    }
    catch (err) {
        throw err
    }
}

//contactus
export const getContactus = async (data) => {
    console.log("contact_data", data)
    try {
        let resp = await axiosFunc({
            "method": "post",
            "url": `${config.ADMIN_URL}/contactus`,
            "data": { data: Encryptdata(data) }
        })
        let response = Decryptdata(resp?.data)
        return response;
    } catch (error) {
        throw error
    }
}

export const Joinusteamlist = async (data) => {
    console.log("contact_data", data)
    try {
        let resp = await axiosFunc({
            "method": "get",
            "url": `${config.ADMIN_URL}/getaboutuser`,
            headers : {
                'content-type' : 'application/json'
            }
        })
        console.log("🚀 ~ Joinusteamlist ~ resp:", resp)
        let response = Decryptdata(resp?.data)
        console.log("🚀 ~ Joinusteamlist ~ response:", response)
        return response;
    } catch (error) {
        throw error
    }
}

export const Joinusteamlistfront = async (data) => {
    console.log("contact_data", data)
    try {
        let resp = await axiosFunc({
            
            "method": "get",
            "url": `${config.ADMIN_URL}/Joinusteamlistfront`,
            "params": data
        })
        let response = Decryptdata(resp?.data)
        return response;
    } catch (error) {
        throw error
    }
}

export const getFaqList = async () => {

    try {
        var resp = await axiosFunc({

            'method': 'GET',
            'url': `${config.ADMIN_URL}/getfaqlist`,
        })
        console.log("tokonwer resp", resp.data)
        let response = Decryptdata(resp.data)
        return response;
    }
    catch (err) { console.log("err in gettok owner", err) }
}