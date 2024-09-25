/* eslint-disable react/no-unescaped-entities */
import dummyimg from '@/public/img/login.jpg'
import Image from 'next/image';
import { useState } from 'react';
import Select from "react-select";
const collcections = [
  {
    id: 1,
    name: "Cake"
  },
  {
    id: 2,
    name: "Sol"
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
export default function LowerModal() {
  const initialTokenValue = {
    ClockTime: "",
    EndClockTime: "",
  };
  const [pricetype, setPricetype] = useState(true);
  const [NFTFormValue, setNFTFormValue] = useState(initialTokenValue);
  
  const DateSelection = (e, data) => {
    // console.log('datttteeeee',e.value,data,e.value == "Scheduled Listing")
    if (data == "start") {
      if (e.value == "List Immediately")
        setNFTFormValue({
          ...NFTFormValue,
          ...{
            ["ClockTime"]: moment(new Date()).format("YYYY-MM-DD h:mm:ss a"),
          },
        });
      else if (e.value == "Scheduled Listing") SetOpenPopup("ClockTime");
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
        }
        else {
          setNFTFormValue({
            ...NFTFormValue,
            ...{
              ["EndClockTime"]: moment(
                new Date(new Date(NFTFormValue.ClockTime).setDate(new Date(NFTFormValue.ClockTime).getDate() + 1))
              ).format("YYYY-MM-DD h:mm:ss a"),
            },
          });
        }
      } else if (e.value == "2 days") {

        console.log("NFTCOINNAME", NFTFormValue.CoinName)

        if (NFTFormValue.ClockTime === "") {
          setNFTFormValue({
            ...NFTFormValue,
            ...{
              ["EndClockTime"]: moment(
                new Date(new Date().setDate(new Date().getDate() + 2))
              ).format("YYYY-MM-DD h:mm:ss a"),
            },
          });
        }
        else {
          setNFTFormValue({
            ...NFTFormValue,
            ...{
              ["EndClockTime"]: moment(
                new Date(new Date(NFTFormValue.ClockTime).setDate(new Date(NFTFormValue.ClockTime).getDate() + 2))
              ).format("YYYY-MM-DD h:mm:ss a"),
            },
          });
        }
      }
      else if (e.value == "Scheduled Listing") SetOpenPopup("EndClockTime");
    }
  };
  return (
    <div>
      <div
        className="modal fade place-content-center"
        id="LowerModal"
        tabIndex="-1"
        aria-labelledby="placeBidLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog max-w-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="placeBidLabel">
                Put On Sale
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
              <div className="mb-[20px]">
              <Image src={dummyimg} className="w-[100%] h-[180px] object-cover rounded-[10px]" alt="solana" />

              </div>
              <div className="grid grid-cols-2 gap-3 flex-row flex-wrap flex max-[1070px]:grid-cols-1 mb-4">
                  <div className={`border p-[20px] rounded-[10px] hover:cursor-pointer ${pricetype && "bg-accent"}`} onClick={() => setPricetype(true)}>
                    <div className={`dark:text-jacarta-300 text-center ${pricetype && "!text-white"}`}>Fixed Price</div>
                  </div>
                  <div className={`border p-[20px] rounded-[10px] hover:cursor-pointer ${!pricetype && "bg-accent"}`} onClick={() => setPricetype(false)}>
                    <div className={`dark:text-jacarta-300 text-center ${!pricetype && "!text-white"}`}>Timed Auction</div>
                  </div>

                </div>
                {pricetype ?
                  <div className="mb-4">
                    <div className="mb-3">
                      <label
                        htmlFor="item-name"
                        className="mb-2 block font-display text-jacarta-700 dark:text-white"
                      >
                        Fixed Price (Max 7 digit)
                      </label>
                      <div className="relative mt-2 rounded-md shadow-sm">

                        <input
                          type="text"
                          id="item-name"
                          className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                          placeholder=""
                          required
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <label htmlFor="currency" className="sr-only">
                            Currency
                          </label>
                          <select
                            id="currency"
                            name="currency"
                            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                          >
                            <option>USD</option>
                            <option>CAD</option>
                            <option>EUR</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="dark:text-jacarta-300">Service Fees 2.5%</div>
                    <div className="dark:text-jacarta-300">You will receive SOL</div>
                  </div>
                  :

                  <div className="mb-4">
                    <div className="mb-3">
                      <label
                        htmlFor="item-name"
                        className="mb-2 block font-display text-jacarta-700 dark:text-white"
                      >
                        Minimum Bid (Max 7 digit)
                      </label>
                      <div className="relative mt-2 rounded-md shadow-sm mb-4">

                        <input
                          type="text"
                          id="item-name"
                          className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                          placeholder="eg.10"
                          required
                        />

                      </div>
                      <div className="grid grid-cols-2 gap-3 flex-row flex-wrap flex max-[1070px]:grid-cols-1 mb-4">
                        <div>
                          <label
                            // htmlFor="item-name"
                            className="mb-2 block font-display text-jacarta-700 dark:text-white" >
                            Starting Date
                          </label>
                          <Select options={startingdate}
                            value={{
                              value: NFTFormValue.ClockTime,
                              label: NFTFormValue.ClockTime ? NFTFormValue.ClockTime : "Starting Date",
                            }}
                            classNamePrefix="react-select"
                            isSearchable={false}
                            onChange={(e) =>
                              DateSelection(e, "start")
                            } />
                        </div>
                        <div>
                          <label
                            // htmlFor="item-name"
                            className="mb-2 block font-display text-jacarta-700 dark:text-white" >
                            Ending  Date
                          </label>
                          <Select
                            value={{
                              value:
                                NFTFormValue.EndClockTime,
                              label:
                                NFTFormValue.EndClockTime ? NFTFormValue.EndClockTime : "Ending Date",
                            }}
                            options={enddate}
                            classNamePrefix="react-select"
                            isSearchable={false}
                            onChange={(e) =>
                              DateSelection(e, "end")
                            } />
                        </div>


                      </div>
                    </div>

                  </div>
                }
            
            
              <div>
             
              </div>

              
           

            
            </div>
            {/* end body */}

            <div className="modal-footer">
              <div className="flex items-center justify-center space-x-4">
                <button
                  type="button"
                  className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                >
                Cancel
                </button>
                <button
                  type="button"
                  className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                >
                 Put on Sale
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
