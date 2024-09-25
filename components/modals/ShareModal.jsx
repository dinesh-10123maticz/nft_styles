import { useEffect, useState } from "react";

//functions
import { getnfttaglist } from "@/actions/axios/nft.axios";

//npm
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";

/* eslint-disable react/no-unescaped-entities */
export default function ShareModal({ title, url, from, closePop, quote }) {
  const [tag, setTag] = useState({});
  useEffect(() => {
     // Get modal element by its ID
     const modal = document.getElementById("placeBidModal");

     // Add event listener for when the modal is opened
     const handleModalOpen = () => {
      getnfttaglists();
     };
 
     // Attach Bootstrap modal event listeners
     modal.addEventListener("shown.bs.modal", handleModalOpen);
     return () => {
       modal.removeEventListener("shown.bs.modal", handleModalOpen);
       //  modal.removeEventListener('hidden.bs.modal', handleModalClose);
     };
  }, []);

  const getnfttaglists = async () => {
    var resp = await getnfttaglist();
    console.log("nft tage list", resp.data);
    var hastag = resp?.data?.filter((item) => item?.details == "Hashtag");
    setTag(hastag[0]);
  };

  return (
    <div>
      <div
        className="modal fade place-content-center"
        id="ShareModal"
        tabIndex="-1"
        aria-labelledby="placeBidLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog max-w-lg ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="placeBidLabel">
                Share
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
                <div className="flex flex-row justify-evenly">
                  <div className="flex justify-center flex-col items-center">
                    <FacebookShareButton
                      quote={quote}
                      url={`${url}${tag.nfttag}`}
                    >
                      <svg
                        class="h-8 w-8 text-red-500"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                      </svg>
                      <div className="text-sm dark:text-jacarta-400 text-center">
                        Facebook
                      </div>
                    </FacebookShareButton>
                  </div>
                  <div className="flex justify-center flex-col items-center">
                    <TelegramShareButton
                      title={title}
                      url={`${url}${tag.nfttag}`}
                    >
                      <svg
                        class="h-8 w-8 text-red-500"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
                      </svg>
                      <div className="text-sm dark:text-jacarta-400 text-center">
                        Telegram
                      </div>
                    </TelegramShareButton>
                  </div>
                  <div className="flex justify-center flex-col items-center">
                    <TwitterShareButton
                      title={title}
                      url={`${url}${tag.nfttag}`}
                    >
                      <svg
                        class="h-8 w-8 text-red-500"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                      </svg>
                      <div className="text-sm dark:text-jacarta-400 text-center">
                        Twitter
                      </div>
                    </TwitterShareButton>
                  </div>
                </div>
              </div>
            </div>
            {/* end body */}
          </div>
        </div>
      </div>
    </div>
  );
}
