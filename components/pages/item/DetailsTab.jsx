import Config from '@/Config/config'

export default function Details({NFTId}) {
  return (
    <div className="rounded-t-2lg rounded-b-2lg rounded-tl-none border border-jacarta-100 bg-white p-6 dark:border-jacarta-600 dark:bg-jacarta-700 md:p-10">
      <div className="mb-2 flex items-center">
        <span className="mr-2 min-w-[9rem] dark:text-jacarta-300">
          Contract Address:
        </span>
        <a href={`${Config.Block_URL}${Config.TradeContract}/${Config.devnet}`} className="text-accent">
          {Config.TradeContract}
        </a>
      </div>
      <div className="mb-2 flex items-center">
        <span className="mr-2 min-w-[9rem] dark:text-jacarta-300">
          Token ID:
        </span>
        <span
          className="js-copy-clipboard cursor-pointer select-none text-jacarta-700 dark:text-white"
          data-tippy-content="Copy"
        >
          {NFTId}
        </span>
      </div>
      <div className="mb-2 flex items-center">
        <span className="mr-2 min-w-[9rem] dark:text-jacarta-300">
          Token Standard:
        </span>
        <span className="text-jacarta-700 dark:text-white">SOL-SPL Token</span>
      </div>
      <div className="flex items-center">
        <span className="mr-2 min-w-[9rem] dark:text-jacarta-300">
          Blockchain:
        </span>
        <span className="text-jacarta-700 dark:text-white">{Config.Network}</span>
      </div>
    </div>
  );
}
