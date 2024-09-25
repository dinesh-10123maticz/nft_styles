
/* eslint-disable react/no-unescaped-entities */
import { useReducer, useRef, useState } from "react"
import ReactDatetimeClass from "react-datetime"

import "react-datetime/css/react-datetime.css"; 
export default function Clockmodals({modal,setClockValue,closeModal,validDate}) {
  const [Clock , setClock ] = useState(null)
  console.log(modal,"modalmodal");
  const modelref = useRef(null)
  
  const CloSeModal = () => {
    modelref.current.click()
  }
  const handleendclock = (value) => {
      setClock(value)
      setClockValue(modal,value)
  }
  
  return (
    <div>
      <div
        className="modal fade place-content-center"
        id="clockModals"
        tabIndex="-1"
        aria-labelledby="placeBidLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog max-w-lg ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="placeBidLabel">
              Choose Date
              </h5>
              
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref={modelref}
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
            <ReactDatetimeClass
                  input={false}
                  // value={Clock}
                  isValidDate={validDate} // Validate the date
                  dateFormat="YYYY-MM-DD"
                  timeFormat="HH:mm:ss"
                  onChange={(value) => handleendclock(value)}   Handle date selection
                />
                   <div className="text-center-modal text-center pb-3 mb-3 mt-3">
                <button 
                 className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark" onClick={CloSeModal}>Done</button>
            </div>
            </div>
            {/* end body */}

            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
