"use client";
import React, { FC, useState, useEffect } from "react";
import CourseCard from "@/app/components/course/CourseCard";
import BreadCrumb from "@/app/components/navigation/Breadcrumb";
import { ICourseClusterSchema, ICourseSchema, IPathwayDescriptionSchema } from "@/public/data/dataInterface";
import useFetchPathways from "@/app/fetchPathways";
import {notFound} from "next/navigation";
import {result} from "lodash";

const pathwayTempData: IPathwayDescriptionSchema = {
  description: `This course embraces the science of psychology...`,
  compatibleMinor: ["1234", "123435", "52", "General Psychological Minor"],
  courses: [
    {
      title: "Introduction to abc",
      courseCode: "ACBD-1234",
      tag: ["Fall", "Spring"],
    },
    {
      title: "Introduction to React",
      courseCode: "ract-1234",
      tag: ["Fall", "Spring"],
    },
  ],
};

type IPathwayID = {
  params: {
    id: string;
  };
};


//TODO: Add minor and Course requirement
const PathwayDescriptionPage: FC<IPathwayID> = ({ params }) => {
    const pathwayName: string = decodeURIComponent(params.id).replaceAll("%20", " ");
    const [isLoading, setIsLoading] = useState(true);
    //This fetch IS SLOW 
    const resultPathways = useFetchPathways(pathwayName);
    const [pathwayDescription, setPathwayDescription ] = useState("");

    useEffect(() => {
        if (resultPathways.length > 0) {
            setIsLoading(false);
            const foundPathway = resultPathways.find(pathway => pathway.title === pathwayName);
            if (!foundPathway) {
                notFound();
            }
            setPathwayDescription(resultPathways[0].description);
        } else if (!resultPathways.length) {
            setIsLoading(false);
        }
    }, [resultPathways, pathwayName]);

    const pathwayData: IPathwayDescriptionSchema = pathwayTempData;
  
    return (
      <>
        <header className="mb-4 md:mb-8">
          <BreadCrumb
              path={[
                { display: "Pathways", link: "/pathways/search" },
                { display: pathwayName, link: "" },
              ]}
          />
          <h1 className="mt-5 text-display-xs md:text-display-sm font-semibold">
            {pathwayName}
          </h1>
        </header>
        <section className="description-section">
          <header>
            <h3>Pathway Description</h3>
          </header>
          <p>{pathwayDescription}</p>
        </section>
        <section className="description-section">
          <header>
            <h3>Compatible Minor</h3>
          </header>
          <ul>
            {pathwayData.compatibleMinor.map((minor, i) => (
                <li key={i}>- {minor}</li>
            ))}
          </ul>
        </section>
        <section className="description-section">
          <header>
            <h3>Requirement</h3>
          </header>
          <p>
            Students must choose a minimum of 12 credits as from the course list
            below.
          </p>
        </section>
        <section className="description-section">
          <header>
            <h3>Available Courses</h3>
          </header>
          <CourseSection courses={pathwayData.courses} />
        </section>
      </>
  );
};

interface CourseSectionProps {
  courses: Array<ICourseSchema> | Array<ICourseClusterSchema>;
}

const CourseSection: FC<CourseSectionProps> = ({ courses }) => {
  const [clusterIndex, setClusterIndex] = useState(0);

  if (courses.length === 0) return null;

  const isCluster = (obj: any): obj is ICourseClusterSchema => "name" in obj;

  const haveCluster = isCluster(courses[0]);
  const cluster: ICourseClusterSchema = courses[clusterIndex] as ICourseClusterSchema;

  return (
      <>
        {haveCluster ? (
            <>
              <ul className="rounded-lg flex flex-col sm:flex-row gap-2 p-1 bg-gray-50 border border-1 border-gray-200 list-none w-full sm:w-[500px] md:w-[723px] lg:w-full lg:max-w-[723px]">
                {courses.map((cluster: any, i: number) => (
                    <CourseClusterSelection
                        key={cluster.name}
                        title={cluster.name}
                        tag={cluster.courses.length}
                        selected={clusterIndex === i}
                        onClickEvent={() => setClusterIndex(i)}
                    />
                ))}
              </ul>
              <div className="my-3 grid grid-flow-row gap-y-3">
                <CourseList courses={cluster.courses} />
              </div>
            </>
        ) : (
            <CourseList courses={courses as Array<ICourseSchema>} />
        )}
      </>
  );
};

interface CourseClusterProps {
  title: string;
  selected: boolean;
  onClickEvent: React.MouseEventHandler;
  tag: string | number;
}

const CourseClusterSelection: FC<CourseClusterProps> = ({ title, selected, onClickEvent, tag }) => (
    <li
        className={`flex items-center text-xs md:text-sm cursor-pointer justify-center gap-x-2 px-3 py-[7px] rounded-[6px] font-semibold ${
            selected ? "text-gray-700 bg-white ut-shadow-lg" : "text-gray-500"
        }`}
        onClick={onClickEvent}
    >
      {title}
      <p className="tag tag-gray">{tag}</p>
    </li>
);

interface CourseListProps {
  courses: Array<ICourseSchema>;
}

const CourseList: FC<CourseListProps> = ({ courses }) => (
    <div className="my-3 grid grid-flow-row gap-y-3">
      {courses.map((course) => (
          <CourseCard key={course.courseCode} {...course} />
      ))}
    </div>
);

export default PathwayDescriptionPage;
