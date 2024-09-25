/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useRef, useState } from "react";
import FileUpload from "./FileUpload";
import Image from "next/image";
import moment from "moment";
import Select from "react-select";
import { useRouter } from "next/navigation";

//files
import CreateModal from "../modals/CreateModal";
import ClockModal from "../modals/CLockModal";

//Finctions
import Config from "@/Config/config";
import { ImgValidation, isEmpty } from "@/actions/common";
import {
  CreateNFT,
  NFTImageUpload,
  nftNameValidation,
} from "@/actions/axios/nft.axios";

//npm
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import UseSolana from "@/actions/useSolana";

import idl from "@/Abi/abi.json";
import useContact from "@/utlis/hooks/solanaContractHook";
import Clockmodals from "../modals/Clockmodals";

const collcections = [
  {
    id: 1,
    name: "Art",
  },
  {
    id: 2,
    name: "Video",
  },
  {
    id: 3,
    name: "Music",
  },
  {
    id: 4,
    name: "Video",
  },
];
const currencies = [
  {
    id: 1,
    src: "/img/chains/ETH.png",
    alt: "eth",
    text: "Ethereum",
  },
  {
    id: 2,
    src: "/img/chains/FLOW.png",
    alt: "flow",
    text: "Flow",
  },
  {
    id: 3,
    src: "/img/chains/FUSD.png",
    alt: "fusd",
    text: "FUSD",
  },
];
const startingdate = [
  { value: "List Immediately", label: "List Immediately" },
  { value: "Scheduled Listing", label: "Scheduled Listing" },
];
const enddate = [
  { value: "1 day", label: "1 day" },
  { value: "2 days", label: "2 days" },
  { value: "Scheduled Listing", label: "Scheduled Listing" },
];
export default function Create() {
  const { push } = useRouter();

  const userPayload = useSelector((state) => state.LoginReducer.User.payload);
  const { accountAddress } = useSelector(
    (state) => state.LoginReducer.AccountDetails
  );

  const { currency, Categorys } = useSelector((state) => state.LoginReducer);

  const solanaContractHook = useContact();

  // const solanaAction = UseSolana()
  const initialTokenValue = {
    NFTName: "",
    NFTQuantity: 1,
    NFTOrginalImage: "",
    NFTOrginalImagePreview: "",
    NFTThumpImage: "",
    NFTThumpImagePreview: "",
    NFTOrginalImageIpfs: "",
    NFTThumpImageIpfs: "",
    CompressedFile: "",
    CompressedThumbFile: "",
    NFTDescription: "",
    PutOnSaleType: "UnlimitedAuction",
    PutOnSale: false,
    NFTPrice: "",
    NFTMinimumBid: "",
    ClockTime: "",
    EndClockTime: "",
    NFTRoyalty: "",
    NFTProperties: [],
    NFTCreator: userPayload?.WalletAddress,
    NFTOwner: userPayload?.WalletAddress,
    HashValue: "",
    MetFile: "",
    MetaData: "",
    ContractAddress: idl.metadata.address,
    ContractType: "721",
    Category: Categorys.length > 0 ? Categorys[0].label : "ART",
    CoinName: currency?.[0]?.value,
    UnlockContent: "",
    CollectionName: "NFT_STYLE",
    CollectionNetwork: Config.COIN_NAME,
    CollectionSymbol: "",
    CollectionName: "",
    isMessageapprove: "",
    isPricenotification: "",
    isPromotion: "",
    islegalalert: "",
    LazyStatus: false,
    NonceHash: 0,
    RandomName: "",
    SignatureHash: "",
  };

  const [currentCurrency, setCurrentCurrency] = useState(currencies[0]);
  const [NFTFormValue, setNFTFormValue] = useState(initialTokenValue);
  const [OpenPopup, SetOpenPopup] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [pricetype, setPricetype] = useState(true);
  const [ValidateError, SetValidateError] = useState({});
  const [FormButton, SetFormButton] = useState("start");
  const [ApproveButton, SetApproveButton] = useState("start");
  const [UploadButton, SetUploadButton] = useState("done");
  const [MintButton, setMintButton] = useState("start");
  const [number, setNumber] = useState([0]);
  const [key, setKey] = useState({});
  const [Value, setValue] = useState({});
  const createref = useRef(null);
  const clockref =useRef(null)
  const modelref = useRef(null);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  useEffect(() => {
    setNFTFormValue({
      ...NFTFormValue,
      ["CoinName"]: currency?.[0]?.value,
    });
  }, [currency]);

  useEffect(() => {
    setNFTFormValue({
      ...NFTFormValue,
      NFTCreator: userPayload?.WalletAddress,
      NFTOwner: userPayload?.WalletAddress,
    });
  }, [userPayload]);

  /* TEsting purpose */
  // useEffect(()=>{
  //   createref.current.click();
  // },[])

  // MODEL CLOSE
  const modelClose = () => {
    modelref.current.click();
  };

  const CloseModal = () => {
    SetOpenPopup("")
  }

  const setClockValue = (data, date) => {
    setNFTFormValue({
      ...NFTFormValue,
      ...{ [data]:  moment(new Date(date)).format("YYYY-MM-DD h:mm:ss a")}
    });
  };

  var validStart = function (current) {
    var yesterday = new Date()
    // moment().subtract(1, 'day')
    //return current.isAfter(new Date())&&current.isBefore(new Date(EndClocktime));
    return current.isAfter(yesterday);
  }
  var validEnd = function (current) {
    return current.isAfter(NFTFormValue.ClockTime ? new Date(NFTFormValue.ClockTime) : undefined);
  }

  const DateSelection = (e, data) => {
    if (data == "start") {
      if (e.value == "List Immediately")
        setNFTFormValue({
          ...NFTFormValue,
          ...{
            ["ClockTime"]: moment(new Date()).format("YYYY-MM-DD h:mm:ss a"),
          },
        });
      else if (e.value == "Scheduled Listing") {
        SetOpenPopup("ClockTime");
        if (clockref.current) {
          clockref.current.click();
        } else {
          console.error('clockref is null or undefined');
        }
      }
    } else {
      if (e.value == "1 day") {
        if (NFTFormValue.ClockTime === "") {
          setNFTFormValue({
            ...NFTFormValue,
            ...{
              ["EndClockTime"]: moment(
                new Date(new Date().setDate(new Date().getDate() + 1))
              ).format("YYYY-MM-DD h:mm:ss a"),
            },
          });
        } else {
          setNFTFormValue({
            ...NFTFormValue,
            ...{
              ["EndClockTime"]: moment(
                new Date(
                  new Date(NFTFormValue.ClockTime).setDate(
                    new Date(NFTFormValue.ClockTime).getDate() + 1
                  )
                )
              ).format("YYYY-MM-DD h:mm:ss a"),
            },
          });
        }
      } else if (e.value == "2 days") {

        if (NFTFormValue.ClockTime === "") {
          setNFTFormValue({
            ...NFTFormValue,
            ...{
              ["EndClockTime"]: moment(
                new Date(new Date().setDate(new Date().getDate() + 2))
              ).format("YYYY-MM-DD h:mm:ss a"),
            },
          });
        } else {
          setNFTFormValue({
            ...NFTFormValue,
            ...{
              ["EndClockTime"]: moment(
                new Date(
                  new Date(NFTFormValue.ClockTime).setDate(
                    new Date(NFTFormValue.ClockTime).getDate() + 2
                  )
                )
              ).format("YYYY-MM-DD h:mm:ss a"),
            },
          });
        }
      } else if (e.value == "Scheduled Listing"){
        SetOpenPopup("EndClockTime");
        if (clockref.current) {
          clockref.current.click();
        } else {
          console.error('clockref is null or undefined');
        }
        
      } 
    }
  };

  function loadImageFromFile(file) {
    if(file.type.includes("image")){
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
    }else{
      return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        const fileURL = URL.createObjectURL(file);
        video.src = fileURL;
    
        // Wait for the video metadata to load
        video.onloadedmetadata = function () {
          const width = video.videoWidth;
          const height = video.videoHeight;
          resolve({ width, height });
          // Clean up the object URL after getting the dimensions
          URL.revokeObjectURL(fileURL);
        };
    
        // Handle errors during loading
        video.onerror = function () {
          reject(new Error('Failed to load video metadata'));
        };
      });
    }
   
  }

  // Input and Image onChange Function
  const onChange = async (e, acceptedfile, type) => {
    if (accountAddress) {
      SetFormButton("start");
      SetValidateError({});
      if (e && e.target) {
        const { value, id } = e.target;
        if (id == "NFTRoyalty" || id == "NFTPrice" || id == "NFTMinimumBid") {
          const checkprice = Config.NumOnly;
          if (checkprice.test(value) || value == "")
            setNFTFormValue({ ...NFTFormValue, ...{ [id]: value } });
        } else {
          setNFTFormValue({ ...NFTFormValue, ...{ [id]: value } });
        }
      }
      if (acceptedfile) {
        console.log("🚀 ~ onChange ~ acceptedfile:", acceptedfile)
        var file = acceptedfile[0];
        var validExtensions = [
          "png",
          "gif",
          "webp",
          "mp4",
          "PNG",
          "jpg",
          "JPEG",
          "jpeg",
          "JPG",
          "mp3",
          "aac",
          "AAC",
          "flac",
          "FLAC",
          "WEBM",
          "webm",
          "ogv",
          "OGV",
        ];
        var validExtensionsthump = ["png", "webp", "jpg", "jpeg"];
        var fileName = file.name;
        var fileNameExt = fileName.substr(fileName.lastIndexOf(".") + 1);

        if (!validExtensions.some((val) => fileNameExt === val)) {
          toast.error(
            "Only these file types are accepted : " + validExtensions.join(", ")
          );
        }
        if (type == "Orginal") {
          const { width, height } = await loadImageFromFile(acceptedfile[0]);
          console.log("🚀 ~ onChange ~ width, height:", width, height)
          if (
            acceptedfile[0].type.includes("image") && acceptedfile[0].type.includes("video") && 
            (height < 230 || width < 230 )
          ) {
            return toast.error("Image/video size must be 230X230 ");
          }else{
            setNFTFormValue({
              ...NFTFormValue,
              ...{ ["NFTOrginalImage"]: acceptedfile[0] },
            });
          }
         
        }
        if (type == "Thump") {
          if (!validExtensionsthump.some((val) => fileNameExt === val)) {
            toast.error(
              "Only these file types are accepted : " +
                validExtensionsthump.join(", ")
            );
          } else {
            const { width, height } = await loadImageFromFile(acceptedfile[0]);
            if (
              acceptedfile[0].type.includes("image") &&
              (height < 230 || height < "230" || width < 230 || width < "230")
            ) {
              return toast.error("Image size must be 230X230 ");
            }else{
              setNFTFormValue({
                ...NFTFormValue,
                ...{ ["NFTThumpImage"]: acceptedfile[0] },
              });
            }
            
          }
        }
      }
    } else {
      toast.error("Connect Wallet To create NFT");
    }
  };

  const PutOnSale = () => {
    // CurrecyChange();
    setPricetype(true);
    if (NFTFormValue.PutOnSale === false) {
      setNFTFormValue({
        ...NFTFormValue,
        ...{
          ["PutOnSale"]: !NFTFormValue.PutOnSale,
          ["PutOnSaleType"]: "FixedPrice",
        },
      });
    } else {
      setNFTFormValue({
        ...NFTFormValue,
        ...{
          ["PutOnSale"]: !NFTFormValue.PutOnSale,
          ["PutOnSaleType"]: "UnlimitedAuction",
          ["NFTPrice"]: 0,
          ["NFTMinimumBid"]: 0,
          ["ClockTime"]: "",
          ["EndClockTime"]: "",
        },
      });
    }
  };

  var Properties = (e) => {
    var { value, id } = e.target;
    SetFormButton("start");
    SetValidateError({});
    if (id.includes("key")) {
      setKey({ ...key, ...{ [number.length - 1]: value } });
    } else if (id.includes("value")) {
      setValue({ ...Value, ...{ [number.length - 1]: value } });
    }
  };

  var AddProperties = () => {
    var error = {};
    if (isEmpty(key[number.length - 1])) {
      error.key = "Enter Key";
    }
    if (isEmpty(Value[number.length - 1])) {
      error.value = "Enter Value";
    }
    if (number.length <= 9) {
      if (isEmpty(error)) {
        document.getElementById("key").value = "";
        document.getElementById("value").value = "";
        setNumber([...number, number.length]);
      } else {
        SetValidateError(error);
      }
    }
  };

  var RemoveProperties = (ind) => {
    var check = delete Value[ind];
    delete key[ind];
    delete Value[ind];
    var obj = {};
    var obj2 = {};
    for (var i = 0; i < number.length - 1; i++) {
      if (i >= ind) {
        if (Value[i + 1]) obj[i] = Value[i + 1];
        if (key[i + 1]) obj2[i] = key[i + 1];
      } else {
        obj2[i] = key[i];
        obj[i] = Value[i];
      }
    }
    setValue(obj);
    setKey(obj2);
    document.getElementById("key").value = "";
    document.getElementById("value").value = "";
    setNumber(
      number.filter((val, ind) => {
        return ind !== number.length - 1;
      })
    );
  };

  //NFT mint validation function
  const Validation = async (data) => {
    let ValidateError = {};
    const {
      NFTName,
      NFTOrginalImage,
      NFTThumpImage,
      NFTPrice,
      EndClockTime,
      ClockTime,
      NFTRoyalty,
      Category,
      PutOnSaleType,
      PutOnSale,
      CoinName,
      NFTQuantity,
      ContractType,
    } = data;
    if (!NFTRoyalty) ValidateError.NFTRoyalty = "Royalty Required";
    else if (isEmpty(NFTRoyalty))
      ValidateError.NFTRoyalty = "Royalty Must Be Greater Than 0";
    else if (isNaN(NFTRoyalty) === true)
      ValidateError.NFTRoyalty = "Royalty must be a number";
    else if (Number(NFTRoyalty) < 0)
      ValidateError.NFTRoyalty = "Royalty must be Greater than 0";
    else if (Number(NFTRoyalty) > 20)
      ValidateError.NFTRoyalty = "Royalty Must be less than 20";
    else if (Number(NFTRoyalty) % 1 !== 0)
      ValidateError.NFTRoyalty = "Royalty must be a Whole Number";
    if (!NFTName) ValidateError.NFTName = "TokenName Required";
    if (
      (PutOnSaleType == "FixedPrice" || PutOnSaleType == "TimedAuction") &&
      isEmpty(NFTPrice)
    )
      ValidateError.NFTPrice = "NFTPrice Required";
    if (
      (PutOnSaleType == "FixedPrice" || PutOnSaleType == "TimedAuction") &&
      !CoinName &&
      PutOnSale == true
    )
      ValidateError.CoinName = "CoinName Required";
    if (PutOnSaleType == "TimedAuction" && !ClockTime)
      ValidateError.ClockTime = "ClockTime Required";
    if (PutOnSaleType == "TimedAuction" && !EndClockTime)
      ValidateError.EndClockTime = "EndClockTime Required";

    if (PutOnSaleType == "TimedAuction") {
      if (
        ClockTime > EndClockTime ||
        ClockTime.toString() == EndClockTime.toString()
      ) {
        ValidateError.EndClockTime = "Time Auction should not be same";
      }

      if (new Date(ClockTime) > new Date(EndClockTime)) {
        ValidateError.EndClockTime = "Please Enter valid End Time";
      }
    }

    if (!Category) ValidateError.Category = "Category Required";

    if (!NFTOrginalImage) {
      ValidateError.NFTOrginalImage = "OriginalFile Required";
    }
    if (ImgValidation(NFTOrginalImage, "pro"))
      ValidateError.NFTOrginalImage = ImgValidation(NFTOrginalImage, "pro");
    if (
      (NFTOrginalImage?.type?.includes("video") ||
        NFTOrginalImage?.type?.includes("audio")) &&
      !NFTThumpImage
    )
      ValidateError.NFTThumpImage = "ThumbFile Required";
    else if (NFTThumpImage)
      if (ImgValidation(NFTThumpImage, "thumb"))
        ValidateError.NFTThumpImage = ImgValidation(NFTThumpImage, "thumb");

    if (isNaN(NFTPrice) === true)
      ValidateError.NFTPrice = "NFT Price Should Be a Number";
    else if (Number(NFTPrice) <= 0 && PutOnSale == true)
      ValidateError.NFTPrice = "NFTPrice should be above Zero";
    if (ContractType === 1155 || ContractType === "1155") {
      if (Number(NFTQuantity) % 1 != 0) {
        ValidateError.NFTQuantity = '"Quantity" must be a Valid number';
      }
    }

    if (Object.values(key)?.length > 0 || Object.values(Value)?.length > 0) {
      for (var i = 0; i < number.length; i++) {
        if (isEmpty(key[i])) {
          if (isEmpty(Value[i])) {
          } else {
            ValidateError["key"] = "Enter Key";
          }
        }
        if (isEmpty(Value[i])) {
          if (isEmpty(key[i])) {
          } else {
            ValidateError["value"] = "Enter Value";
          }
        }
      }
    }

   
    return ValidateError;
  };
  //NFT Form submit function
  const FormSubmit = async () => {
    SetValidateError({});
    const id = toast.loading("Validating Form");
    var Error = await Validation(NFTFormValue);
    console.log("🚀 ~ FormSubmit ~ Error:", Error)
    if (isEmpty(Error)) {
      var checkarr = [];
      if (Object.values(key)?.length > 0) {
        for (var i = 0; i < number.length; i++) {
          if (!isEmpty(key[i]) && !isEmpty(Value[i])) {
            // NFTFormValue.NFTProperties.push({ [key[i]]: Value[i] });
            checkarr.push({ [key[i]]: Value[i] });
          }
        }
      }
      NFTFormValue.NFTProperties = checkarr;
      SetFormButton("process");
      let Resp = await nftNameValidation({
        NFTName: NFTFormValue.NFTName,
      });
      if (Resp?.success == "success") {
        toast.update(id, {
          render: Resp?.success == "success" ? "Ready To Mint" : "Check Fields",
          type: Resp?.success,
          isLoading: false,
          autoClose: 1000,
        });
        // let Respc = await ContractCall.Contract_Base_Validation();
        // if (!Respc) {
        // let Statu = await ContractCall.GetApproveStatus(
        //   location,
        //   NFTFormValue?.ContractAddress
        // );
        // if (Statu == true) {
        //   SetApproveButton("stop");
        SetUploadButton("start");
        //   toast.update(id, {
        //     render: "Start Minting",
        //     type: "success",
        //     isLoading: false,
        //     autoClose: 1000, closeButton: true, closeOnClick: true
        //   });
        // } else {
        SetApproveButton("start");
        toast.update(id, {
          render: "Get Approve",
          type: "success",
          isLoading: false,
          autoClose: 1000,
          closeButton: true,
          closeOnClick: true,
        });
        // }

        // MODEL OPEN
        createref.current.click();
        // } else {
        //   SetFormButton("error");
        //   SetValidateError(Respc);
        // }
      } else {
        toast.update(id, {
          render: "NFT Name Already Available Use Different Name",
          type: "error",
          isLoading: false,
          autoClose: 500,
          closeButton: true,
          closeOnClick: true,
        });
        SetFormButton("error");
        SetValidateError({ NFTName: Resp.msg });
      }
    } else {
      SetFormButton("error");
      SetValidateError(Error);
      toast.update(id, {
        render: "Form Validation failed Check Fields",
        type: "error",
        isLoading: false,
        autoClose: 500,
        closeButton: true,
        closeOnClick: true,
      });
    }
  };

  //NFT Initial Approve
  const TokenApproveCall = async () => {
    SetApproveButton("process");
    const id = toast.loading("Approve in process");
    const cont = await ContractCall.SetApproveStatus(
      location,
      NFTFormValue?.ContractAddress
    );
    toast.update(id, {
      render: cont ? "Approved Successfully" : "Approved Failed",
      type: cont ? "success" : "error",
      isLoading: false,
      autoClose: 1000,
      closeButton: true,
      closeOnClick: true,
    });
    if (cont?.status) {
      SetApproveButton("done");
      SetUploadButton("start");
    } else SetApproveButton("try");
  };

  //Upload image in IPFS
  async function UploadIPFScall() {
    const {
      NFTCreator,
      NFTThumpImage,
      NFTOrginalImage,
      NFTOrginalImageai,
      NFTName,
      NFTDescription,
      NFTProperties,
    } = NFTFormValue;
    SetUploadButton("process");
    const id = toast.loading("Uploading  File");
    var Resp;
    Resp = await NFTImageUpload({
      NFTCreator: NFTCreator ? NFTCreator : accountAddress,
      NFTThumpImage,
      NFTOrginalImage,
      NFTName,
      NFTDescription,
      NFTProperties: JSON.stringify(NFTProperties),
    });

    if (Resp?.success == "success") {
      setNFTFormValue({ ...NFTFormValue, ...Resp.data });
      SetUploadButton("done");
      setMintButton("start");
    } else {
      SetUploadButton("try");
    }
    toast.update(id, {
      render: Resp?.msg,
      type: Resp?.success,
      isLoading: false,
      autoClose: 1000,
      closeButton: true,
      closeOnClick: true,
    });
  }

  //NFT Mint Function
  async function MintCall() {
    const id = toast.loading("Minting Processing");
    setMintButton("process");
    var _data = NFTFormValue;
    _data.activity = "Mint";
    _data.NFTPrice == 0
      ? (_data.NFTPrice = "")
      : (_data.NFTPrice = _data.NFTPrice);

    const cont = await solanaContractHook.mintNFT(
      accountAddress,
      NFTFormValue.MetaData,
      NFTFormValue.NFTName,
      NFTFormValue.NFTRoyalty,
      NFTFormValue.NFTQuantity
    );
    if (cont?.status) {
      if (NFTFormValue.PutOnSaleType === "TimedAuction") {
        _data.ClockTime = new Date(NFTFormValue.ClockTime);
        _data.EndClockTime = new Date(NFTFormValue.EndClockTime);
      }
      _data.HashValue = cont.HashValue;
      _data.metadata_account = cont?.metadata_account
      _data.MetaAccount = cont?.nftMetadata
      _data.NFTId = cont?.nftId?.toString();
      _data.click = `${Config.FRONT_URL}/info/${
        NFTFormValue?.CollectionNetwork
      }/${
        NFTFormValue?.ContractAddress
      }/${accountAddress}/${cont?.nftId?.toString()}`;

      let delegate;
      if (NFTFormValue.PutOnSaleType === "FixedPrice") {
        delegate = await ApproveCallOrListCall();
        _data.delegate = delegate;
      }

      let Resp = await CreateNFT(_data);
      toast.update(id, {
        render: Resp?.msg,
        type: Resp?.success,
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
        closeOnClick: true,
      });
      if (Resp?.success == "success") {
        setMintButton("done");
        toast.update(id, {
          render: "The NFT is successfully minted",
          type: "success",
          isLoading: false,
          autoClose: 1000,
          closeButton: true,
          closeOnClick: true,
        });
        modelClose();
        push(`/user/${userPayload?.CustomUrl}`, { state: { Tab: "owned" } });
      } else {
        toast.update(id, {
          render: "Transaction Failed",
          type: "error",
          isLoading: false,
          autoClose: 1000,
          closeButton: true,
          closeOnClick: true,
        });
        setMintButton("try");
      }
    } else {
      toast.update(id, {
        render: "Transaction Failed",
        type: "error",
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
        closeOnClick: true,
      });
      setMintButton("try");
    }
  }
  const [BtnData, SetBtnData] = useState("start");
  const ApproveCallOrListCall = async () => {
    let id = toast.loading("Listing NFT");
    let Respc = await solanaContractHook.Contract_Base_Validation();
    if (!Respc) {
      let Statu = await solanaContractHook.nftDelegateApprove(
        accountAddress,
        NFTFormValue.NFTId
      );
      if (Statu?.status == true) {
        toast.update(id, {
          render: "Ready To Place Order",
          type: "success",
          isLoading: false,
          autoClose: 1000,
          closeButton: true,
          closeOnClick: true,
        });
        return Statu?.delegateSecKey;
      } else {
        toast.update(id, {
          render: "Get APProve",
          type: "success",
          isLoading: false,
          autoClose: 1000,
          closeButton: true,
          closeOnClick: true,
        });
        return "";
      }
    }
  };

  useEffect(() => {
    if (NFTFormValue.PutOnSaleType === "FixedPrice")
      setNFTFormValue({ ...NFTFormValue, ...{ ["CoinName"]: currency[0]?.label } })
    else if (NFTFormValue.PutOnSaleType === "TimedAuction")
      setNFTFormValue({ ...NFTFormValue, ...{ ["CoinName"]: currency.filter(val=>val.label != Config.COIN_NAME)?.[0]?.label } });
    else
      setNFTFormValue({ ...NFTFormValue, ...{ ["CoinName"]: "" } });
  }, [NFTFormValue.PutOnSaleType])

  console.log("NFTFormValue-->", NFTFormValue);

  return (
    <section className="relative py-24">
      <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
        <Image
          width={1920}
          height={789}
          src="/img/gradient_light.jpg"
          priority
          alt="gradient"
          className="h-full w-full"
        />
      </picture>
      <div className="container">
        <h1 className="py-16 text-center font-display text-4xl font-medium text-jacarta-700 dark:text-white">
          Create
        </h1>

        <div className="mx-auto max-w-[48.125rem]">
          {/* File Upload */}
          <FileUpload
            userPayload={userPayload}
            NFTFormValue={NFTFormValue}
            onChange={(e, file, type) => onChange(e, file, type)}
          />
          {/* Unlockable Content */}
          <div className="relative mb-6">
            <div className="flex items-center justify-between  mb-4">
              <div className="flex">
                <div>
                  <label className="block font-display text-jacarta-700 dark:text-white">
                    Enable for Price
                  </label>
                  <div className="dark:text-jacarta-300">
                    Your Item will be available to purchase immediately
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                value="checkbox"
                checked={NFTFormValue.PutOnSale}
                onChange={() => {
                  PutOnSale();
                }}
                name="check"
                className="relative h-6 w-[2.625rem] cursor-pointer appearance-none rounded-full border-none bg-jacarta-100 after:absolute after:top-[0.1875rem] after:left-[0.1875rem] after:h-[1.125rem] after:w-[1.125rem] after:rounded-full after:bg-jacarta-400 after:transition-all checked:bg-accent checked:bg-none checked:after:left-[1.3125rem] checked:after:bg-white checked:hover:bg-accent focus:ring-transparent focus:ring-offset-0 checked:focus:bg-accent"
              />
            </div>
            {NFTFormValue?.PutOnSale && (
              <div>
                <div className="grid grid-cols-2 gap-3 flex-row flex-wrap flex max-[1070px]:grid-cols-1 mb-4">
                  <div
                    className={`border p-[20px] rounded-[10px] hover:cursor-pointer ${
                      pricetype && "bg-accent"
                    }`}
                    onClick={() => {
                      setPricetype(true);
                      setNFTFormValue({
                        ...NFTFormValue,
                        ...{
                          ["PutOnSaleType"]: "FixedPrice",
                        },
                      });
                    }}
                  >
                    <div
                      className={`dark:text-jacarta-300 text-center ${
                        pricetype && "!text-white"
                      }`}
                    >
                      Fixed Price
                    </div>
                  </div>
                  {/* TODO */}
                  <div
                    className={`border p-[20px] rounded-[10px] hover:cursor-pointer ${
                      !pricetype && "bg-accent"
                    }`}
                    onClick={() => {
                      setPricetype(false);
                      setNFTFormValue({
                        ...NFTFormValue,
                        ...{
                          ["PutOnSaleType"]: "TimedAuction",
                        },
                      });
                    }}
                  >
                    <div
                      className={`dark:text-jacarta-300 text-center ${
                        !pricetype && "!text-white"
                      }`}
                    >
                      Timed Auction
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="mb-3">
                    <label
                      htmlFor="item-name"
                      className="mb-2 block font-display text-jacarta-700 dark:text-white"
                    >
                      {NFTFormValue.PutOnSaleType == "FixedPrice"
                        ? "Fixed Price (Max 7 digit)"
                        : "Minimum Bid (Max 7 digit)"}
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                      <input
                        type="text"
                        id="NFTPrice"
                        onChange={(e) => {
                          NFTFormValue?.NFTPrice.length < 7 && onChange(e);
                        }}
                        value={NFTFormValue.NFTPrice}
                        max={7}
                        className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                        placeholder="NFT Price"
                        // required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <label htmlFor="currency" className="sr-only">
                          Currency
                        </label>
                        <select
                          id="currency"
                          name="currency"
                          className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                          onChange={(e) =>
                            setNFTFormValue({
                              ...NFTFormValue,
                              ...{ ["CoinName"]: e.target.value },
                            })
                          }
                        >
                          {(NFTFormValue.PutOnSaleType == "FixedPrice"
                            ? currency?.filter((item) => item.deleted != true)
                            : currency?.filter(
                                (item) => item.address != Config.DEADADDRESS
                              )
                          ).map((val) => (
                            <option>{val.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  {NFTFormValue.PutOnSaleType == "FixedPrice" && pricetype && (
                    <>
                      <div className="dark:text-jacarta-300">
                        Service Fees 2.5%
                      </div>
                      <div className="dark:text-jacarta-300">
                        You will receive {Config.COIN_NAME}
                      </div>
                    </>
                  )}
                  {NFTFormValue?.PutOnSaleType === "TimedAuction" && (
                    // !pricetype &&
                    <div className="mb-3">
                      <div className="grid grid-cols-2 gap-3 flex-row flex-wrap flex max-[1070px]:grid-cols-1 mb-4">
                        <div>
                          <label
                            // htmlFor="item-name"
                            className="mb-2 block font-display text-jacarta-700 dark:text-white"
                          >
                            Starting Date
                          </label>
                          <Select
                            options={startingdate}
                            value={{
                              value: String(NFTFormValue.ClockTime),
                              label: (NFTFormValue.ClockTime)
                                ? String(NFTFormValue.ClockTime)
                                : "Starting Date",
                            }}
                            classNamePrefix="react-select"
                            isSearchable={false}
                            onChange={(e) => DateSelection(e, "start")}
                          />
                        </div>
                        <div>
                          <label
                            // htmlFor="item-name"
                            className="mb-2 block font-display text-jacarta-700 dark:text-white"
                          >
                            Ending Date
                          </label>
                          <Select
                            value={{
                              value: String(NFTFormValue.EndClockTime),
                              label: NFTFormValue.EndClockTime
                                ? String(NFTFormValue.EndClockTime)
                                : "Ending Date",
                            }}
                            options={enddate}
                            classNamePrefix="react-select"
                            isSearchable={false}
                            onChange={(e) => DateSelection(e, "end")}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Name */}
          <div className="mb-6">
            <label
              htmlFor="item-name"
              className="mb-2 block font-display text-jacarta-700 dark:text-white"
            >
              Name<span className="text-red">*</span>
            </label>
            <input
              type="text"
              id="NFTName"
              className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
              placeholder="Item name"
              // required
              onChange={onChange}
              value={NFTFormValue?.NFTName}
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              htmlFor="item-description"
              className="mb-2 block font-display text-jacarta-700 dark:text-white"
            >
              Description
            </label>
            <div className="mb-3 text-2xs dark:text-jacarta-300">
              The description will be included on the item's detail page
              underneath its image. Markdown syntax is supported.
            </div>
            <textarea
              id="NFTDescription"
              className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
              rows="4"
              // required
              placeholder="Provide a detailed description of your item."
              onChange={onChange}
              value={NFTFormValue?.NFTDescription}
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-3 flex-row flex-wrap flex max-[1070px]:grid-cols-1">
            {/* Collection */}
            <div className="relative mb-6">
              <div>
                <label className="mb-2 block font-display text-jacarta-700 dark:text-white">
                  Set Category
                </label>
              </div>

              <div className="dropdown my-1 cursor-pointer">
                <div
                  className="dropdown-toggle flex items-center justify-between rounded-lg border border-jacarta-100 bg-white py-3 px-3 dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-jacarta-300"
                  role="button"
                  id="item-collection"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="">
                    {isEmpty(NFTFormValue?.Category)
                      ? "Select Categories"
                      : NFTFormValue?.Category}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-4 w-4 fill-jacarta-500 dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
                  </svg>
                </div>

                <div
                  className="dropdown-menu z-10 hidden w-full whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
                  aria-labelledby="item-collection"
                >
                  <ul className="scrollbar-custom flex max-h-48 flex-col overflow-y-auto">
                    {Categorys.map((elm, i) => (
                      <li
                        key={i}
                        className="mb-4 px-2"
                        onClick={() =>
                          setNFTFormValue({
                            ...NFTFormValue,
                            Category: elm.value,
                          })
                        }
                      >
                        <div className="text-600">{elm.label}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="item-external-link"
                className="mb-2 block font-display text-jacarta-700 dark:text-white"
              >
                Set royalties amount,%
              </label>
              <input
                type="number"
                id="NFTRoyalty"
                pattern="^[0-9]*$"
                className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                placeholder="Eg.5"
                onChange={(e) => {
                  !e.target.value.includes(".") &&
                    e.target.value < 21 &&
                    onChange(e);
                }}
                value={NFTFormValue?.NFTRoyalty}
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="item-external-link"
              className="mb-2 block font-display text-jacarta-700 dark:text-white"
            >
              Properties
            </label>
            <div className="d-flex align-items-center justify-content-between tab-details">
              <ul class="properties flex flex-wrap gap-[10px] mb-[15px]">
                {number.map((val, index) => (
                  <>
                    {" "}
                    {number.length - 2 >= index && (
                      <li className="flex items-center gap-[7px] w-fit px-[6px] py-[8px] rounded-[8px] text-white bg-[#6336E4] ">
                        <svg
                          width="12"
                          height="14"
                          viewBox="0 0 12 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 11.375L1.09375 7.53125L0 8.375L6 13.0312L12 8.375L10.9062 7.53125L6 11.375ZM6 9.65625L10.9062 5.84375L12 5L6 0.34375L0 5L1.09375 5.84375L6 9.65625ZM6 2.03125L9.8125 5L6 7.96875L2.1875 5L6 2.03125Z"
                            fill="white"
                          ></path>
                        </svg>
                        {key[index]} : {Value[index]}
                        <span
                          onClick={() => RemoveProperties(index)}
                          className="cursor-pointer"
                        >
                          <svg
                            width="0"
                            height="0"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                            stroke="currentColor"
                            className="size-6 w-[20px] h-[20px] p-[2px]  cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </span>
                        {/* <i onClick={() => RemoveProperties(index)}  class="fa-solid fa-x"></i> */}
                      </li>
                    )}
                  </>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-3 flex-row flex-wrap flex max-[1070px]:grid-cols-1 mb-4">
              <input
                id="key"
                type="text"
                placeholder="Add Type"
                className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                onChange={(e) => Properties(e)}
              />
              <input
                id="value"
                type="text"
                placeholder="Add Value"
                className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                onChange={(e) => Properties(e)}
              />
              <button
                className="cursor-default rounded-full bg-[#6336E4] addbtn py-3 px-8 text-center font-semibold text-white transition-all w-[150px] hover:cursor-pointer"
                onClick={AddProperties}
              >
                Add More
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={FormSubmit}
            className="cursor-default rounded-full bg-[#6336E4] addbtn py-3 px-8 text-center font-semibold text-white transition-all hover:cursor-pointer"
          >
            Create
          </button>

          {/* MODEL OPEN BUTTON */}
          <button
            data-bs-toggle="modal"
            data-bs-target="#createModal"
            className="d-none"
            ref={createref}
          ></button>

<button
            data-bs-toggle="modal"
            data-bs-target="#clockModals"
            className="hidden"
            ref={clockref}
            id="clockbtn"
          ></button>
        </div>
      </div>
      <button
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref={modelref}
                ></button>
      {/* MODEL */}
      <CreateModal
        modelref={modelref}
        NFTFormValue={NFTFormValue}
        ApproveButton={ApproveButton}
        MintButton={MintButton}
        TokenApproveCall={TokenApproveCall}
        UploadIPFScall={UploadIPFScall}
        MintCall={MintCall}
        UploadButton={UploadButton}
      />
      {/* {((OpenPopup == "ClockTime" ||
        OpenPopup == "EndClockTime") && ( */}

       
          <Clockmodals
         page={"create"}
         SetOpenPopup={SetOpenPopup}
         modal={OpenPopup}
         validDate={OpenPopup == "ClockTime" ? validStart : validEnd}
         setClockValue={setClockValue}
         closeModal={modelClose}
        />

        {/* ))}  */}
    </section>
  );
}
