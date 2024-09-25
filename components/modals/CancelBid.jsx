/* Core */
import { useReducer, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

/* Files */
import SolanaContractHook from "@/utlis/hooks/solanaContractHook";
import Config from '@/Config/config'
import { BidApprove } from "@/actions/axios/nft.axios";


/* eslint-disable react/no-unescaped-entities */
export default function CancelBid({ closePop, owner, bidder, item, onhide }) {
  console.log("🚀 ~ CancelBid ~ bidder:", bidder)
  const { currency } = useSelector((state) => state.LoginReducer);
  const { accountAddress } = useSelector((state) => state.LoginReducer.AccountDetails);
  const { payload } = useSelector(state => state.LoginReducer.User)
  const ContractCall = SolanaContractHook();
  const [Btn, SetBtn] = useState('start')

  const FormSubmit = async () => {
    SetBtn("process");
    const id = toast.loading("Cancel Your order");
    var error = await ContractCall.Contract_Base_Validation();
    if (error) {
      toast.update(id, {
        render: error,
        type: "error",
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
        closeOnClick: true,
      });
      SetBtn("error");
    } else {
        let tokenAddress = currency?.filter(val=>val.label == bidder.CoinName)?.[0]?.address ?? Config.erc20Address
        let cont = await ContractCall.cancel_approveOrBid(tokenAddress,accountAddress)
        if(cont?.status){
          console.log("biiddd", bidder, item);
          var FormValue = {
            TokenBidderAddress: accountAddress,
            NFTQuantity: bidder.NFTQuantity,
            NFTId: item.NFTId,
            ContractAddress: item.ContractAddress,
            ContractType: item.ContractType,
            CollectionNetwork: item.CollectionNetwork,
            from: "Cancel",
            activity: "Cancel",
            Category: item.Category,
            EmailId: payload.EmailId,
            click: `${Config.FRONT_URL}/info/${item.CollectionNetwork}/${item.ContractAddress}/${owner.NFTOwner}/${owner.NFTId}`,
          };
          console.log("gsfgsfg", FormValue, bidder);
          let Resp = await BidApprove(FormValue);
          console.log("dksfgsdhkg", Resp);
          if (Resp.success == "success") {
            toast.update(id, {
              render: "Cancelled Bid Successfully",
              type: "success",
              isLoading: false,
              autoClose: 1000,
              closeButton: true,
              closeOnClick: true,
            });
            SetBtn("done");
            // closePop();
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else {
            toast.update(id, {
              render: "Transaction Failed",
              type: "error",
              isLoading: false,
              autoClose: 1000,
              closeButton: true,
              closeOnClick: true,
            });
            SetBtn("try");
          }
        }
        else{
          toast.update(id, {
            render: "Transaction Failed",
            type: "error",
            isLoading: false,
            autoClose: 1000,
            closeButton: true,
            closeOnClick: true,
          });
          SetBtn("try");
        }


      
    }
  };

  return (
    <div>
      <div
        className="modal fade place-content-center"
        id="CancelBidModal"
        tabIndex="-1"
        aria-labelledby="placeBidLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog max-w-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="placeBidLabel">
                Cancel Bid
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
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
              <div>
                <div className="mb-[20px]">
                  <div className="text-sm dark:text-jacarta-400 text-center">
                    You are about to delete
                  </div>
                  <div className="text-sm font-semibold dark:text-jacarta-400 text-center">
                    asdasd
                  </div>
                </div>
              </div>
            </div>
            {/* end body */}

            <div className="modal-footer">
              <div className="flex items-center justify-center space-x-4">
                <button
                  type="button"
                  className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                  disabled={
                    Btn == "error" || Btn === "process" || Btn === "done"
                      ? true
                      : false
                  }
                  onClick={Btn == "start" || Btn === "try" ? FormSubmit : null}
                >
                 {Btn == 'start' && 'Start'
                            || Btn == 'try' && 'Try-Again'
                            || Btn == 'error' && 'Error'
                            || Btn == 'done' && 'Done'
                            || Btn == 'process' && 'In-Progress'
                        }
                </button>
                <button
                  type="button"
                  className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
