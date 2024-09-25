import { useRouter } from "next/navigation";

export default function Socials({data}) {
  console.log('Socials-->' , data )
  const router = useRouter();
  const copyCurrentUrl = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      // alert('URL copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy the URL: ', err);
    }
  };


  return (
    <>
   {   data?.Youtube && 
   <a href={data?.Youtube} target="_blank"
        className="flex w-full items-center rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
      >
        <span className="mt-1 inline-block">youtube</span>
      </a>}
{  data?.Twitter &&       <a
             href={data?.Twitter} target="_blank"
        className="flex w-full items-center rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
      >
        <span className="mt-1 inline-block">Twitter</span>
      </a>}
{  data?.Instagram &&     <a
      href={data?.Instagram} target="_blank"
        className="flex w-full items-center rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
      >
        <span className="mt-1 inline-block">instagram</span>
      </a>}
 {  data?.EmailId &&    <a
      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${data?.EmailId}&su=Hello&body=This+is+a+test`} target="_blank"
        className="flex w-full items-center rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
      >
        <span className="mt-1 inline-block">Email</span>
      </a>}
      <div
        onClick={copyCurrentUrl}
        className="cursor-pointer flex w-full items-center rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
      >
       
        <span className="mt-1 inline-block">Copy url </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="mr-2 h-4 w-4 fill-jacarta-300 group-hover:fill-accent dark:group-hover:fill-white"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 1 0-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 0 1 9.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z" />
        </svg>
      </div>
    </>
  );
}
