"use client";

import { SemesterTable } from "@/app/components/course/OfferTable";
import BreadCrumb from "@/app/components/navigation/Breadcrumb";
import {
  ICourseDescriptionSchema,
  ISemesterData,
} from "@/public/data/dataInterface";
import { TemplateContext } from "next/dist/shared/lib/app-router-context";
// import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import React, { Fragment, useDeferredValue, useEffect, useState } from "react";

/**
 * Interface for course code
 */
type ICourseCode = {
  params: {
    courseCode: string;
  };
};

// Empty course object template
const emptyCourse: ICourseDescriptionSchema = {
  title: "course not found",
  description: "des not found",
  prereqs: undefined,
  term: undefined,
  attributes: undefined,
};

/**
 * React functional component for CoursePage.
 * Fetches and displays course information based on the courseCode from params.
 *
 * @param data - Object containing course code in params.
 */

const CoursePage: React.FC<ICourseCode> = (data) => {
  const { courseCode } = data.params;

  // Here I use use state state to fetch data and repace the template data:
  const [courseDescription, setCourseDescription] =
    useState<ICourseDescriptionSchema>(emptyCourse);

  // Testing new API:
  useEffect(() => {
    const apiController = new AbortController();

    let ret = fetch(`http://localhost:3000/api/course/${courseCode}`, {
      signal: apiController.signal,
      cache: "no-store",
      next:{
        revalidate: false
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data structure is similar to your previous API
        setCourseDescription(data);
      })
      .catch((error) => {
        console.error("WARNING: ", error);
      });
      return () => apiController.abort();
  }, []);

  const term = courseDescription?.term ?? "Unfound Course Semester Offered";  
  
  const courseName = courseDescription?.title ?? "Unfound Course";
  const description = courseDescription?.description
    ? courseDescription.description
    : "No Description Found";
  const prereqs = courseDescription?.prereqs ?? "Unfound Prereqs";
  // const thsemesterOffered = courseDescription?.semesterOffered ?? "Unfound Course SemesterOfferend"

  return (
    <Fragment>
      <header className="description-header">
        <BreadCrumb
          path={[
            { display: "Courses", link: "/courses/search" },
            { display: courseCode, link: "" },
          ]}
        />
        <h1>
          {courseDescription.title} ({courseCode})
        </h1>
      </header>
      <section className="description-section">
        <header>
          <h3>Course Description</h3>
        </header>
        <p>{description}</p>
      </section>
      <section className="description-section">
        <header>
          <h3>Prerequisites</h3>
        </header>
        {!courseDescription.prereqs && <p>None</p>}
      </section>
      <section className="description-section">
        <header>
          <h3>Semester Offered</h3>
        </header>
        {
          term == "Unfound Course Semester Offered" ? <p>No Semester Data</p> : <SemesterTable years={term.years} />
        }
      </section>
    </Fragment>
  );
};

/**
 * TableData component to display instructor and available seats.
 *
 * @param data - Object containing instructor and seats data.
 */
const TableData = ({ data }: { data?: ISemesterData }) => {
  if (!data) return <div className="!text-gray-600">No Class</div>;

  const { instructor, seats } = data;
  return (
    <div>
      <div>
        {instructor.reduce((acc, inst) => {
          if (acc === "") return inst;
          return acc + ", " + inst;
        }, "")}
      </div>
      <div className="!text-gray-600">{seats}</div>
    </div>
  );
};
// Export the CoursePage component
export default CoursePage;
