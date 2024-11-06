import { useAppContext } from "@/app/contexts/appContext/AppProvider";
import { XClose, CheckBoxBaseSuccess, CheckBoxBaseInProgress, CheckBoxBasePlanned, CheckBoxBaseEmpty } from "@/app/components/utils/Icon";
import React, { FC, MouseEventHandler, useCallback, useContext, useEffect, useState } from "react";
import CourseCard from "@/app/components/course/CourseCard";
import { ICourseSchema, IPathwayDescriptionSchema, IPathwaySchema } from "@/public/data/dataInterface";
import path from "path";
import { isUndefined, set, slice } from "lodash";
import cluster from "cluster";

const emptyPathway: IPathwaySchema = {
  description: "",
  title: "",
  department: "",
  compatibleMinor: [],
  coursesIn: [],
  clusters: [],
};

const PathwayPopup = () => {
    const { popupShown, setPopupShown, pathwayPopup, courses, catalog_year } = useAppContext(); 
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

    const clusterCreate = (index: number) => {
      const clusters = pathwayPopup?.clusters;
      if (!clusters || clusters.length == 0 || !clusters[index]) return null;
      let cluster = clusters[index];
      let clusterCourses = inPathway.filter((course) => cluster.courses.includes(course.title));
    
      let clusterItems = clusterCourses.map((course) => `${course.subject}-${course.courseCode}`);
      let clusterPrint = clusterItems.join(", ");
      if (clusterItems.length > 5){
        clusterItems = clusterItems.slice(0,5);
        clusterPrint = clusterItems.join(", ") + ", ...";
      }
      let icon = <CheckBoxBaseEmpty />;
      let selectedInCluster = selected.filter((course) => cluster.courses.includes(course.title));
      if (selectedInCluster.length == 0){
        icon = <CheckBoxBaseEmpty />;
      }
      if (selectedInCluster.length >= cluster.numCourses){
        icon = <CheckBoxBaseSuccess />;
        let one_success = false;
        for (let i = 0; i < cluster.numCourses; i++){
          if (selectedInCluster[i].status == "In Progress"){
            icon = <CheckBoxBaseInProgress />;
            break;
          }
          if (selectedInCluster[i].status == "Planned" && !one_success){
            icon = <CheckBoxBasePlanned />;
          }
          if (selectedInCluster[i].status == "Planned" && one_success){
            icon = <CheckBoxBaseInProgress />;
          }
          if (selectedInCluster[i].status == "Completed"){
            one_success = true;
          }
        }
      }
      if (selectedInCluster.length < cluster.numCourses){
        icon = <CheckBoxBaseInProgress />;
        let one_success = false;
        for (let i = 0; i < selectedInCluster.length; i++){
          if (selectedInCluster[i].status == "In Progress"){
            icon = <CheckBoxBaseInProgress />;
            break;
          }
          if (selectedInCluster[i].status == "Planned" && !one_success){
            icon = <CheckBoxBasePlanned />;
          }
          if (selectedInCluster[i].status == "Planned" && one_success){
            icon = <CheckBoxBaseInProgress />;
          }
          if (selectedInCluster[i].status == "Completed"){
            one_success = true;
          }
        }
      }
      if (selectedInCluster.length == 0){
        icon = <CheckBoxBaseEmpty />;
        clusterPrint = 4*cluster.numCourses + " Credits in " + clusterItems.join(", ") + ", ...";
      }else{
        let selectedCaveat = "";
        if (selectedInCluster.length > cluster.numCourses){
          selectedCaveat = ", ...";
        }
        let slicedInCluster = selectedInCluster.slice(0, cluster.numCourses);
        clusterPrint = slicedInCluster.map((course) => `${course.subject}-${course.courseCode}: ${course.title}`).join(", ") + selectedCaveat;
        if (selectedInCluster.length < cluster.numCourses){
          let shortClusterCourses = clusterCourses.filter((course) => !selectedInCluster.includes(course));
          selectedCaveat = "";
          if (shortClusterCourses.length > 3){
            shortClusterCourses = shortClusterCourses.slice(0,3);
            selectedCaveat = ", ...";
          }
          clusterPrint += ", " + 4*(cluster.numCourses - selectedInCluster.length) + " Credits in " + shortClusterCourses.map((course) => `${course.subject}-${course.courseCode}`).join(", ") + selectedCaveat;
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
    
    /*
    useEffect(() => {
      if (!pathwayData) return;
      setCurrentPathway(pathwayData.find((pathway) => pathway.title === pathwayName) ?? emptyPathway);
    }, [catalog_year, pathwayPopup]);*/

    return (
      <>
        <div
          className="fixed inset-0 bg-utility-gray-700 bg-opacity-75 transition-opacity backdrop-blur-sm flex items-center justify-center z-10"
          aria-hidden="true"
          onClick={disablePathwayPopup}
        />
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="modal-frame bg-white rounded-xl">
            <div className="modal-header bg-bg-primary p-8 rounded-t-xl flex flex-col items-start overflow-hidden">
                <div className="w-full flex-shrink flex justify-end">
                    <button className="">
                        <XClose onClick={disablePathwayPopup}/>
                    </button>
                </div>
                <div className="text-xl flex-1 mt-8">
                  {pathwayPopup.title}
                </div>
                <div className="mt-4 flex-auto">
                    <b className="text-sm text-text-tertiary">Requirements:</b>
                    {clusterCreate(0)}
                    {clusterCreate(1)}
                    {clusterCreate(2)}
                </div>
            </div>
            {selected.length != 0 && <div className="modal-body bg-white p-6 bg-bg-primary flex-grow">
              <div className="flex flex-col flex-grow overflow-y-auto w-full">
                {selected.map((course) => {
                      return <CourseCard key={course.subject + "-" + course.courseCode} {...course}/>;
                    })}
              </div>
            </div>}
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


export default PathwayPopup;