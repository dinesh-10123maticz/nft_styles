
import config from '@/Config/config'
import {axiosFunc, AppenData ,Encryptdata, Decryptdata} from '../common'

var token ; 

export const GetUserCookieToken = () => {
    token = document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=')
        return parts[0] === "token" ? decodeURIComponent(parts[1]) : r
      }, '');
}

export const userRegister    =   async   (data)  =>  {
    console.log("UserRegister is Calling",data)
    var formdata = AppenData(data)
    var senddata    =   {
        method  :   'post',
        url     :   `${config.BACK_URL}/user/create`,
        data    :   formdata[0],
        'headers': {
            'Content-Type': 'multipart/form-data',
            'Authorization': token
          }
    }
    
    let Resp    =   await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)
    // console.log('resppp',Resp,senddata,data)
    return Resp.data
}

export const Token_MyList_Func    =   async (data)  =>  {
    console.log("Token_MyList_Func" , data)

    var senddata    =   {
        method  :   'GET',
        url     :   `${config.BACK_URL}/nft/myItemList`,
        params  :   {data : Encryptdata(data)}
        }


    let Resp    =   await axiosFunc(senddata)
    
    Resp.data   = Decryptdata(Resp.data)
    return Resp.data
}


export const Newsletter = async (data) =>{
    // let datas = Encryptdata(data)
console.log("dataaass",data)
    var senddata = {
        method  :   'post',
        url     :   `${config.BACK_URL}/user/newsletter`,
        'headers': {
            'contentype':'application/json',
        },
        data   : {data : Encryptdata(data)},
    }
    console.log('hdghgh',senddata)

    let Resp = await axiosFunc(senddata);
    Resp.data = Decryptdata(Resp.data);
    return Resp.data;
}
export const Tokenviewcount    =   async   (data)  =>  {
    let datas = Encryptdata(data)
    var senddata    =   {
        method  :   'GET',
        url     :   `${config.BACK_URL}/nft/Tokenviewcount`,
        params  :  { data : datas}
        }
    let Resp    =   await axiosFunc(senddata)
        Resp.data = Decryptdata(Resp.data)
    return Resp.data
}



export const report = async (data) =>{
    let    datas = Encryptdata(data)
       var senddata ={
           'method': 'post',
           'url':  `${config.BACK_URL}/nft/report`,
           data:{data: datas}
       }
       let Resp = await axiosFunc(senddata);
       Resp.data = Decryptdata(Resp.data)
       
       return Resp?.data;
   }
   

   export const getFaqList  = async()=>{
    
    try{
        var resp = await axiosFunc({
          
                'method':'GET',
                'url':`${config.ADMIN_URL }/faqlist`,
        })
        console.log("tokonwergetfaqlistresp",resp.data)
        return resp.data;
    }
    catch(err){console.log("err in gettok owner",err)}
  }
  
//   export const getFaqcontentList  = async()=>{
    
//     try{
//         var resp = await axiosFunc({
          
//                 'method':'GET',
//                 'url':`${config.ADMIN_URL }/getfaqcontentslist`,
//         })
//         console.log("tokonwerssssssresp",resp.data)
//         // resp.data = Decryptdata(resp.data)
//         return resp.data;
//     }
//     catch(err){console.log("err in gettok owner",err)}
//   }

  export const SearchAction    =   async   (data)  =>  {
    let datas = Encryptdata(data)
    var senddata    =   {
        method  :   'GET',
        url     :   `${config.BACK_URL}/nft/SearchAction`,
        params  :  { data : datas}
        }
    let Resp    =   await axiosFunc(senddata)
        Resp.data = Decryptdata(Resp.data)
    return Resp.data
}

export const Sociallinks = async() =>{
    
    var senddata ={
        method  :  'GET',
        url     :  `${config.BACK_URL}/user/social`
    }

    let Resp = await axiosFunc(senddata);
    Resp.data = Decryptdata(Resp.data)
    
    return Resp.data;
}
export const getcms= async ()=>{
    try {
        console.log("sdlksddas");
        var senddata ={
            method  :  'GET',
            url    : `${config.BACK_URL}/user/getcms`
        }
        let Resp = await axiosFunc(senddata);
    
           
            Resp.data = Decryptdata(Resp.data)
            console.log("concmslist",Resp);
            return Resp.data
        
    } catch (error) {
        console.log("errorincms" , error)

    }
}
export const GetLikeDataAction = async (data) => {
    var senddata = {
        method: 'POST',
        url: `${config.BACK_URL}/nft/like/list`,
       
        "Content-Type": 'application/json',
   
        data: { data: Encryptdata(data) }
    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)
    return Resp.data
}

export const AddLikeAction = async (data) => {
    var senddata = {
        method: 'POST',
        url: `${config.BACK_URL}/nft/like`,
        data: { data: Encryptdata(data) },
        'headers': {
           
            "Content-Type": 'application/json',
            
            'Authorization': token
        }
    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)

    return Resp.data
}


export const FollowUnFollowFunc = async (data) =>{
    let datas = Encryptdata(data)
    var senddata ={
        method  :   'POST',
        url     :   `${config.BACK_URL}/user/FollowUnFollowFunc`,
        data    :   {data : datas } ,
        'headers': {
            'Authorization': token
          }
    }
    let Resp = await axiosFunc(senddata);
    
    Resp.data = Decryptdata(Resp.data)
    return Resp.data;
}
export const findOwners= async (data)=>{
    let datas = Encryptdata(data)

    var senddata = {
        method : 'GET',
        url    : `${config.BACK_URL}/nft/findOwners`,
        params:{data : datas}
       
    }

    let Resp   = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)
    return Resp.data
}





export const Notification = async ( data ) =>{

    let datas = Encryptdata(data)

let senddata = {
        method : 'GET',
        url    : `${config.BACK_URL}/user/notification`,
        params:{data : datas}
       
    }

    let Resp   = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp?.data)
    console.log("datainnotiaxios" , Resp.data )

    return Resp.data

}