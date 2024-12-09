import React, { useState } from "react";
import { useAppContext } from "../../contexts/appContext/AppProvider";
import Link from "next/link";
import CourseCardDropDown from "./CourseDropDownButton";
import { ICourseSchema, IOfferedSchema } from "@/public/data/dataInterface";
import CoursePopup from "./CoursePopup";
import OfferedSemestersTag from "./OfferedSemestersTag";

const CourseCard = ({
  title,
  courseCode,
  subject,
  attributes = {
    CI: false,
    HI: false,
    major_restricted: false
  },
  description = "",
  term = undefined,
  prereqs = undefined,
  status = "No Selection"
}: ICourseSchema) => {
  const [state, setState] = useState(status);
  const courseFull = { title, courseCode, subject, attributes, description, term, prereqs, status };
  const {courses, updateCourseState} = useAppContext();
  status = courses.find(course => course.title === title)?.status || "No Selection";
  return (
    <section className="course-card">
      <header className="course-title">
        <div className="flex flex-row items-start">
          <div className="flex-1">
            <Link
              href={`/courses/${subject + '-' + courseCode}`}
              className="text-md font-semibold break-normal"
            >
              {title}
            </Link>
            <p className="text-sm text-utility-gray-600">{subject + '-' + courseCode}</p>
          </div>
          <div>
            <CourseCardDropDown title={title} courseCode={courseCode} status={status} />
          </div>
        </div>
      </header>
      <div className="flex flex-col fold:flex-row justify-between items-start">
        <div className="flex flex-col">
          <div className="flex gap-x-1 flex-wrap items-center">
            {
            term?.years.length && term.years.length > 0 && (
              <div className="">
                {OfferedSemestersTag(term)}
              </div>
            )
            }
            {attributes && attributes.CI && (
              <p className="tag tag-primary">
                CI
              </p>
            )}
            {attributes && attributes.HI && (
              <p className="tag tag-primary">
                HI
              </p>
            )}
          </div>
          <div className="flex flex-wrap mt-1">
            {prereqs && prereqs.raw_precoreqs && (
              <div className="mt-1">
                <h4 className="text-sm font-semibold">Prerequisites:</h4>
                <ul className="text-sm text-utility-gray-600">
                  {prereqs.raw_precoreqs}
                </ul>
              </div>
            )}
          </div>
          <CoursePopup course={courseFull} />
        </div>
      </div>
    </section>
  );
};

export default CourseCard;
