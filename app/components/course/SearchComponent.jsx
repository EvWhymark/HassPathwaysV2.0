// "use client";

import {
  SearchIcon,
  Filter,
  CheckBoxChecked,
  CheckBoxUnChecked,
} from "@/app/components/utils/Icon";
import { Fragment, useState, useDeferredValue, useEffect } from "react";
import { courseFilters } from "@/public/data/courseFilter";
import CourseCard from "./CourseCard";

export const FilterAction = {
  ADD: "add",
  REM: "remove",
};

export const DesktopFilterSection = ({
  filterState,
  filterDispatch,
  searchString,
  setSearchString,
}) => {
  return (
    <>
      <div className="filters flex justify-start items-start gap-8 mb-4 md:mb-8">
        <DesktopFilter
          filterState={filterState}
          filterDispatch={filterDispatch}
        />
        <div className="grow flex flex-col gap-4">
          <SearchInput
            setSearchString={setSearchString}
            searchString={searchString}
          />
          <div className="max-h-[500px] overflow-y-scroll">
            <CourseList searchString={searchString} filterState={filterState} />
          </div>
        </div>
      </div>
    </>
  );
};

export const FilterSection = ({
  filterState,
  filterDispatch,
  setSearchString,
  searchString,
}) => {
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

const SearchInput = ({ searchString, setSearchString }) => {
  return (
    <label htmlFor="course-input" className="basis-0 grow">
      <div className="px-3.5 py-2.5 flex items-center gap-2 cursor-text border-gray-300 border border-solid rounded-lg input-wrapper">
        <SearchIcon />
        <input
          className="outline-none text-gray-500 text-md w-full basis-0 grow "
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

const DesktopFilter = ({ filterState, filterDispatch }) => {
  return (
    <div className="rounded-lg shadow-lg p-6 min-w-[290px] max-w-xs grid grid-flow-row gap-2 border border-solid border-gray-100">
      {courseFilters.map((section) => {
        return (
          <section key={section.apiName}>
            <header className="text-md font-medium text-gray-900">
              {section.displayName}
            </header>
            <div className="flex flex-wrap">
              {section.options.map((choice) => {
                const selected = filterState[section.apiName].includes(
                  choice.value
                );
                const actionType = selected
                  ? FilterAction.REM
                  : FilterAction.ADD;
                return (
                  <div
                    className="px-3 py-2 basis-auto shrink-0"
                    key={choice.value}
                  >
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
                      <label
                        className={`text-sm shrink-0 cursor-pointer ${
                          selected && "font-medium"
                        }`}
                      >
                        {choice.displayName}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};

const FilterDropdown = ({ filterState, filterDispatch }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Fragment>
      <div className="dropdown">
        <div
          className={`w-11 h-11 flex justify-center items-center gap-2 cursor-pointer border-gray-300 border border-solid rounded-lg ${
            dropdownOpen && "bg-gray-100"
          }`}
          onClick={() => setDropdownOpen((open) => !open)}
        >
          <Filter className={dropdownOpen ? "path-gray-700" : undefined} />
        </div>
        {dropdownOpen && (
          <div className="rounded-lg shadow-lg p-6 dropdown-choices w-max max-w-xs sm:max-w-sm md:max-w-md grid grid-flow-row gap-2">
            {courseFilters.map((section) => {
              return (
                <section key={section.apiName}>
                  <header className="text-md font-medium text-gray-900">
                    {section.displayName}
                  </header>
                  <div className="flex flex-wrap">
                    {section.options.map((choice) => {
                      const selected = filterState[section.apiName].includes(
                        choice.value
                      );
                      const actionType = selected
                        ? FilterAction.REM
                        : FilterAction.ADD;
                      return (
                        <div
                          className="px-3 py-2 basis-auto shrink-0"
                          key={choice.value}
                        >
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
                            {selected ? (
                              <CheckBoxChecked />
                            ) : (
                              <CheckBoxUnChecked />
                            )}
                            <label
                              className={`text-sm shrink-0 cursor-pointer ${
                                selected && "font-medium"
                              }`}
                            >
                              {choice.displayName}
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </Fragment>
  );
};

const CourseList = ({ searchString, filterState }) => {
  const [courseData, setCourseData] = useState([]);
  const deferSearchString = useDeferredValue(searchString);
  const deferFilterState = useDeferredValue(filterState);
  useEffect(() => {
    const apiController = new AbortController();

    fetch(
      `http://localhost:3000/api/course/search?${new URLSearchParams({
        searchString: deferSearchString,
        ...deferFilterState,
      })}`,
      {
        signal: apiController.signal,
        cache: "no-store",
        next: {
          revalidate: false,
        },
      }
    )
      .then((data) => data.json())
      .then((data) => setCourseData(data.res))
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.error("Fetching Error: ", err);
      });

    return () => apiController.abort("Cancelled");
  }, [deferFilterState, deferSearchString]);

  return (
    <section className="grid grid-flow-row gap-3">
      {courseData.map((course) => {
        return (
          <CourseCard {...course} key={course.title + course.courseCode} />
        );
      })}
    </section>
  );
};
