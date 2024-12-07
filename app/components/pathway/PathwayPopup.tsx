import { useAppContext } from "@/app/contexts/appContext/AppProvider";
import {
  CheckBoxBaseSuccess,
  CheckBoxBaseInProgress,
  CheckBoxBasePlanned,
  CheckBoxBaseEmpty,
} from "@/app/components/utils/Icon";
import React, { useEffect, useState } from "react";
import CourseCard from "@/app/components/course/CourseCard";
import { ICourseSchema, IPathwaySchema } from "@/public/data/dataInterface";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

const emptyPathway: IPathwaySchema = {
  description: "",
  title: "",
  department: "",
  compatibleMinor: [],
  coursesIn: [],
  clusters: [],
};

interface IPathwayPopupProps {
  pathwayPopup: IPathwaySchema;
  isOpen: boolean;
}

const PathwayPopup = ({ pathwayPopup, open, onOpen}) => {
  const { courses } = useAppContext();
  if (!pathwayPopup) {
    pathwayPopup = emptyPathway;
  }
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
    let clusterCourses = inPathway.filter((course) =>
      cluster.courses.includes(course.title)
    );

    let clusterItems = clusterCourses.map(
      (course) => `${course.subject}-${course.courseCode}`
    );
    let clusterPrint = clusterItems.join(", ");
    if (clusterItems.length > 5) {
      clusterItems = clusterItems.slice(0, 5);
      clusterPrint = clusterItems.join(", ") + ", ...";
    }
    let icon = <CheckBoxBaseEmpty />;
    let selectedInCluster = selected.filter((course) =>
      cluster.courses.includes(course.title)
    );
    if (selectedInCluster.length == 0) {
      icon = <CheckBoxBaseEmpty />;
    }
    if (selectedInCluster.length >= cluster.numCourses) {
      icon = <CheckBoxBaseSuccess />;
      let one_success = false;
      for (let i = 0; i < cluster.numCourses; i++) {
        if (selectedInCluster[i].status == "In Progress") {
          icon = <CheckBoxBaseInProgress />;
          break;
        }
        if (selectedInCluster[i].status == "Planned" && !one_success) {
          icon = <CheckBoxBasePlanned />;
        }
        if (selectedInCluster[i].status == "Planned" && one_success) {
          icon = <CheckBoxBaseInProgress />;
        }
        if (selectedInCluster[i].status == "Completed") {
          one_success = true;
        }
      }
    }
    if (selectedInCluster.length < cluster.numCourses) {
      icon = <CheckBoxBaseInProgress />;
      let one_success = false;
      for (let i = 0; i < selectedInCluster.length; i++) {
        if (selectedInCluster[i].status == "In Progress") {
          icon = <CheckBoxBaseInProgress />;
          break;
        }
        if (selectedInCluster[i].status == "Planned" && !one_success) {
          icon = <CheckBoxBasePlanned />;
        }
        if (selectedInCluster[i].status == "Planned" && one_success) {
          icon = <CheckBoxBaseInProgress />;
        }
        if (selectedInCluster[i].status == "Completed") {
          one_success = true;
        }
      }
    }
    if (selectedInCluster.length == 0) {
      icon = <CheckBoxBaseEmpty />;
      clusterPrint =
        4 * cluster.numCourses +
        " Credits in " +
        clusterItems.join(", ") +
        ", ...";
    } else {
      let selectedCaveat = "";
      if (selectedInCluster.length > cluster.numCourses) {
        selectedCaveat = ", ...";
      }
      let slicedInCluster = selectedInCluster.slice(0, cluster.numCourses);
      clusterPrint =
        slicedInCluster
          .map(
            (course) =>
              `${course.subject}-${course.courseCode}: ${course.title}`
          )
          .join(", ") + selectedCaveat;
      if (selectedInCluster.length < cluster.numCourses) {
        let shortClusterCourses = clusterCourses.filter(
          (course) => !selectedInCluster.includes(course)
        );
        selectedCaveat = "";
        if (shortClusterCourses.length > 3) {
          shortClusterCourses = shortClusterCourses.slice(0, 3);
          selectedCaveat = ", ...";
        }
        clusterPrint +=
          ", " +
          4 * (cluster.numCourses - selectedInCluster.length) +
          " Credits in " +
          shortClusterCourses
            .map((course) => `${course.subject}-${course.courseCode}`)
            .join(", ") +
          selectedCaveat;
      }
    }

    let clusterList = (
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
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent className="flex flex-col items-center justify-start bg-bg-primary rounded-xl shadow-xl max-h-[918px] max-w-[771px] h-[calc(100%-40px)] mx-auto xl:mx-0">
        <DialogHeader className="bg-bg-primary p-6 rounded-t-xl flex flex-col items-start bg-opacity-100 w-full">
          <div className="text-display-xs flex-1 mt-8">
            {pathwayPopup.title}
          </div>
          <div className="mt-4 flex-auto">
            <b className="text-sm text-text-tertiary">Requirements:</b>
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
