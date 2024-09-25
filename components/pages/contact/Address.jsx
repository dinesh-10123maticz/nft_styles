import { contactDetails, contactInfo } from "@/data/contactInfo";

export default function Address({data}) {
  console.log("mydatas",data)
  let Details =contactDetails(data)
  console.log("detaisldfd",Details)
  const start = 0; // Starting index
const end = 23;   // Ending index
  return (
    <div className="rounded-2.5xl border border-jacarta-100 bg-white p-10 dark:border-jacarta-600 dark:bg-jacarta-700">
      {Details.map((elm, i) => (
        <div
          key={i}
          className={`${
            i + 1 != Details.length ? "mb-6" : ""
          } flex items-center space-x-5`}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-jacarta-100 bg-light-base dark:border-jacarta-600 dark:bg-jacarta-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="fill-jacarta-400"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d={elm.iconSVGPath} />
            </svg>
          </span>

          <div>
            <span className="block font-display text-base text-jacarta-700 dark:text-white">
              {elm.icon}
            </span>
          
              <a
              href={elm.link}
              target="_blank"
              className="text-sm hover:text-accent dark:text-jacarta-300"
            >
               {elm?.text?.substring(start, end)+'...'}

            </a>
          
          
       
           
             
          </div>
        </div>
      ))}
    </div>
  );
}
