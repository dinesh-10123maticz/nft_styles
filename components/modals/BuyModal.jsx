/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

//FUNCTIONS
import { isEmpty } from "@/actions/common";
import { BuyAccept } from "@/actions/axios/nft.axios";

//file
import Config from "@/Config/config";

//NPM
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";

import solanaContract from "@/utlis/hooks/solanaContractHook";
import { Decryptdata } from "@/app/common/encryptdecrypt";
import { toast } from "react-toastify";

export default function BuyModal({ closePop, owner, item }) {
  const { currency } = useSelector((state) => state.LoginReducer);
  const { web3, web3p, accountAddress, coinBalance } = useSelector(
    (state) => state.LoginReducer.AccountDetails
  );
  const { Network } = useSelector((state) => state.LoginReducer);
  const { buyerFees, sellerFees } = useSelector(
    (state) => state.LoginReducer.ServiceFees
  );

  const navigate = useRouter().push;

  const ContractCall = solanaContract();
  const userData = useSelector((state) => state.LoginReducer.User.payload);
  const [referredUser, setReferredUser] = useState({});
  const closeref = useRef();
  const [Btn, SetBtn] = useState("done");
  const [App_Btn, SetApp_Btn] = useState("start");
  const [Error, SetError] = useState("");
  const [NFTQuantity, SetNFTQuantity] = useState(1);
  const [TokenBalance, SetTokenBalance] = useState("0");
  const [show10, setShow10] = useState(false);
  const handleClose10 = () => closePop();
  const [proceedtopayment, setProceedtopayment] = useState(false);
  const [once, setOnce] = useState(true);
  const decimal =
    currency?.filter((item) => item.label === owner.CoinName)?.pop()?.decimal ??
    18;
  const token_address =
    currency?.filter((item) => item.label === owner.CoinName)?.pop()?.address ??
    Config.DEADADDRESS;
  const YouWillGet = useMemo(() => {
    return (
      Number(owner.NFTPrice) * Number(NFTQuantity) +
      (Number(owner.NFTPrice) * Number(NFTQuantity) * Number(buyerFees)) / 100
    );
  }, [owner, NFTQuantity]);

  const Validation = async () => {
    var error = {};
    if (isEmpty(NFTQuantity)) return "Token Quantity Required";
    else if (Number(owner.NFTBalance) < Number(NFTQuantity))
      return (error.NFTQuantity =
        "NFT Quantity should be less than " + owner.NFTBalance);
    if (
      owner.CoinName != "BNB" &&
      Number(owner.TokenPrice) * Number(NFTQuantity) > Number(TokenBalance)
    )
      return "Insufficient Balance";
    else return await ContractCall.Contract_Base_Validation();
  };

  useEffect(() => {
    // Get modal element by its ID
    const modal = document.getElementById("buyNowModal");

    // Add event listener for when the modal is opened
    const handleModalOpen = () => {
      BalCal();
    };

    // Attach Bootstrap modal event listeners
    modal.addEventListener("shown.bs.modal", handleModalOpen);
    return () => {
      modal.removeEventListener("shown.bs.modal", handleModalOpen);
      //  modal.removeEventListener('hidden.bs.modal', handleModalClose);
    };
  }, [token_address]);

  const BalCal = async (data) => {
    const { tokenBalance, Decimal } = await ContractCall.getTokenbalance(
      accountAddress,
      token_address
    );
    console.log("🚀 ~ BUY MODEL BalCal ~ tokenBalance:", tokenBalance,accountAddress,
      token_address)
    SetTokenBalance(tokenBalance);
  };

  const _Buy = async () => {
    SetApp_Btn("process");
    const id = toast.loading("Purchasing Token on processing");
    var error = await Validation();
    SetError(error);
    if (isEmpty(error)) {
      let cont =
        item?.currentOwner?.CoinName == Config?.COIN_NAME
          ? await ContractCall.buyNFT(
              Decryptdata(item.currentOwner.delegate),
              item?.NFTId,
              item?.currentOwner?.NFTOwner,
              YouWillGet,
              NFTQuantity,
              item?.currentOwner?.NFTPrice,
              item.MetaAccount
            )
          : await ContractCall.buyNftWithToken(
              item?.currentOwner?.NFTPrice,
              decimal,
              NFTQuantity,
              Decryptdata(item.currentOwner.delegate),
              item?.NFTId,
              item?.currentOwner?.NFTOwner,
              token_address,
              YouWillGet,
              item.MetaAccount
            );
      if (cont?.status) {
        let newOwner = {
          HashValue: cont.HashValue,
          NewTokenOwner: accountAddress,
          NFTQuantity: NFTQuantity,
          NFTId: owner.NFTId,
          NFTOwner: owner.NFTOwner,
          PutOnSale: owner.PutOnSale,
          PutOnSaleType: owner.PutOnSaleType,
          activity: "Buy",
          TP: owner.NFTPrice,
          New_EmailId: userData?.EmailId,
          CN: owner.CoinName,
          click: `${Config.FRONT_URL}/info/${item.CollectionNetwork}/${item.ContractAddress}/${accountAddress}/${owner.NFTId}`,
          initialBuy: userData?.initialBuy,
          referedBy: userData?.referedBy,
          earnPercentage: referredUser?.earnPercentage ?? 0,
          adminFeePercentage:
            Number(buyerFees) / 1e18 + Number(sellerFees) / 1e18,
        };
        let Resp = await BuyAccept({ newOwner: newOwner, item: item });

        if (Resp.success == "success") {
          toast.update(id, {
            render: "The NFT is successfully purchased",
            type: "success",
            isLoading: false,
            autoClose: 1000,
            closeButton: true,
            closeOnClick: true,
          });
          // SetApp_Btn("done");
          closeref.current.click();
          navigate(`/user/${userData.CustomUrl}`, {
            state: { Tab: "owned" },
          });
          // if(payload?.initialBuy == false){
          //   var newPayload = payload
          //   newPayload.initialBuy = true
          //   dispatch({
          //     type: 'Register_Section',
          //     Register_Section: {
          //         User: {
          //             payload: newPayload
          //         }
          //     }
          // })
          // }
        } else {
          toast.update(id, {
            render: "Transaction Failed",
            type: "error",
            isLoading: false,
            autoClose: 1000,
            closeButton: true,
            closeOnClick: true,
          });
          SetApp_Btn("try");
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
        SetApp_Btn("try");
      }
    } else {
      toast.update(id, {
        render: "Validation failed",
        type: "error",
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
        closeOnClick: true,
      });
    }
  };

  const onChange = (e) => {
    // console.log('vallll',e.target.value)
    var numberRegex = /^\d+$/;
    console.log("vallll", e.target.value);
    if (numberRegex.test(e.target.value) || e.target.value == "") {
      SetNFTQuantity(e.target.value);
      SetError("");
      SetBtn("start");
      SetApp_Btn("init");
    } else {
      SetError("Token Quantity must be in number");
    }
  };

  return (
    <div
      className="modal fade place-content-center"
      id="buyNowModal"
      tabIndex="-1"
      aria-labelledby="buyNowModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog max-w-2xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="buyNowModalLabel">
              Complete checkout
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={closeref}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-6 w-6 fill-jacarta-700 dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="modal-body p-6">
            <div className="mb-[20px]">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-jacarta-700 dark:text-white">
                  Seller :
                </span>
                <span className="font-displaytext-sm dark:text-jacarta-200">
                  {" "}
                  {owner.DisplayName ? owner.DisplayName : owner.NFTOwner}
                </span>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-jacarta-700 dark:text-white">
                  Buyer :
                </span>
                <span className="font-displaytext-sm dark:text-jacarta-200">
                  {" "}
                  {userData?.DisplayName
                    ? userData?.DisplayName
                    : userData?.WalletAddress}
                </span>
              </div>
            </div>
            <div className="mb-[20px]">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-jacarta-700 dark:text-white">
                  Your Currency Balance :
                </span>
                <span className="font-displaytext-sm dark:text-jacarta-200">
                  {" "}
                  {coinBalance} {Config.COIN_NAME}{" "}
                </span>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-jacarta-700 dark:text-white">
                  Your Token Balance :
                </span>
                <span className="font-displaytext-sm dark:text-jacarta-200">
                  {" "}
                  {TokenBalance} {owner.CoinName}{" "}
                </span>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-jacarta-700 dark:text-white">
                  Price :
                </span>
                <span className="font-displaytext-sm dark:text-jacarta-200">
                  {" "}
                  {owner?.NFTPrice} {owner?.CoinName}
                </span>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-jacarta-700 dark:text-white">
                  Service Fee :
                </span>
                <span className="font-displaytext-sm dark:text-jacarta-200">
                  {" "}
                  {String(buyerFees)} % {owner.CoinName}
                </span>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-jacarta-700 dark:text-white">
                  Royalty Fee :
                </span>
                <span className="font-displaytext-sm dark:text-jacarta-200">
                  {" "}
                  {item.NFTRoyalty} % {owner.CoinName}
                </span>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-jacarta-700 dark:text-white">
                  You Will Pay :
                </span>
                <span className="font-displaytext-sm dark:text-jacarta-200">
                  {" "}
                  {YouWillGet} {owner.CoinName}{" "}
                </span>
              </div>
            </div>
            <div className="mb-[15px]">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-jacarta-700 dark:text-white">
                  Enter Quantity ({owner.NFTBalance} available)
                </span>
              </div>

              <div className="relative mb-2 flex items-center overflow-hidden rounded-lg border border-jacarta-100 dark:border-jacarta-600">
                <input
                  type="text"
                  id="NFTQuantity"
                  value={NFTQuantity}
                  disabled={
                    owner.NFTBalance == "1" || owner.NFTBalance == 1
                      ? true
                      : false
                  }
                  onChange={(e) => onChange(e)}
                  className="h-12 w-full flex-[3] border-0 focus:ring-inset focus:ring-accent"
                  placeholder=""
                  defaultValue="1"
                />

                {Error && <span className="text-danger img-file">{Error}</span>}
              </div>
            </div>
          </div>
          {/* end body */}

          <div className="modal-footer">
            <div className="flex items-center justify-center space-x-4">
              {/*
          <button
         type="button"
         className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
         tabIndex="-1" 
         disabled    =   {Btn == 'error' || Btn === "process"  ||  Btn ==="done" ? true : false} 
         onClick     =   {Btn == 'start' || Btn === "try" ? FormSubmit : null}>{Btn == 'start' && 'Approve' 
         ||Btn == 'try' && 'Try-Again'
         ||Btn == 'error' && 'Error' 
         ||Btn == 'done' && 'Done' 
         ||Btn == 'process' && 'In-Progress' 
          }</button>
        */}

              <button
                className={`rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark disabled:opacity-50 ${
                  Btn === "done" ? "" : "hidden"
                }`}
                tabIndex="-1"
                disabled={
                  (Btn != "done" && App_Btn == "init") ||
                  App_Btn == "error" ||
                  App_Btn === "process" ||
                  App_Btn === "done"
                    ? true
                    : false
                }
                onClick={App_Btn == "start" || App_Btn === "try" ? _Buy : null}
              >
                {(App_Btn == "start" && "Proceed to pay") ||
                  (App_Btn == "try" && "Try-Again") ||
                  (App_Btn == "error" && "Error") ||
                  (App_Btn == "done" && "Done") ||
                  (App_Btn == "process" && "In-Progress") ||
                  (App_Btn == "init" && "Proceed to pay")}
              </button>
              {/* <button
                type="button"
                disabled
                className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark disabled:opacity-50"
              >
                Proceed to pay
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
