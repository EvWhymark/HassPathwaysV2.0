"use client";

import { SemesterTable } from "@/app/components/course/OfferTable";
import BreadCrumb from "@/app/components/navigation/Breadcrumb";
import {
  ICourseDescriptionSchema,
  ISemesterData,
} from "@/public/data/dataInterface";
import React, { Fragment, useEffect, useState } from "react";

/**
 * Interface for course name and code
 */
type ICourseParams = {
  params: {
    courseName: string;
    courseCode: string;
  };
};

// Empty course object template
const emptyCourse: ICourseDescriptionSchema = {
  title: "course not found",
  description: "description not found",
  prereqs: undefined,
  term: [{ year: "2023" }],
};

/**
 * React functional component for CoursePage.
 * Fetches and displays course information based on the courseName from params.
 *
 * @param data - Object containing course name and course code in params.
 */

const CoursePage: React.FC<ICourseParams> = (data) => {
  const { courseName, courseCode } = data.params;  // 现在从 params 中获取 courseName 和 courseCode

  const [courseDescription, setCourseDescription] =
    useState<ICourseDescriptionSchema>(emptyCourse);

  // Testing new API:
  useEffect(() => {
    const apiController = new AbortController();
  
    fetch(`/api/course/${encodeURIComponent(courseName)}?year=2022-2023`, {
      signal: apiController.signal,
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);  // 检查 data 的内容
        if (!data.error) {
          setCourseDescription({
            ...emptyCourse,
            title: data.name,
            description: data.description,
            prereqs: data.prerequisites,
            term: data.offered,
          });
          console.log("Updated courseDescription:", courseDescription);  // 检查状态更新后的 courseDescription
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  
    return () => {
      apiController.abort();
    };
  }, [courseName]);
  

  const term = courseDescription?.term ?? "Unfound Terms";
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
            { display: courseCode, link: "" },  // 仍然使用 courseCode 显示路径
          ]}
        />
        <h1>
          {displayCourseName} ({courseCode})  {/* 这里的括号中保留 courseCode */}
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
