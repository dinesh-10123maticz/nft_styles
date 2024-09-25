"use client"
import { getFaqList } from "@/actions/axios/cmsAxios";
import { faqs2 } from "@/data/faq";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Faq() {

  const [faqList, setFaqList] = useState([]);

  useEffect(() => {
  
    getFaqDetails();


}, []);
  const getFaqDetails = async () => {
    var resp = await getFaqList();
    console.log("resp_userlist",resp.data)
    if (resp?.status)
        setFaqList(resp.data);
}
  return (
    <div className="pt-20 pb-24">
      <h2 className="mb-10 text-center font-display text-xl font-medium text-jacarta-700 dark:text-white">
        Frequently asked questions
      </h2>
      <div className="mx-auto mb-10 max-w-md text-center text-lg dark:text-jacarta-300">
        Join our community now to get free updates and also alot of freebies are
        waiting for you or - 
        <Link href="/contact" className="text-accent">
          Contact Support
        </Link>
      </div>

      <div className="accordion mx-auto max-w-[35rem]" id="accordionFAQ">
        {faqList.map((elm, i) => (
          <div
            key={i}
            className="accordion-item mb-5 overflow-hidden rounded-lg border border-jacarta-100 dark:border-jacarta-600"
          >
            <h2 className="accordion-header" id={`faq-heading-${elm._id}`}>
              <button
                className={`accordion-button  relative flex w-full items-center justify-between bg-white px-4 py-3 text-left font-display text-jacarta-700 dark:bg-jacarta-700 dark:text-white ${
                  i == 0 ? "" : "collapsed"
                }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#faq-${elm._id}`}
                aria-expanded={true}
                aria-controls={`faq-${elm._id}`}
              >
                <span>{elm.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="accordion-arrow h-4 w-4 shrink-0 fill-jacarta-700 transition-transform dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
                </svg>
              </button>
            </h2>
            <div
              id={`faq-${elm._id}`}
              className={`accordion-collapse collapse ${
                i == 0 ? "show" : ""
              } visible`}
              aria-labelledby={`faq-heading-${elm._id}`}
              data-bs-parent="#accordionFAQ"
            >
              <div className="accordion-body border-t border-jacarta-100 bg-white p-4 dark:border-jacarta-600 dark:bg-jacarta-700">
                <div className="dark:text-jacarta-200"><div dangerouslySetInnerHTML={{__html:elm?.answer}}></div></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
