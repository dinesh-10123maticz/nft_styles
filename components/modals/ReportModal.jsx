import { useRef, useState } from "react"

//npm
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

//Function
import { report } from "@/actions/axios/user.axios"


/* eslint-disable react/no-unescaped-entities */
export default function ReportModal({item}) {
  const [Message,SetMessage] = useState('')
  const userData = useSelector(state=>state.LoginReducer.User.payload)
  const [btn,setBtn]=useState('Submit')
  const closeRef = useRef(null)
  const ReportSubmit =   async()  =>  {
    setBtn('process')
    const id = toast.loading('Reporting')
    if(Message == ''){
      toast.update(id, { render: "Enter Report Message", type: "success", isLoading: false, autoClose: 1000,closeButton:true,closeOnClick:true })
      SetValidateError({message:"Enter Report Message"})
    }
    else{
      var senddata = {
         ...item ,
        Address  :  userData.WalletAddress,
        CustomUrl  :  userData.CustomUrl,
        Message  :  Message
      }
      let Resp = await report(senddata)
      if(Resp){
        toast.update(id, { render: Resp?.msg, type: Resp?.success, isLoading: false, autoClose: 1000,closeButton:true,closeOnClick:true })
        setBtn('done')
        closeRef.current.click()
        }
    }

 }
  return (
    <div>
      <div
        className="modal fade place-content-center"
        id="reportModal"
        tabIndex="-1"
        aria-labelledby="placeBidLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog max-w-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="placeBidLabel">
                Report This Profile ?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeRef}
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
                  
                  <div className="text-sm dark:text-jacarta-400 align-center">It is long established fact that a render will be distracted by the readable content</div>
                </div>
                <div className="mb-[15px]">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-jacarta-700 dark:text-white">
                 Message
                </span>
              </div>

              <div className="relative mb-2 flex items-center overflow-hidden rounded-lg border border-jacarta-100 dark:border-jacarta-600">
              

              <textarea id="message" onChange={(e)=>SetMessage(e.target.value)} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

             
              </div>
              </div>
               

         
              </div>
            
           
            </div>
            {/* end body */}
            

            <div className="modal-footer">
              
            <button
            disabled={(btn == "process" || btn == "done") ? true : false}
            onClick={()=>ReportSubmit()}
                type="button"
                className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
              >
              {btn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
