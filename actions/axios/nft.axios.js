import { AppenData, axiosFunc ,Decryptdata, Encryptdata} from "../common"
import config from '@/Config/config'


var token;

export const GetNftCookieToken = () => {
    token = document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=')
        console.log('egfwafwer', parts)
        return parts[0] === "token" ? decodeURIComponent(parts[1]) : r
    }, '');
}

//NFT Name Validation Function
export const nftNameValidation = async (data) => {
    let datas = Encryptdata(data)
    var senddata = {
        method: 'post',
        url: `${config.BACK_URL}/nft/ValidateTokenName`,
        data: { data: datas },
        'headers': {
            'Authorization': token
        }
    }
    console.log('jsgfsdasdasds', senddata)
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)
    return Resp.data
}
//nftCreate axios
export const nftCreate = async (data) => {
    console.log("UserRegister is Calling", data)

    var formdata = AppenData(data)
    var senddata = {
        method: 'post',
        url: `${config.BACK_URL}/nft/nftcreate`,
        data: formdata[0],
        'headers': {
            'Content-Type': 'multipart/form-data',
            'Authorization': token
        }
    }

    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)
    // console.log('ntfcreateasds',Resp.data )

    return Resp.data
}

//Nft Image Upload Function
export const NFTImageUpload = async (data) => {
    var formdata = AppenData(data)
    var senddata = {
        method: 'post',
        url: `${config.BACK_URL}/nft/nftimageupload`,
        data: formdata[0],
        'headers': {
            'Content-Type': 'multipart/form-data',
            'Authorization': token
        }
    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)
    return Resp.data
}

// Create New NFT
export const CreateNFT = async (data) => {
    console.log("fatatdtasyd", data)
    if (data.from == 'othercollection') {
        let datas = Encryptdata(data)
        var senddata = {
            method: 'post',
            url: `${config.BACK_URL}/nft/listcollectionnft`,
            data: { data: datas },
            'headers': {
                'Authorization': token
            }
        }
        let Resp = await axiosFunc(senddata)
        Resp.data = Decryptdata(Resp.data)
        console.log("fatatsddtasyd", Resp.data)

        return Resp.data
    }
    else {
        let datas = Encryptdata(data)

        var senddata = {
            method: 'post',
            url: `${config.BACK_URL}/nft/createnft`,
            data: { data: datas },
            'headers': {
                'Authorization': token
            }
        }
        let Resp = await axiosFunc(senddata)

        Resp.data = Decryptdata(Resp.data)

        return Resp.data
    }
}

// Get Category Function
export const Category = async (data) => {

    var senddata = {
        method: 'GET',
        url: `${config.BACK_URL}/nft/categorylist`,
    }
    let Resp = await axiosFunc(senddata)
    console.log("dataincategorylist", Resp.data)
    return Resp.data
}


export const getnfttaglist = async (data) => {

    var senddata = {
        method: 'GET',
        url: `${config.BACK_URL}/user/getnfttag`,
    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)
    console.log("nfttt", Resp);
    return Resp.data
}

export const homeSaledata = async (data) => {
    let datas = Encryptdata(data)
    var senddata = {
        method: 'GET',
        url: `${config.BACK_URL}/nft/hometopsales`,
        params: { data: datas }
    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)

    return Resp.data
}
//GET All NFT
export const Token_List_Func = async (data) => {
    let datas = Encryptdata(data)
    var senddata = {
        method: 'GET',
        url: `${config.BACK_URL}/nft/Tokenlistfunc`,
        params: data
    }
    let Resp = await axiosFunc(senddata)
    console.log('RespRespRespResp-->',Resp)
      Resp.data = Decryptdata(Resp.data)
      return Resp.data
}

//Get NFT info
export const Token_Info_Func = async (data) => {
    let datas = Encryptdata(data)
    var senddata = {
        method: 'GET',
        url: `${config.BACK_URL}/nft/info`,
        params: { data: datas }
    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)

    return Resp.data
}
//Get NFT Activities
export const Activitiesapi = async (data) => {
    var encdata = Encryptdata(data)

    var senddata = {
        method: "GET",
        url: `${config.BACK_URL}/nft/Activity`,
        params: { data: encdata } ?? {},
        'headers': {
            'contentype': 'application/json',
            'Authorization': token
        }
    }
    let Resp = await axiosFunc(senddata)
    
    Resp.data = Decryptdata(Resp.data)
    return Resp.data
}
//Buy And Accept 
export const BuyAccept = async (data) => {
    console.log("BuyAccept")

    let datas = Encryptdata(data)
    var senddata = {
        method: 'post',
        url: `${config.BACK_URL}/nft/BuyAccept`,
        data: { data: datas },
        'headers': {
            'Authorization': token
        }
    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)
    console.log("buyaxiosdatafdecrpt", Resp.data)

    return Resp.data
}

//Lazy tokenId Update
export const updatetoken = async (data) => {
    console.log("updatetokenf", data);
    let datas = Encryptdata(data)
    var senddata = {
        method: 'POST',
        url: `${config.BACK_URL}/nft/updatetoken`,
        'headers': {
            'Authorization': token
        },
        data: { data: datas },
    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)
    console.log("IdUpdatesssss", Resp.data)
    return Resp.data
}

//Lazy Hash Update on Cancel And PutOnSale

export const updatetokenHash = async (data) => {
    console.log("updatetokenf", data);
    let datas = Encryptdata(data)
    var senddata = {
        method: 'POST',
        url: `${config.BACK_URL}/nft/updatetokenHash`,
        'headers': {
            'Authorization': token
        },
        data: { data: datas },
    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)
    console.log("IdUpdatesssss", Resp.data)
    return Resp.data
}

//put on Sale
export const CreateOrder = async (data) => {
    let datas = Encryptdata(data)
    console.log("createorder")
    var senddata = {
        method: 'post',
        url: `${config.BACK_URL}/nft/CreateOrder`,
        data: { data: datas },
        'headers': {
            'Authorization': token
        }

    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)

    return Resp.data
}

//Bid Function
export const BidApprove = async (FormValue) => {
    let datas = Encryptdata(FormValue)
    console.log("BidApproveasss")

    var senddata = {
        method: 'post',
        url: `${config.BACK_URL}/nft/BidAction`,
        data: { data: datas },
        'headers': {
            'Authorization': token
        }
    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)
    return Resp.data
}

export const TopCreatorApi = async (days) => {
    var senddata = {
        method: 'get',
        url: `${config.BACK_URL}/nft/TopCreatorApi`,
        params: { data: Encryptdata(days) }
    }
    let Resp = await axiosFunc(senddata)

    Resp.data = Decryptdata(Resp?.data)
    console.log("datainTopcreatores", Resp.data)
    return Resp.data
}

export const HotAuctionHotSales = async () => {
    var senddata = {
        method: 'get',
        url: `${config.BACK_URL}/nft/HotAuctionHotSale`
    }
    let Resp = await axiosFunc(senddata)
    console.log("datafrorhotauction", Resp.data)

    // Resp.data = Decryptdata(Resp.data)

    return Resp.data
}

export const CreateCollectionFunc = async (data) => {
    var formdata = AppenData(data)
    var senddata = {
        method: 'post',
        url: `${config.BACK_URL}/nft/CreateCollection`,
        data: formdata[0],
        'headers': {
            'Content-Type': 'multipart/form-data',
        }
    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)

    return Resp.data
}
export const Getcollection = async (data) => {
    var formdata = AppenData(data)
    var senddata = {
        method: 'post',
        url: `${config.BACK_URL}/nft/CreateCollectionFunc`,
        data: formdata[0],
        'headers': {
            'Content-Type': 'multipart/form-data',
        }
    }
    let Resp = await axiosFunc(senddata)
    console.log("RespResp", Resp);
    Resp.data = Decryptdata(Resp.data)

    return Resp.data
}


export const CollectionByCreator = async (data) => {
    let datas = Encryptdata(data);
    var senddata = {
        method: 'get',
        url: `${config.BACK_URL}/nft/CollectionByCreator`,
        params: { data: datas } ?? {}
    }
    let Resp = await axiosFunc(senddata)
    console.log("aRespRespResp", Resp);
    Resp.data = Decryptdata(Resp.data)
    console.log("Resp.dataResp.data", Resp.data);

    return Resp.data
}

// not working call reture nothing 
export const Activity_List_Func = async (data) => {
    let datas = Encryptdata(data)
    var senddata = {
        method: 'get',
        url: `${config.BACK_URL}/nft/Activity_List_Func`,
        params: { data: datas } ?? {}
    }
    let Resp = await axiosFunc(senddata)
    return Resp.data
}


export const CollectionBySymbol = async (data) => {
    let datas = Encryptdata(data)
    var senddata = {
        method: 'get',
        url: `${config.BACK_URL}/nft/CollectionBySymbol`,
        params: { data: datas } ?? {}
    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)
    return Resp.data
}

export const Getpromotedtoken = async () => {
    var senddata = {
        method: 'get',
        url: `${config.BACK_URL}/nft/getpromotedtoken`,
    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp?.data)

    return Resp.data
}

export const EditCollectionbyCreator = async (data) => {
    var formdata = AppenData(data)
    var senddata = {
        method: 'post',
        url: `${config.BACK_URL}/nft/editcollectionbycreator`,
        data: formdata[0],
        'headers': {
            'Content-Type': 'multipart/form-data',
        }
    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)
    return Resp.data
}

export const GetNFTOwner = async (data) => {
    let datas = Encryptdata(data)
    var senddata = {
        method: 'post',
        url: `${config.BACK_URL}/nft/getnftowner`,
        data: { data: datas }
    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)

    return Resp.data
}

//used to update new balance and tranfernft 
export const NftbalanceUpdate = async (data) => {
    let datas = Encryptdata(data)
    var senddata = {
        method: 'POST',
        url: `${config.BACK_URL}/nft/findupdatebalance`,
        data: { data: datas }
    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)

    return Resp.data
}



// call for get Top seller 
export const Topsellerandbuyer = async (data) => {
    let datas = Encryptdata(data);
    var senddata = {
        method: 'get',
        url: `${config.BACK_URL}/nft/topsellbuy`,
        params: { data: datas } ?? {}
    }
    let Resp = await axiosFunc(senddata)

    Resp.data = Decryptdata(Resp?.data)

    return Resp.data
}


export const mostlikednfts = async () => {

    var senddata = {
        method: 'get',
        url: `${config.BACK_URL}/nft/mostlikednfts`,

    }

    let Resp = await axiosFunc(senddata)

    Resp.data = Decryptdata(Resp?.data)
    console.log("datainmostliked", Resp.data)

    return Resp.data
}

export const SearchAction = async (data) => {
    var senddata = {
        method: 'GET',
        url: `${config.BACK_URL}/nft/SearchAction`,
        params: data,
        'headers': {
            'Authorization': token
        }
    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp?.data)

    return Resp.data
}




export const Ranking = async (datas) => {
    var senddata = {
        method: 'GET',
        url: `${config.BACK_URL}/nft/ranking`,
        params: { data: Encryptdata(datas) } ?? {},

    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp?.data)

    return Resp.data
}

export const BurnTokens  = async(data)=>{
    var encdata = Encryptdata(data)
  
    var senddata = ({
  
        method: 'post',
        url: `${config.BACK_URL}/nft/Burntoken`,
        data    : { data: encdata },
        'headers': {
          'contentype':'application/json',
          'Authorization': token
        }
    })
    let Resp    =   await axiosFunc(senddata)
    return Resp.data
    
   
  }

  export const NFTTOTALLIKES_API = async (data) => {

    const  senddata = {
        method: 'get',
        url: `${config.BACK_URL}/nft/getlikes/${data}`,
    }
    let Resp = await axiosFunc(senddata)
 
    return Resp.data
}


export const GetPriceHistory = async (data) =>{
    const sendData = {
        method : "get",
        url :  `${config.BACK_URL}/nft/pricehistory`,
        params : {data : Encryptdata(data)}
    }
    let Resp = await axiosFunc(sendData)
    console.log("🚀 ~ GetPriceHistory ~ Resp:", Resp)

    Resp.data = Decryptdata(Resp?.data)

    return Resp.data
}
