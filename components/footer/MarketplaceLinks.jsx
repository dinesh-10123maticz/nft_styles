
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function MarketplaceLinks() {
  const { Categorys } = useSelector((state) => state.LoginReducer);
console.log(Categorys , 'Categorysx')

const [nftCategories , setCAtegorylist ] = useState(Categorys)
useEffect(() => {
  setCAtegorylist(Categorys)
},[Categorys])
  return (
    <>
      {nftCategories.slice(0,5).map((elm, i) => (
        <li key={i}>
          <Link
            href={`/collections/${elm.value}`}
            className="hover:text-accent dark:hover:text-white"
          >
            {elm.label}
          </Link>
        </li>
      ))}
    </>
  );
}
