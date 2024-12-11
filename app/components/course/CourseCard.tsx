import React, { useState } from "react";
import { useAppContext } from "../../contexts/appContext/AppProvider";
import Link from "next/link";
import CourseCardDropDown from "./CourseDropDownButton";
import { ICourseSchema, IOfferedSchema } from "@/public/data/dataInterface";
import CoursePopup from "./CoursePopup";
import OfferedSemestersTag from "./OfferedSemestersTag";
import AttributeTag from "./AttributeTag";

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
  const [popupShown, setPopupShown] = useState(false);
  status = courses.find(course => course.title === title)?.status || "No Selection";

  const popupOpen = () => {
    setPopupShown(true);
  };

  return (
    <section className="course-card relative">
      <div className="w-full h-full absolute top-0 right-0 left-0 bottom-0 hover:cursor-pointer z-0" onClick={popupOpen}></div>
      <header className="course-title">
        <div className="flex flex-row items-start">
          <div className="flex-1">
            <div className="text-md font-semibold break-normal">
              {title}
            </div>
            <p className="text-sm text-utility-gray-600">{subject + '-' + courseCode}</p>
          </div>
          <div className="z-10">
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
            <div className="flex gap-1">
              {AttributeTag(attributes)}
            </div>
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
          <CoursePopup course={courseFull} open={popupShown} onOpen={setPopupShown}/>
        </div>
      </div>
    </section>
  );
};

export default CourseCard;
