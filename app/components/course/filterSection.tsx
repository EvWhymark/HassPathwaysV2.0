"use client";

import {
  FilterSectionProps,
} from "@/app/model/CourseInterface";
import { CourseList } from "./CourseList";


// TODO: Have Website fetch courses no matter what page is used, not just the search page.
// Generates a list of courses based on the filter state and search string (which is empty in this case)

export const MyCourseDesktopFilterSection = ({
  filterState,
  filterDispatch,
  searchString,
  setSearchString,
}: FilterSectionProps) => {
  return (
    <>
      <div className="filters flex justify-start items-start gap-8 mb-4 md:mb-8">
        <div className="grow flex flex-col gap-4">
          <CourseList searchString={searchString} filterState={filterState} />
        </div>
      </div>
    </>
  );
}

export const MyCourseFilterSection = ({
  filterState,
  filterDispatch,
  setSearchString,
  searchString,
}: FilterSectionProps) => {
  return (
    <>
      <CourseList searchString={searchString} filterState={filterState} />
    </>
  );
}

