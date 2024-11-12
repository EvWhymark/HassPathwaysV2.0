import { useAppContext } from "@/app/contexts/appContext/AppProvider";
import { XClose, CheckBoxBaseSuccess, CheckBoxBaseInProgress, CheckBoxBasePlanned, CheckBoxBaseEmpty } from "@/app/components/utils/Icon";
import React, { FC, MouseEventHandler, useCallback, useContext, useEffect, useState } from "react";
import CourseCard from "@/app/components/course/CourseCard";
import { ICourseSchema, IPathwayDescriptionSchema, IPathwaySchema } from "@/public/data/dataInterface";
import path from "path";
import { isUndefined, set, slice } from "lodash";
import cluster from "cluster";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const emptyPathway: IPathwaySchema = {
  description: "",
  title: "",
  department: "",
  compatibleMinor: [],
  coursesIn: [],
  clusters: [],
};

const PathwayPopup = (pathwayPopup: IPathwaySchema) => {
    const { courses, catalog_year } = useAppContext();
    const [currentPathway, setCurrentPathway] = useState(emptyPathway);
    const [popupShown, setPopupShown] = useState(false);
    let inPathway: ICourseSchema[] = courses.filter((course) => pathwayPopup.coursesIn.includes(course.title));
    let selected: ICourseSchema[] = inPathway.filter((course) => course.status !== "No Selection");
    selected = selected.sort((a, b) => a.status.localeCompare(b.status));
    
    const disablePathwayPopup = () => {
      setPopupShown(false);
    };

    const enablePathwayPopup = () => {
      setPopupShown(true);
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
      <Dialog> 
        <DialogTrigger asChild>
          <button className="text-sm text-button-primary-bg hover:text-button-primary-bg_hover font-bold"> 
            Manage Course Selection 
          </button> 
        </DialogTrigger>
        
        <DialogContent className="fixed left-4 right-4 flex flex-col items-center justify-center bg-bg-primary rounded-xl shadow-xl max-h-[918px] max-w-[771px] h-full m-4 mx-auto">
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
                <CourseCard key={course.subject + "-" + course.courseCode} {...course} />
              ))}
            </div>
          )}
          <button className="text-sm text-button-primary-bg hover:text-button-primary-bg_hover font-bold" onClick={goToPathway}>
            View Pathway
          </button>
        </DialogContent>
      </Dialog>
    );
    
};


export default PathwayPopup;