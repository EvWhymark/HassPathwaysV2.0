import { useAppContext } from "@/app/contexts/appContext/AppProvider";
import { XClose } from "@/app/components/utils/Icon";
import React, { FC, MouseEventHandler, useCallback, useContext, useEffect, useState } from "react";
import CourseCard from "@/app/components/course/CourseCard";
import { ICourseSchema } from "@/public/data/dataInterface";

const PathwayPopup = () => {
    const { popupShown, setPopupShown, pathwayPopup, courses } = useAppContext();
    let inPathway: ICourseSchema[] = courses.filter((course) => pathwayPopup.coursesIn.includes(course.title));
    let selected: ICourseSchema[] = inPathway.filter((course) => course.status !== "No Selection");
    selected = selected.sort((a, b) => a.status.localeCompare(b.status));

    const disablePathwayPopup = () => {
      setPopupShown(false);
    };

    const goToPathway = () => {
      disablePathwayPopup();
      window.location.replace('/pathways/'+pathwayPopup.title.replace("/", "+"));
    }

    return (
      <>
        <div className="fixed inset-0 bg-utility-gray-700 bg-opacity-75 transition-opacity backdrop-blur-sm flex items-center justify-center z-10" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="modal-frame bg-white rounded-xl shadow-lg">
            <div className="modal-header bg-bg-primary p-8 rounded-t-xl flex flex-col items-start">
                <div className="w-full flex-shrink flex justify-end">
                    <button className="">
                        <XClose onClick={disablePathwayPopup}/>
                    </button>
                </div>
                <div className="text-xl flex-1 mt-8">
                  {pathwayPopup.title}
                </div>
                <div className="mt-4">
                    <b className="text-sm text-text-tertiary">Requirements:</b>
                    <p className="text-sm mt-4">IHSS-4XXX</p>
                    <p className="text-sm mt-2">IHSS-2XXX</p>
                    <p className="text-sm mt-2">IHSS-1XXX</p>
                </div>
            </div>
            <div className="modal-body bg-white p-6 bg-bg-primary flex-grow">
              <div className="flex flex-col flex-grow overflow-y-auto w-full">
                {selected.map((course) => {
                      return <CourseCard key={course.subject + "-" + course.courseCode} {...course}/>;
                    })}
              </div>
            </div>
            <div className="modal-footer shadow-lg bg-bg-primary rounded-b-xl">
              <button className="text-sm text-button-tertiary-color-fg hover:text-button-tertiary-fg_hover font-bold" onClick={goToPathway}>
                View Pathway
              </button>
            </div>
          </div>
        </div>
      </>
    );
};

interface CourseListProps {
  courses: Array<ICourseSchema>;
}


export default PathwayPopup;