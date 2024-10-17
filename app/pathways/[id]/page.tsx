"use client";
import CourseCard from "@/app/components/course/CourseCard";
import BreadCrumb from "@/app/components/navigation/Breadcrumb";
import React, { FC, MouseEventHandler, useCallback, useContext, useEffect, useState } from "react";
import { useAppContext } from "@/app/contexts/appContext/AppProvider";
import {
  ICourseClusterSchema,
  ICourseSchema,
  IPathwayDescriptionSchema,
  IPathwaySchema,
} from "@/public/data/dataInterface";
import { useSearchParams } from "next/navigation";
import { set } from "lodash";
import { Bookmark, BookmarkChecked } from "@/app/components/utils/Icon";
import path from "path";
import { pathwayDepartment } from "@/public/data/staticData";

const pathwayTempData: IPathwayDescriptionSchema = {
  description: `This course embraces the science of psychology. The aim is for
  students to learn how using the scientific method provides important
  insights about mind, brain, and behavior. This course integrates
  research on neuroscience throughout all the standard topics in an
  introductory course in psychology. The course presents advances across
  all subfields of psychology. In addition to standard exams, there are
  online assignments for each chapter and online laboratory experiences.`,
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

// const pathwayTempData: IPathwayDescriptionSchema = {
//   description: `This course embraces the science of psychology. The aim is for
//   students to learn how using the scientific method provides important
//   insights about mind, brain, and behavior. This course integrates
//   research on neuroscience throughout all the standard topics in an
//   introductory course in psychology. The course presents advances across
//   all subfields of psychology. In addition to standard exams, there are
//   online assignments for each chapter and online laboratory experiences.`,
//   compatibleMinor: ["1234", "123435", "52", "General Psychological Minor"],
//   courses: [
//     {
//       name: "Art1",
//       description: "this is art",
//       courses: [
//         {
//           title: "art",
//           courseCode: "arts-4937",
//           tag: ["Fall"],
//         },
//         {
//           title: "art",
//           courseCode: "arts-1957",
//           tag: ["Fall"],
//         },
//       ],
//     },
//     {
//       name: "Elec",
//       description: "this is art",
//       courses: [
//         {
//           title: "ele",
//           courseCode: "arts-8294",
//           tag: ["Fall"],
//         },
//         {
//           title: "ele2",
//           courseCode: "arts-9854",
//           tag: ["Fall"],
//         },
//       ],
//     },
//   ],
// };

const emptyPathway: IPathwayDescriptionSchema = {
  description: "",
  compatibleMinor: [],
  courses: [],
  clusters: [],
};

type IPathwayID = {
  params: {
    id: string;
    year: string;
  };
};

const PathwayDescriptionPage: FC<IPathwayID> = (data: IPathwayID) => {
  // Convert pathname to pathwayName
  const [pathwayName, setPathwayName] = useState(data.params.id.replaceAll("%20", " ").replaceAll("%2C", ",").replaceAll("%2B", "/"));
  const {catalog_year} = useAppContext()
  const [bookmark, setBookmark] = useState(false);
  const [pathwayData, setPathwayData] =
  useState<IPathwayDescriptionSchema>(emptyPathway);

  const getBookmarks = () => {
    var bmks = localStorage.getItem("bookmarks")
    if (bmks == null) {
      localStorage.setItem("bookmarks", "[]");
    }
    else {
      setBookmark(JSON.parse(bmks).find(x => x.title === pathwayName) != undefined);
    }
  }

  
  const toggleBookmark = () => {
    let current: IPathwaySchema[] = JSON.parse(localStorage.getItem("bookmarks"));
    if (bookmark)
      current = current.filter(i => i.title != pathwayName);
    else if (current.find(x => x.title === pathwayName) == undefined) {
      let pathwayDept = pathwayDepartment.find(x => x.pathway === pathwayName);
      current.push({ title: pathwayName, department: pathwayDept ? pathwayDept.department : "None", coursesIn: pathwayData.courses });
    }
    localStorage.setItem("bookmarks", JSON.stringify(current));
    setBookmark(!bookmark);
  }

  useEffect(() => {
    if (data.params.id) {
      const name = data.params.id.replaceAll("%20", " ").replaceAll("%2C", ",").replaceAll("%2B", "/").replaceAll("%3A", ":");
      setPathwayName(name);
    }
  }, [data.params.id]);

  const loadDataOnlyOnce = async () => {
    const apiController = new AbortController();
    let res: IPathwayDescriptionSchema = emptyPathway;
    try {
      if (catalog_year === "") return res;
      const response = await fetch(`http://localhost:3000/api/pathway/individual?${new URLSearchParams({
        pathwayName: pathwayName,
        catalogYear: catalog_year
      })}`, {
        signal: apiController.signal,
        cache: "no-store",
        next: {
          revalidate: 0
        }
      });
      const data = await response.json();
      res = {
        description: data.description,
        compatibleMinor: data.compatibleMinor,
        courses: data.courses,
        clusters: data.clusters,
      };
    } catch (error) {
      console.error("WARNING: ", error);
    }
    return res;
  };
  

  // TODO: check if pathway exists, or return something empty
  useEffect(() => {
    const fetchData = async () => {
      const res = await loadDataOnlyOnce();
      setPathwayData(res);
    };
    fetchData();
    getBookmarks();
  }, [catalog_year]);

  if (pathwayData === emptyPathway) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <header className="mb-4 md:mb-8">
        <BreadCrumb
          path={[
            {
              display: "Pathways",
              link: "/pathways/search",
            },
            {
              display: pathwayName,
              link: "",
            },
          ]}
        />
        <div className="flex items-center">
          <h1 className="mt-5 text-display-xs md:text-display-sm font-semibold flex-1">
            {pathwayName}
          </h1>
          <button className="border-2 border-black rounded-full bg-gray-200 flex items-center p-4" onClick={toggleBookmark}>
            <h1 className="font-semibold">
              {bookmark ? "Remove from My Pathways" : "Add to My Pathways"}
            </h1>
            <div onClick={toggleBookmark} className="pl-2">
              {bookmark ? <BookmarkChecked /> : <Bookmark />}
            </div>
          </button>
        </div>
      </header>
      <section className="description-section">
        <header>
          <h3>Pathway Description</h3>
        </header>
        <p>{pathwayData.description}</p>
      </section>
      {
      pathwayData.compatibleMinor.length !== 0 &&
        <section className="description-section">
          <header>
            <h3>Compatible Minor</h3>
          </header>
          <ul>
            {pathwayData.compatibleMinor.map((minor, i) => {
              return <li key={i}>- {minor}</li>;
            })}
          </ul>
        </section>
      }
      <section className="description-section">
        <CourseSection clusters={pathwayData.clusters} />
      </section>
    </>
  );
};

//

interface CourseSectionProps {
  clusters: ICourseClusterSchema[];
}

const CourseSection: FC<CourseSectionProps> = ({ clusters }) => {
  const { courses } = useAppContext();

  if (courses.length === 0) return <></>;

  return (
    <>
      {clusters.length !== 0 && (
        <>
            {clusters.map((cluster) => (
              <div key={cluster.name + cluster.courses.map((course) => (
                course
              ))}>
                <header>
                  <h3>{cluster.name}</h3>
                </header>
                <ul>
                  <li>{cluster.description}</li>
                </ul>
                <div className="my-3 grid grid-flow-row gap-y-3">
                  <CourseList courses={
                    courses.filter((course) => cluster.courses.includes(course.title)
                  )} />
                </div>
              </div>
            ))}
        </>
      )}
    </>
  );
};


interface CourseClusterProps {
  title: string;
  selected: boolean;
  onClickEvent: MouseEventHandler;
  tag: string | number;
}

const CourseClusterSelection: FC<CourseClusterProps> = ({
  title,
  selected,
  onClickEvent,
  tag,
}) => {
  return (
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
};

interface CourseListProps {
  courses: Array<ICourseSchema>;
}

const CourseList: FC<CourseListProps> = ({ courses }) => {
  return (
    <div className="my-3 grid grid-flow-row gap-y-3">
      {courses.map((course) => {
        return <CourseCard key={course.subject + "-" + course.courseCode} {...course} />;
      })}
    </div>
  );
};

export default PathwayDescriptionPage;
