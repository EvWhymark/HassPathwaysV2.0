"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavButton = ({
  link,
  text,
  Icon,
  keyword,
}: {
  link: string;
  text: string;
  Icon: any;
  keyword: string;
}) => {
  const pathname = usePathname();
  const selected = pathname.match(new RegExp(`${keyword}$`, "gm"));
  // const selected = pathname === keyword;

  return (
    <Link href={link}>
      <div
        className={`flex items-center py-2 px-3 gap-2 rounded-md hover:bg-utility-gray-300 ${
          selected && "text-utility-brand-800 bg-utility-gray-100"
        }`}
      >
        <Icon.type
          {...Icon.props}
          className={`${selected && "nav-button--selected"} hidden md:block`}
        />
        
        <span
          className={`text-sm lg:text-md font-semibold text-text-brand-primary ${
            !selected && "text-utility-gray-700"
          }`}
        >
          {text}
        </span>
      </div>
    </Link>
  );
};

export default NavButton;
