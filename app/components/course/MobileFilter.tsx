import {FilterProps, FilterSectionProps} from "@/app/model/CourseInterface";
import {CourseList} from "@/app/components/course/CourseList";
import {Fragment, useState} from "react";
import {CheckBoxChecked, CheckBoxUnChecked, Filter} from "@/app/components/utils/Icon";
import {courseFilters} from "@/public/data/staticData";
import {filterAction} from "@/app/components/course/FilterReducer";
import {SearchInput} from "@/app/components/course/SearchInput";

//Filter Section Refers to the filter section used for mobile/smaller screens
export const FilterSection = ({
                                  filterState,
                                  filterDispatch,
                                  setSearchString,
                                  searchString,
                              }: FilterSectionProps) => {
    return (
        <>
            <div className="filters flex justify-between gap-4 mb-4 md:mb-8">
                <SearchInput
                    setSearchString={setSearchString}
                    searchString={searchString}
                />
                <FilterDropdown
                    filterState={filterState}
                    filterDispatch={filterDispatch}
                />
            </div>
            <CourseList searchString={searchString} filterState={filterState} />
        </>
    );
};


const FilterDropdown = ({ filterState, filterDispatch }: FilterProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    return (
        <Fragment>
            <div className="dropdown z-20">
                <div
                    className={`w-11 h-11 flex justify-center items-center gap-2 cursor-pointer border-gray-300 border border-solid rounded-lg ${dropdownOpen && "bg-gray-100"}`}
                    onClick={() => setDropdownOpen((open) => !open)}
                >
                    <Filter className={dropdownOpen ? "path-gray-700" : undefined} />
                </div>
                {dropdownOpen && (
                    <div className="rounded-lg shadow-lg p-6 dropdown-choices w-screen translate-x-4 fold:translate-x-0 fold:w-max max-w-xs sm:max-w-sm md:max-w-md grid grid-flow-row gap-2">
                        {courseFilters.map((section) => (
                            <section key={section.apiName}>
                                <header className="text-md font-medium text-gray-900">
                                    {section.displayName}
                                </header>
                                <div className="flex flex-wrap">
                                    {section.options.map((choice) => {
                                        const selected = filterState[section.apiName].includes(choice.value);
                                        const actionType = selected ? filterAction.REM : filterAction.ADD;
                                        return (
                                            <div className="px-3 py-2 basis-auto shrink-0" key={choice.value}>
                                                <div
                                                    className="cursor-pointer flex gap-2 items-center"
                                                    onClick={() => {
                                                        filterDispatch({
                                                            type: actionType,
                                                            payload: {
                                                                group: section.apiName,
                                                                value: choice.value,
                                                            },
                                                        });
                                                    }}
                                                >
                                                    {selected ? <CheckBoxChecked /> : <CheckBoxUnChecked />}
                                                    <label className={`text-sm shrink-0 cursor-pointer ${selected && "font-medium"}`}>
                                                        {choice.displayName}
                                                    </label>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        ))}
                    </div>
                )}
            </div>
        </Fragment>
    );
};