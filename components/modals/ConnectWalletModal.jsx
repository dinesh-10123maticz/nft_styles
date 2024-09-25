import Image from "next/image";
import solanaimg from '../../public/img/solana.svg';
import phantom from '../../public/img/Phantomicon.svg';
import mathwallet from '../../public/img/mathwallet.svg'
/* eslint-disable react/no-unescaped-entities */

//core
import { useRouter } from 'next/navigation'
import {  useRef, useState } from "react";

//Functions 
import { connectWallet } from "@/utlis/hooks/useWallet";
import { GetUserCookieToken, userRegister } from "@/actions/axios/user.axios";
import { isEmpty } from "@/actions/common";

//npm
import { toast } from "react-toastify";
import { useDispatch , useSelector } from "react-redux";
import { GetNftCookieToken } from "@/actions/axios/nft.axios";
import { useWallet } from "@solana/wallet-adapter-react";



export default function ConnectWalletModal() {

  // const { select ,connected } = useWallet();
  const dispatch = useDispatch()
  const navigate = useRouter()
  const modelcloseref = useRef()
  const { token } = useSelector(state => state.LoginReducer.User)

  // States
  const [accDetail, setAccDetail] = useState({})

  const closeModel = ()=>{
    modelcloseref.current.click();
  }

  // Connect Wallet function 
  const initialConnectWallet = async (type,title) => {
            const id=toast.loading( type+"Connecting")
                var accountDetails = await connectWallet(type)
                if (!isEmpty(accountDetails)) {
                    console.log("🚀 ~ initialConnectWal ~ accountDetails:", accountDetails)
                    var resp = await setWalletAddress('InitialConnect', accountDetails?.accountAddress, type,id)
                    console.log("resp",resp)
                    setAccDetail(accountDetails)
                    if (resp?.success === 'success') {
                        toast.update(id, { render: resp.msg, type: resp.success, autoClose: 1000, isLoading: false, closeButton: true, closeOnClick: true })
                        dispatch({
                            type: "Account_Section",
                            Account_Section: { AccountDetails: accountDetails }
                        })
                        closeModel()
                    }
                    else{
                      toast.update(id,{render : resp.msg , type : resp.success ,autoClose: 1000 , isLoading:false})
                    }
                }
                else toast.update(id, { render: `${type} wallet not recognised`,  type: 'error', autoClose: 1000, isLoading: false})
        }
        const setWalletAddress = async (type, walletAddress, walletType,id) => {
            console.log("🚀 ~ setWalletAddress ~ walletAddress:", walletAddress)
            if (walletAddress) {
                var NewMethod = {
                    Type: type,
                    WalletAddress: walletAddress,
                    WalletType: walletType,
                };
                let Resp = await userRegister(NewMethod);
                console.log('Resp-->',Resp)
                    if (Resp?.success == 'success') {
                      dispatch({
                            type: 'Register_Section',
                            Register_Section: {
                                User: {
                                    payload: Resp.data,
                                    token: Resp?.token ? Resp?.token : token
                                }
                            }
                        })
                        document.cookie = 'token' + "=" + Resp?.token + ";" + ";path=/";
                        GetNftCookieToken();
                        GetUserCookieToken();
                        return Resp
                    }
                    else return Resp
                // } else {
                //     toast.update(id, { render: "Create Profile First", type: 'success', autoClose: 1000, isLoading: false, closeButton: true, closeOnClick: true })
                //     setDataa(Resp?.data)
                //     console.log("Resp?.dataResp?.data",Resp?.data);
                //     // setUpdatePage(false)
                //     navigate(`/createProfile/${walletAddress}`,{ state: {code : referralLink ? referralLink : "" , ...Resp?.data } })
                // }
            }
            else return { success: 'error', msg: 'No Address Detected.. Check Your Wallet' }
    
        }
 


  return (
    <div>
      <div
        className="modal fade place-content-center"
        id="ConnectWalletModal"
        tabIndex="-1"
        aria-labelledby="placeBidLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog max-w-lg ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="placeBidLabel">
                Connect Wallets
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={modelcloseref}
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
            <div className="modal-body p-6 text-center">
           { <div className="flex items-center justify-evenly space-x-4">
            <div className="hover:cursor-pointer hover:opacity-75 flex flex-col items-center" onClick={()=>initialConnectWallet('math')}>
              <Image width={120} height={80} src={mathwallet} alt="math" className=" dark:invert" />
              <div className="font-display text-sm font-semibold text-jacarta-700 dark:text-white mt-[10px]">Math Wallet</div>
              </div>
              <div className="hover:cursor-pointer hover:opacity-75 flex flex-col items-center" onClick={()=>initialConnectWallet('phantom')}>
              <Image width={80} height={80} src={phantom}alt="solana" />
              <div className="font-display text-sm font-semibold text-jacarta-700 dark:text-white mt-[10px]">Phantom Wallet</div>
              </div>
           
              </div>}

              {/* <div className="flex items-center justify-evenly space-x-4 mt-[10px]">
              <div className="hover:cursor-pointer hover:opacity-75 flex flex-col items-center" onClick={()=>initialConnectWallet('solana')}>
              <Image width={80} height={80} src={solanaimg}alt="solana" />
              <div className="font-display text-sm font-semibold text-jacarta-700 dark:text-white mt-[10px]">Solana Wallet</div>
              </div>
              
             
              </div> */}
           
            </div>
            {/* end body */}



          </div>
        </div>
      </div>
    </div>
  );
}
