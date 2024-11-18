import { useAppContext } from "@/app/contexts/appContext/AppProvider";
import {
  CheckBoxBaseSuccess,
  CheckBoxBaseInProgress,
  CheckBoxBasePlanned,
  CheckBoxBaseEmpty,
} from "@/app/components/utils/Icon";
import React, { useState } from "react";
import CourseCard from "@/app/components/course/CourseCard";
import { ICourseSchema, IPathwaySchema } from "@/public/data/dataInterface";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { isUndefined } from "lodash";
import { on } from "events";

const emptyPathway: IPathwaySchema = {
  description: "",
  title: "",
  department: "",
  compatibleMinor: [],
  coursesIn: [],
  clusters: [],
};

const PathwayPopup = (pathwayPopup: IPathwaySchema) => {
  const { courses } = useAppContext();
  let inPathway: ICourseSchema[] = courses.filter((course) =>
    pathwayPopup.coursesIn.includes(course.title)
  );
  let selected: ICourseSchema[] = inPathway.filter(
    (course) => course.status !== "No Selection"
  );
  selected = selected.sort((a, b) => a.status.localeCompare(b.status));
  

  const goToPathway = () => {
    window.location.replace(
      "/pathways/" + pathwayPopup.title.replace("/", "+")
    );
  };

  const clusterCreate = (index: number) => {
    const clusters = pathwayPopup?.clusters;
    if (!clusters || clusters.length == 0 || !clusters[index]) return null;
    let cluster = clusters[index];
    if (cluster.name == "Required") {
      let requiredCourses = inPathway.filter(
        (course) =>
          cluster.courses.includes(course.title) && course.status == "No Selection"
      );
      selected.push(...requiredCourses);
    }
    
    let clusterCourses = inPathway.filter((course) =>
      cluster.courses.includes(course.title)
    );
    let icon = <CheckBoxBaseEmpty />;
    let selectedInCluster = selected.filter((course) =>
      cluster.courses.includes(course.title)
    );
    let emptyTarget = cluster.numCourses;
    let completedTarget = cluster.numCourses * 3;
    let points = 0;
    for (let i = 0; i < selectedInCluster.length; i++) {
      if (selectedInCluster[i].status == "Completed") {
        points += 3;
      } else if (selectedInCluster[i].status == "In Progress") {
        points += 2;
      } else {
        points += 1;
      }
    }
    points += (cluster.numCourses - selectedInCluster.length);
    if (points >= completedTarget) {
      icon = <CheckBoxBaseSuccess />;
    } else if (points > emptyTarget) {
      icon = <CheckBoxBaseInProgress />;
    } else {
      icon = <CheckBoxBasePlanned />;
    }
    
    let tooMany = "";
    clusterCourses.sort((a, b) => selectedInCluster.includes(a) ? -1 : 1);
    if (clusterCourses.length > 4){
      tooMany = " (+" + (clusterCourses.length - 4) + " more)";
      clusterCourses = clusterCourses.slice(0, 4);
    }

    const clusterPrintIDS = clusterCourses.map((course) => (
      <span key={course.subject + "-" + course.courseCode}>
        {course.status === "No Selection" ? (
          <span className="text-sm mr-1">
            {course.subject}-{course.courseCode}
          </span>
        ) : (
          <span className="text-sm font-bold mr-1">
            {course.subject}-{course.courseCode}
          </span>
        )}
      </span>
    ));
    
    const clusterPrint = (
      <div className="flex flex-wrap">
        <span className="mr-1">{cluster.name}: {cluster.numCourses === 1 ? `(${cluster.numCourses} Course Needed)` : `(${cluster.numCourses} Courses Needed)`}</span>
        {clusterPrintIDS}{tooMany}
      </div>
    );
    
    const clusterList = (
      <div className="mt-1">
        <p className="text-sm flex items-center">
          <span className="mr-2">{icon}</span>
          {clusterPrint}
        </p>
      </div>
    );

    return clusterList;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sm text-button-primary-bg hover:text-button-primary-bg_hover font-bold">
          Manage Course Selection
        </button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center justify-start bg-bg-primary rounded-xl shadow-xl max-h-[918px] max-w-[771px] h-[calc(100%-40px)] mx-auto xl:mx-0">
        <DialogHeader className="bg-bg-primary p-6 rounded-t-xl flex flex-col items-start bg-opacity-100 w-full">
          <div className="text-display-xs flex-1 mt-8">
            {pathwayPopup.title}
          </div>
          <div className="mt-4 flex-auto">
            {pathwayPopup.clusters.length != 0 && <b className="text-sm text-text-tertiary">Requirements:</b>}
            {pathwayPopup.clusters.length == 0 && <b className="text-sm text-text-tertiary">Description: </b>}
            {pathwayPopup.clusters.length == 0 && <span className="mt-1 text-sm">{pathwayPopup.description}</span>}
            {clusterCreate(0)}
            {clusterCreate(1)}
            {clusterCreate(2)}
          </div>
        </DialogHeader>
        {selected.length !== 0 && (
          <div className="flex flex-col bg-bg-primary p-6 flex-grow overflow-y-scroll w-full">
            {selected.map((course) => (
              <CourseCard
                key={course.subject + "-" + course.courseCode}
                {...course}
              />
            ))}
          </div>
        )}
        <button
          className="text-sm text-button-primary-bg hover:text-button-primary-bg_hover font-bold"
          onClick={goToPathway}
        >
          View All Courses
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default PathwayPopup;
