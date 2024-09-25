/* eslint-disable react/no-unescaped-entities */
export default function CreateModal({
  ApproveButton,
  UploadButton,
  TokenApproveCall,
  UploadIPFScall,
  MintCall,
  modelref,
  MintButton,
}) {
  return (
    <div>
      <div
        className="modal fade place-content-center"
        id="createModal"
        tabIndex="-1"
        aria-labelledby="placeBidLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog max-w-lg ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="placeBidLabel">
                Follow Steps
              </h5>
              
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref={modelref}
                >
                 {!(UploadButton == "done") && ( <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-6 w-6 fill-jacarta-700 dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                  </svg>
              )}

                </button>
            </div>

            {/* Body */}
            <div className="modal-body p-6">
              <div>
                <div className="mb-[20px]">
                  <div className="font-display text-sm font-semibold text-jacarta-700 dark:text-white">
                    IPFS Metadata
                  </div>
                  <div className="text-sm dark:text-jacarta-400">
                    Generates IPFS Metadata for your NFT
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <button
                    type="button"
                    className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                    disabled={
                      UploadButton == "process" ||
                      UploadButton == "done" ||
                      UploadButton == "stop"
                        ? true
                        : false
                    }
                    onClick={
                      UploadButton == "start" || UploadButton == "try"
                        ? UploadIPFScall
                        : null
                    }
                    disableRipple
                  >
                    {UploadButton == "stop" && "Start"}
                    {UploadButton == "start" && "Start"}
                    {UploadButton == "process" && "In-Progress"}
                    {UploadButton == "try" && "Try-Again"}
                    {UploadButton == "done" && "Done"}
                  </button>
                </div>
              </div>
              <div>
                <div className="mb-[20px]">
                  <div className="font-display text-sm font-semibold text-jacarta-700 dark:text-white">
                    Mint NFT
                  </div>
                  <div className="text-sm dark:text-jacarta-400">
                    Call Contract Method
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <button
                    type="button"
                    className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark disabled:opacity-50"
                    disabled={
                      MintButton === "stop" ||
                      MintButton == "process" ||
                      MintButton == "done"
                        ? true
                        : false
                    }
                    onClick={
                      MintButton == "start" || MintButton == "try"
                        ? MintCall
                        : null
                    }
                    disableRipple
                  >
                    {MintButton == "stop" && "Start"}
                    {MintButton == "start" && "Start"}
                    {MintButton == "process" && "In-Progress"}
                    {MintButton == "try" && "Try-Again"}
                    {MintButton == "done" && "Minted"}
                  </button>
                </div>
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
