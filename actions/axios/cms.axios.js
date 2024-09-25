import config from '@/Config/config'
import {axiosFunc ,Decryptdata,Encryptdata } from '@/actions/common'


export const Category    =   async   (data)  =>  {
    var senddata    =   {
        method  :   'GET',
        url     :   `${config.ADMIN_URL}/getcategory`,
        }
    let Resp    =   await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)
    return Resp.data
}
export const Currency    =   async   (data)  =>  {
    var senddata    =   {
        method  :   'get',
        url     :   `${config.ADMIN_URL}/currencylist`
        }
    let Resp    =   await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)
    return Resp.data
}
export const USDPRICE = async (data) =>{
    var senddata ={
        'method': 'get',
        'url': `https://min-api.cryptocompare.com/data/price?fsym=${data}&tsyms=USD`,  
    }
    let Resp = await axiosFunc(senddata);
    
    return Resp.data?.USD;
}
export const TOKENPRICE = async (data) =>{
    var senddata ={
        'method': 'get',
        'url': `https://api.pancakeswap.info/api/v2/tokens/${data}`,  
    }
    let Resp = await axiosFunc(senddata);
    
    return Resp?.data?.data?.price;
}
export const getCmsContent  = async(data)=>{
    
    try{
        var resp = await axiosFunc({
          
                'method':'GET',
                'url':`${config.ADMIN_URL}/cmslist`,
                'params':{data:data}
        })
        return resp.data;
    }
    catch(err){console.log("err in gettok owner",err)}

}

export const getarticle=async(data)=>{
    try{
        var resp = await axiosFunc({
            "method":"get",
            "url":`${config.ADMIN_URL}/getarticle`,
            "params" : data
        })
        return resp.data  
    }
    catch(err){
       throw err
    }
}

export const getnftarticle=async(data)=>{
    try{
        var resp = await axiosFunc({
            "method":"get",
            "url":`${config.ADMIN_URL}/getnftarticle`,
            "params" : data
        })
        return resp?.data  
    }
    catch(err){
       throw err
    }
}

export const getuserregister=async(data)=>{
    try{
        var resp = await axiosFunc({
            "method":"get",
            "url":`${config.BACK_URL}/user/getuserregister`,
            "params" : data
        })
        return resp.data  
    }
    catch(err){
       throw err
    }
}


export const getblogCatList  = async(data)=>{
    try{
        var resp = await axiosFunc({
          
                'method':'get',
                'url':`${config.BACK_URL}/user/userblogcategorylist`,
                "params" : data
        })
        return resp?.data;
    }
    catch(err){console.log("err in gettok owner",err)}
}

export const nftpopulartaglist  = async(data)=>{
    try{
        var resp = await axiosFunc({
          
                'method':'get',
                'url':`${config.BACK_URL}/user/nftpopulartaglist`,
                "params" : data
        })
        return resp?.data;
    }
    catch(err){console.log("err in nftpopulartaglist ",err)}
}

export const getphaselist = async () =>{
    var senddata = {
        method : 'GET',
        url    : `${config.ADMIN_URL}/phaselist`,
     
       
    }

    let Resp   = await axiosFunc(senddata)
    // Resp.data = Decryptdata(Resp.data)
    return Resp.data
}


// export const getphaselist = async(data) => {
//     try{
//         var resp = await axios({
//             "method":"get",
//             "url":`${config.AdminAPI}/phaselist`,
//             })
//         return resp.data
//     }catch(err){
//         console.log("err",err)
//         return false

//     }
// }
export const listhelpcenter  = async(data)=>{
    

    console.log("listhelpcenter",data)
    try{
        var resp = await axiosFunc({
          
                'method':'GET',
                'url':`${config.ADMIN_URL}/listhelpcenter`,
                'params':data
     
    
        })
        console.log("listhelpcenter resp",resp.data)
        return resp.data;
    }
    catch(err){console.log("err in listhelpcenter",err)}
}

export const articledetail =async(data)=>{
    console.log("datainaxiosarticeledetails" , data )
    try{
        var resp = await axiosFunc({
            "method":"GET",
            "url":`${config.ADMIN_URL}/articledetail`,
            "params" : { data : Encryptdata(data) }
        })
        console.log("sdsgdshhh" , resp.data)
        return resp.data  
    }
    catch(err){
        console.log("errorinaxiosarticle", err)
       throw err
    }
}

export const findhelpdetails  = async(data)=>{
    

    console.log("listhelpcenter",data)
    try{
        var resp = await axiosFunc({
          
                'method':'GET',
                'url':`${config.ADMIN_URL}/findhelpdetails`,
                'params':data
     
    
        })
        console.log("findhelpdetails resp",resp.data)
        return resp.data;
    }
    catch(err){console.log("err in listhelpcenter",err)}
}


export const getheaderfooter = async () => {
    try {
        var resp = await axiosFunc({

            'method': 'GET',
            'url': `${config.ADMIN_URL}/headerfooter`,

        })
        console.log("tokonwerheader-footer", resp.data)
        return resp.data;
    }
    catch (err) { console.log("err in gettok owner", err) }
}