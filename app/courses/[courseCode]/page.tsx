"use client";

import { SemesterTable } from "@/app/components/course/OfferTable";
import BreadCrumb from "@/app/components/navigation/Breadcrumb";
import {
  ICourseDescriptionSchema,
  ITerm,
} from "@/public/data/dataInterface";
import React, { Fragment, useEffect, useState } from "react";

/**
 * Interface for course code
 */
type ICourseParams = {
  params: {
    courseCode: string;
  };
};

// Empty course object template
const emptyCourse: ICourseDescriptionSchema = {
  title: "course not found",
  description: "description not found",
  prereqs: undefined,
  term: [],
};

/**
 * React functional component for CoursePage.
 * Fetches and displays course information based on the courseCode from params.
 *
 * @param data - Object containing course code in params.
 */
const CoursePage: React.FC<ICourseParams> = (data) => {
  const { courseCode } = data.params;

  const [courseDescription, setCourseDescription] =
    useState<ICourseDescriptionSchema>(emptyCourse);

  useEffect(() => {
    const apiController = new AbortController();

    fetch(`/api/course/${encodeURIComponent(courseCode)}?year=2022-2023`, {
      signal: apiController.signal,
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          // Convert the `offered` data to the `term` array
          const term: ITerm[] = [];

          // 判断学期信息并填充 term 数组
          const year = data.offered.even && !data.offered.odd
            ? "even years"
            : !data.offered.even && data.offered.odd
            ? "odd years"
            : "all years";

          term.push({
            year: year,
            spring: data.offered.spring ? { instructor: data.professors[0], seats: 30 } : null,
            summer: data.offered.summer ? { instructor: data.professors[0], seats: 25 } : null,
            fall: data.offered.fall ? { instructor: data.professors[0], seats: 20 } : null,
          });

          setCourseDescription({
            ...emptyCourse,
            title: data.name,
            description: data.description,
            prereqs: data.prerequisites,
            term: term,  // 使用转换后的 term 数据
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    return () => {
      apiController.abort();
    };
  }, [courseCode]);

  const term = courseDescription?.term ?? [];
  const displayCourseName = courseDescription?.title ?? "Unfound Course";
  const description = courseDescription?.description
    ? courseDescription.description
    : "No Description Found";
  const prereqs = courseDescription?.prereqs ?? "Unfound Prereqs";

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
          {displayCourseName} ({courseCode})
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
        <SemesterTable term={term} />
      </section>
    </Fragment>
  );
};

export default CoursePage;
