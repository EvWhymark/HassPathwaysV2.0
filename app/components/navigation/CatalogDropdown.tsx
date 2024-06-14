"use client";

import React, {useEffect, useMemo, useRef, useState} from "react";
//@ts-ignore
import ChevronUp from "@/public/assets/svg/chevron-up.svg?svgr";
//@ts-ignore
import ChevronDown from "@/public/assets/svg/chevron-down.svg?svgr";
import { useAppContext } from "@/app/contexts/appContext/AppProvider";
import { catalogList } from "@/public/data/staticData";

const CatalogDropdown = () => {
  const { catalog_year, setCatalog } = useAppContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find the displaying text for catalog
  const catalogText:string = useMemo(() => {
    return catalogList.find((cat) => cat.value === catalog_year)?.text ?? "";
  }, [catalog_year]);

  useEffect(() => {
    if (!dropdownOpen) return;

    const outsideDropdown = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setDropdownOpen(false);
    };
    document.addEventListener("click", outsideDropdown);

    return () => document.removeEventListener("click", outsideDropdown);
  }, [dropdownOpen]);

  return (
    <div
      className="dropdown cursor-pointer flex items-center gap-2 w-[200px] md:w-[320px] bg-white border-solid border border-gray-300 text-gray-500 py-[10px] px-[14px] rounded-lg prevent-select text-xs md:text-sm lg:text-md"
      ref={dropdownRef}
      onClick={() => {
        setDropdownOpen((open) => !open);
      }}
    >
      <div className="grow">{catalogText}</div>
      <div>
        {!dropdownOpen && <ChevronDown />}
        {dropdownOpen && <ChevronUp />}
      </div>

      {dropdownOpen && (
        <div className="dropdown-choices z-10 ut-shadow-lg">
          {catalogList.map((choice) => {
            return (
              <div
                className="dropdown-choice"
                key={choice.value}
                data-value={choice.value}
                onClick={() => {
                  setCatalog(choice.value);
                }}
              >
                {choice.text}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CatalogDropdown;
