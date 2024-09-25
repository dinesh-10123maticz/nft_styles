import { links } from "@/data/footerLinks";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function MyAccountKink() {
  const {accountAddress} = useSelector(state =>state.LoginReducer.AccountDetails)
  return (
    <>
      {links.map((elm, i) => (
        <li key={i}>
          <Link
            href={`${elm.href}${elm.href.includes("create") ? "" : accountAddress}`}
            className="hover:text-accent dark:hover:text-white"
          >
            {elm.name}
          </Link>
        </li>
      ))}
    </>
  );
}
