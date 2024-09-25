/* eslint-disable react/no-unescaped-entities */

import solanacontract from '@/utlis/hooks/solanaContractHook'
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from "next/navigation"
import { toast } from 'react-toastify';
import { CreateOrder } from '@/actions/axios/nft.axios';


export default function Cancel({
    item,
    owner,
    closePop
}) {


    const {push} = useRouter()
    const closeref = useRef()
    const [Btn, SetBtn] = useState('start')
    const {  accountAddress } = useSelector(state => state.LoginReducer.AccountDetails);
    const { payload } = useSelector(state => state.LoginReducer.User)

    const ContractCall = solanacontract();

    const FormSubmit = async () => {
        // debugger
        SetBtn('process')
        const id = toast.loading('Cancel Your order')
        var error = await ContractCall.Contract_Base_Validation()
        if (error) {
            toast.update(id, { render: error, type: 'error', isLoading: false, autoClose: 1000, closeButton: true, closeOnClick: true })
            SetBtn('error')
        }
        else {
                let cont = await ContractCall.cancel_approveOrBid(owner.NFTId,accountAddress)
                if (cont?.status) {
                    await Back_end(id, "")
                }
                else {
                    toast.update(id, { render: 'Transaction Failed', type: 'error', isLoading: false, autoClose: 1000, closeButton: true, closeOnClick: true })
                    SetBtn('try')
                }
            

        }
    }
    console.log("cancelorderitems", item)
    const Back_end = async (id, HashValue) => {

        owner.NFTCreator = item?.NFTCreator
        owner.HashValue = HashValue
        owner.NFTPrice = 0
        owner.CoinName = ''
        owner.NFTId = owner.NFTId
        owner.PutOnSale = 'true'
        owner.PutOnSaleType = 'UnlimitedAuction'
        owner.activity = "CancelOrder";
        owner.NFTOwner = accountAddress
        owner.Category = item.Category
        owner.EmailId = payload.EmailId
        owner.ContractType = item.ContractType
        owner.ContractAddress = item.ContractAddress
        owner.CollectionNetwork = item.CollectionNetwork

        console.log("dataincancelorger", owner)
        // debugger
        let Resp = await CreateOrder(owner)
        if (Resp.success == 'success') {

            toast.update(id, { render: "Cancelled Your Order Successfully", type: "success", isLoading: false, autoClose: 1000, closeButton: true, closeOnClick: true })
            SetBtn('done')
            closeref.current.click()
            // closePop();
            window.location.reload();
        }
        else {
            toast.update(id, { render: 'Transaction Failed', type: 'error', isLoading: false, autoClose: 1000, closeButton: true, closeOnClick: true })
            SetBtn('try')
        }
    }




    return (
        <div>
            <div
                className="modal fade place-content-center"
                id="cancel"
                tabIndex="-1"
                aria-labelledby="cancel"
                aria-hidden="true"
            >
                <div className="modal-dialog max-w-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="placeBidLabel">
                                Cancel Listing
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

                            <div>
                                <div className="mb-[20px]">

                                    <div className="text-sm dark:text-jacarta-400 text-center">You are about to Cancel Listing</div>
                                    <div className="text-sm font-semibold dark:text-jacarta-400 text-center">{item?.NFTName}</div>
                                </div>

                            </div>


                        </div>
                        {/* end body */}


                        <div className="modal-footer">
                            <div className="flex items-center justify-center space-x-4">
                               
                               
                            
                               
                               
                                <button
                                    type="button"
                                    disabled    =   {Btn == 'error' || Btn === "process"  ||  Btn ==="done" ? true : false} 
                                    onClick     =   {Btn == 'start' || Btn === "try" ? FormSubmit : null}
                                    className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                                >
                                     {Btn == 'start' && 'Start' 
                                ||Btn == 'try' && 'Try-Again'
                                ||Btn == 'error' && 'Error' 
                                ||Btn == 'done' && 'Done' 
                                ||Btn == 'process' && 'In-Progress' 
                                 }
                                </button>

                                <button
                                    type="button"
                                    onClick={closePop}
                                    data-bs-dismiss="modal"
                                aria-label="Close"
                                    disabled    =   {Btn === "process"  ||  Btn ==="done" ? true : false} 
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
