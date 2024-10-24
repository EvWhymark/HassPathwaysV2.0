import { MouseEventHandler } from "react";
import { CheckBoxChecked, CheckBoxUnChecked } from "../utils/Icon";

import { SearchIcon } from "../utils/Icon";

type SearchInputProps = {
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchInput = ({
  searchString,
  setSearchString,
}: SearchInputProps) => {
  return (
    <label htmlFor="course-input" className="basis-0 grow">
      <div className="px-3.5 py-2.5 flex items-center gap-2 cursor-text border-utility-gray-300 border border-solid rounded-lg input-wrapper">
        <SearchIcon />
        <input
          className="outline-none text-utility-gray-500 text-md w-full basis-0 grow "
          type="text"
          name="course"
          id="course-input"
          value={searchString}
          placeholder="Search"
          onChange={(e) => setSearchString(e.target.value)}
        />
      </div>
    </label>
  );
};

type FilterCheckBoxProps = {
  checked: boolean;
  label: string;
  clickCallback: MouseEventHandler;
};

export const FilterCheckBox = ({
  checked,
  label,
  clickCallback,
}: FilterCheckBoxProps) => {
  return (
    <button
      className={`checkbox-group ${checked ? "checked" : ""}`}
      onClick={clickCallback}
    >
      {checked ? <CheckBoxChecked /> : <CheckBoxUnChecked />}
      <label>{label}</label>
    </button>
  );
};

type ModeRadioButtonProps = {
  checked: boolean;
  label: string;
  clickCallback: MouseEventHandler;
};

export const ModeRadioButton = ({
  checked,
  label,
  clickCallback,
}: ModeRadioButtonProps) => {
  return (
    <button
      className={`checkbox-group !border-solid ${
        checked ? "checked !bg-bg-brand-secondary" : ""
      }`}
      onClick={clickCallback}
    >
      {label}
    </button>
  );
};
