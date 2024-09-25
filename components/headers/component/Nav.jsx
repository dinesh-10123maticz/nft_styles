"use client";
import { explore, homes, pages, resources } from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import config from "../../../Config/config";
//npm
import { useSelector } from "react-redux";

export default function Nav() {
  const pathname = usePathname();
  const categories = useSelector((state) => state.LoginReducer.Categorys);
  const isActiveParentMenu = (menus) => {
    return menus.some(
      (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
    );
  };
  return (
    <>
      <li className="js-nav-dropdown group relative">
        <Link
          href="/"
          className={`dropdown-toggle flex items-center justify-between py-3.5 font-display text-base ${
            isActiveParentMenu(homes)
              ? "text-accent dark:text-accent"
              : "text-jacarta-700 dark:text-white"
          }  hover:text-accent focus:text-accent  dark:hover:text-accent dark:focus:text-accent lg:px-5`}
          aria-expanded="false"
          role="button"
        >
          Home
        </Link>
      </li>
      <li className="js-nav-dropdown nav-item dropdown group relative">
        <Link
          href="/collections"
          className="dropdown-toggle flex items-center justify-between py-3.5 font-display text-base text-jacarta-700 hover:text-accent focus:text-accent dark:text-white dark:hover:text-accent dark:focus:text-accent lg:px-5"
          id="navDropdown-3"
          aria-expanded="false"
          role="button"
          data-bs-toggle="dropdown"
        >
          Explore
          <i className="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="h-4 w-4 dark:fill-white"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
            </svg>
          </i>
        </Link>
        <ul
          className="dropdown-menu group-hover:visible lg:invisible -left-6 top-[85%] z-10 hidden grid-flow-col grid-rows-5 gap-x-4 whitespace-nowrap rounded-xl bg-white transition-all will-change-transform group-hover:opacity-100 dark:bg-jacarta-800 lg:absolute lg:!grid lg:translate-y-4 lg:py-8 lg:px-5 lg:opacity-0 lg:shadow-2xl lg:group-hover:translate-y-2 w-max"
          aria-labelledby="navDropdown-1"
        >
         <li key={"All"} className="flex gap-[2px]  mb-[10px]">
          <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-[30px] w-[30px] fill-current text-black dark:text-white ml-[5px] mr-[7px]"
                style={{ fill: "currentColor" }}
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d={"M22 12.999V20a1 1 0 0 1-1 1h-8v-8.001h9zm-11 0V21H3a1 1 0 0 1-1-1v-7.001h9zM11 3v7.999H2V4a1 1 0 0 1 1-1h8zm10 0a1 1 0 0 1 1 1v6.999h-9V3h8z"}
                />
              </svg>{"   "}
            <Link
              href={`/collections/${"All"}`}
              className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-accent focus:text-accent dark:hover:bg-jacarta-600"
            >
            
              <span className="font-display text-sm text-jacarta-700  dark:text-white">
                {"All NFTs"}
              </span>
            </Link>
          </li>
          {categories.slice(0,9).map((elm, i) => (
            <li key={i} className="flex gap-[2px] mb-[5px]">
              {console.log("sdggxx", elm)}
              <img
                src={config.IMG_URL + "/category/" + elm.image}
                className="w-[40px] h-[40px] rounded-[50%] p-[2px] object-cover"
              />
              <Link
                href={`/collections/${elm.value}`}
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-accent focus:text-accent dark:hover:bg-jacarta-600"
              >
                <span className="font-display text-sm text-jacarta-700 dark:text-white">
                  {elm.value}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </li>
      <li className="group">
        <Link
          href="/create"
          className={`flex items-center justify-between py-3.5 font-display text-base  ${
            "/create".split("/")[1] == pathname.split("/")[1]
              ? "text-accent dark:text-accent"
              : "text-jacarta-700 dark:text-white"
          }  hover:text-accent focus:text-accent dark:hover:text-accent dark:focus:text-accent lg:px-5`}
        >
          Create
        </Link>
      </li>
    </>
  );
}
