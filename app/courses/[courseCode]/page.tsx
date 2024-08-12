"use client";

import { SemesterTable } from "@/app/components/course/OfferTable";
import BreadCrumb from "@/app/components/navigation/Breadcrumb";
import {
  ICourseDescriptionSchema,
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
  term: [{ year: "2023" }],
};

/**
 * React functional component for CoursePage.
 * Fetches and displays course information based on the courseCode from params.
 *
 * @param data - Object containing course code in params.
 */
const CoursePage: React.FC<ICourseParams> = (data) => {
  const { courseCode } = data.params;  // 仅从 params 中获取 courseCode
  console.log("params:", data.params);  // 输出 params 的内容

  const [courseDescription, setCourseDescription] =
    useState<ICourseDescriptionSchema>(emptyCourse);

  // 使用 courseCode 进行 API 请求
  useEffect(() => {
    const apiController = new AbortController();
  
    fetch(`/api/course/${encodeURIComponent(courseCode)}?year=2022-2023`, {
      signal: apiController.signal,
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetch course data from:", courseCode);  // 在这里输出 API 返回的完整数据
        console.log("Fetched course data:", data);  // 在这里输出 API 返回的完整数据
        if (!data.error) {
          setCourseDescription({
            ...emptyCourse,
            title: data.name,
            description: data.description,
            prereqs: data.prerequisites,
            term: data.offered,
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
