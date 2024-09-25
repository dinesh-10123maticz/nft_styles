import { offers } from "@/data/itemDetails";
import Image from "next/image";
import Link from "next/link";

//npm
import { useSelector } from "react-redux";

export default function Offers({ owner, data, POPUPACTION }) {
  const { currency } = useSelector((state) => state.LoginReducer);
  const { web3, accountAddress, coinBalance } = useSelector(
    (state) => state.LoginReducer.AccountDetails
  );
  console.log(
    "Offers-->",
    data,
    owner,
    currency.find((item) => item.value == "CAKE")
  );
  return (
    <div
      role="table"
      className="scrollbar-custom grid max-h-72 w-full grid-cols-3 overflow-y-auto rounded-lg rounded-tl-none border border-jacarta-100 bg-white text-sm dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white"
    >
      <div className="contents" role="row">
        <div
          className="sticky top-0 bg-light-base py-2 px-4 dark:bg-jacarta-600"
          role="columnheader"
        >
          <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
            Price
          </span>
        </div>
        {/* <div
          className="sticky top-0 bg-light-base py-2 px-4 dark:bg-jacarta-600"
          role="columnheader"
        >
          <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
            USD Price
          </span>
        </div>
        <div
          className="sticky top-0 bg-light-base py-2 px-4 dark:bg-jacarta-600"
          role="columnheader"
        >
          <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
            Floor Difference
          </span>
        </div> */}
        {/* <div
          className="sticky top-0 bg-light-base py-2 px-4 dark:bg-jacarta-600"
          role="columnheader"
        >
          <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
            Expiration
          </span>
        </div> */}
        <div
          className="sticky top-0 bg-light-base py-2 px-4 dark:bg-jacarta-600"
          role="columnheader"
        >
          <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
            From
          </span>
        </div>
        <div
          className="sticky top-0 bg-light-base py-2 px-4 dark:bg-jacarta-600"
          role="columnheader"
        >
          <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
            Accept Offer
          </span>
        </div>
      </div>
      {data?.length > 0 ? (
        data?.map((elm, i) => (
          <div key={i} className="contents" role="row">
            <div
              className="flex items-center whitespace-nowrap border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
              role="cell"
            >
              <span className="-ml-1" data-tippy-content={elm.CoinName}>
                <Image
                  width={138}
                  height={138}
                  src="/img/chains/Sol_small.png"
                  alt="Sol"
                  className=" border-[5px] w-[30px]"
                />
              </span>
              <span className="text-sm font-medium tracking-tight text-green">
                {elm.TokenBidAmt} {elm?.CoinName}
              </span>
            </div>
            {/* <div
              className="flex items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
              role="cell"
            >
              {currency.find((item) => item.value == elm?.CoinName)?.usd ?? "0"}
            </div> */}
            {/* <div
              className="flex items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
              role="cell"
            >
              {elm.difference}
            </div> */}
            {/* <div
            className="flex items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
            role="cell"
          >
            {elm.expiration}
          </div> */}
            <div
              className="flex items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
              role="cell"
            >
              <Link href={`/user/${elm?.CustomUrl}`} className="text-accent">
                {elm.DisplayName}
              </Link>
            </div>
            <div
              className="flex items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
              role="cell"
            >
              {owner?.WalletAddress == accountAddress ? (
                <button
                  class="inline-block w-full rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                  onClick={() => POPUPACTION("dummy", "Accept", elm)}
                >
                  Accept
                </button>
              ) : elm?.TokenBidderAddress == accountAddress ? (
                <button
                  class="inline-block w-full rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                  onClick={() => POPUPACTION("dummy", "Bid", elm)}
                >
                  Edit Bid
                </button>
              ) : (
                <button
                class="inline-block w-full rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                
              >
                Offer
              </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center text-center h-[40px] w-full mx-5">
          {" "}
          No Bids Yet{" "}
        </div>
      )}
    </div>
  );
}
