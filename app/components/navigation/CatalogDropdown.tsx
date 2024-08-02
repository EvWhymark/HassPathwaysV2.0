"use client";

import React, { useEffect, useRef, useState } from "react";
import ChevronUp from "@/public/assets/svg/chevron-up.svg?svgr";
import ChevronDown from "@/public/assets/svg/chevron-down.svg?svgr";
import { useAppContext } from "@/app/contexts/appContext/AppProvider";
import { catalogList } from "@/public/data/staticData";

const CatalogDropdown = () => {
  const { catalog_year, setCatalog } = useAppContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  //const [newCatalogText, setCatalogText] = useState("");
  const [newCatalogTextFirst, setFirst] = useState("");
  const [newCatalogTextSecond, setSecond] = useState("");

  // Find the displaying text for catalog
  const catalogText: string =
    catalogList.filter((cat) => cat.text === catalog_year)[0]?.text ?? "";

  useEffect(()=> {
    const temp = catalogList.filter((cat) => cat.text === catalog_year)[0]?.text ?? "";
    var str = temp.split("-");
    setFirst(str[0]);
    setSecond(str[1]);
  });

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
      className="dropdown cursor-pointer flex items-center justify-center gap-2 w-[200px] md:w-[180px] bg-white border-solid border border-gray-300 text-gray-500 py-[10px] px-[14px] rounded-lg prevent-select text-xs md:text-sm lg:text-md"
      ref={dropdownRef}
      onClick={() => {
        setDropdownOpen((open) => !open);
      }}
    >
      <div className="grow flex items-center justify-center">{newCatalogTextFirst} - {newCatalogTextSecond}</div>
      <div>
        {!dropdownOpen && <ChevronDown />}
        {dropdownOpen && <ChevronUp />}
      </div>

      {dropdownOpen && (
        <div className="dropdown-choices z-10 ut-shadow-lg">
          {catalogList.map((choice) => {
            var str = choice.text.split("-");
            var str1 = (str[0]);
            var str2 = (str[1]);
            return (
              <div
                className="grow flex items-center justify-center dropdown-choice"
                key={choice.text}
                data-value={choice.text}
                onClick={() => {
                  setCatalog(choice.text);
                }}
                style={{ paddingLeft: '10px', paddingRight: '10px' }}
              >
                <span style={{ marginRight: '28px' }}>
                  {str1} - {str2}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CatalogDropdown;
