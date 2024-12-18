import { useState, useEffect, useRef } from "react";
import { Bookmark, BookmarkChecked, HelpIcon, CheckBoxBaseSuccess, CheckBoxBaseInProgress, CheckBoxBasePlanned } from "../utils/Icon";
import { IPathwaySchema } from "@/public/data/dataInterface";
import { useAppContext } from "@/app/contexts/appContext/AppProvider";
import { HelpBox } from "./helpBox";
import PathwayPopup from "@/app/components/pathway/PathwayPopup";
import { courseState } from "@/public/data/staticData";
import Link from "next/link";
import { MousePointer } from "lucide-react";

interface IPathwayCardProps {
  pathwayPopup: IPathwaySchema;
  isOpen: boolean;
}

const PathwayCard = ({ title, department, coursesIn, description, clusters, compatibleMinor }: IPathwaySchema) => {
  // TODO: use courses to determine the compatibility
  // TODO: change to bookmark state and update React Context
  // TODO: Compute tooltip
  
  const [bookmark, setBookmark] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const { courses } = useAppContext();
  const getBookmarks = () => {
    var bmks = localStorage.getItem("bookmarks")
    if (bmks == null) {
      localStorage.setItem("bookmarks", "[]");
    }
    else {
      setBookmark(JSON.parse(bmks).find(x => x.title === title) != undefined);
    }
  }

  let pathwayPopup: IPathwaySchema = { title: "", department: "", coursesIn: [], description: "", clusters: [], compatibleMinor: [] };
  pathwayPopup.title = title;
  pathwayPopup.department = department;
  pathwayPopup.coursesIn = coursesIn;
  pathwayPopup.description = description;
  pathwayPopup.clusters = clusters;
  let popupProp: IPathwayCardProps = { pathwayPopup: pathwayPopup, isOpen: popupOpen };
  
  const toggleBookmark = (e) => {
    e.stopPropagation();
    let current: IPathwaySchema[] = JSON.parse(localStorage.getItem("bookmarks"));
    if (bookmark)
      current = current.filter(i => i.title != title);
    else if (current.find(x => x.title === title) == undefined) {
      current.push({ title: title, department: department, coursesIn: coursesIn, description: description, clusters: clusters, compatibleMinor: compatibleMinor });
    }
    localStorage.setItem("bookmarks", JSON.stringify(current));
    setBookmark(!bookmark);
  }
  

  useEffect(() => {
    getBookmarks();
  }, [])
  // Statuses: Completed, In Progress, Planned, Interested, No Selection
  
  const inPathway = courses.filter((course) => coursesIn.includes(course.title));

  // TODO: map status to display so that we don't need different variables for each status
  /*
  let items = [];
  const statuses = courseState.map((state) => state.display);
  for (let status of statuses) {
    const statusCourses = inPathway.filter((course) => course.status === status);
    const statusItems = statusCourses.map((course) => (
      <div key={course.courseCode} className="flex gap-2 items-center">
        <p className="text-sm text-green-500">✔</p>
        <b className="text-sm">{course.courseCode}:</b>
        <p className="text-sm">{course.title}</p>
      </div>
    ));
    items.push(statusItems);
    console.log(courses);
  }
  */

  let completed = inPathway.filter((course) => course.status === "Completed");
  let inProgress = inPathway.filter((course) => course.status === "In Progress");
  let planned = inPathway.filter((course) => course.status === "Planned");
  let total_size = completed.length + inProgress.length + planned.length;
  let max_size = 3; // Change this variable to change pathway card course limit
  if (total_size > max_size) {
    if (completed.length > max_size) {
      completed = completed.slice(0, max_size);
    }
    let current_size = completed.length + inProgress.length;
    if (current_size > max_size) {
      inProgress = inProgress.slice(0, max_size - completed.length);
    }
    current_size = completed.length + inProgress.length;
    total_size = completed.length + inProgress.length + planned.length;
    if (total_size > max_size) {
      planned = planned.slice(0, max_size - current_size);
    }
  }
  
  const completedItems = completed.map((course) => (
    <div key={course.subject + "-" + course.courseCode} className="flex gap-2 items-center">
      <CheckBoxBaseSuccess/>
      <b className="text-md">{course.subject + "-" + course.courseCode}:</b>
      <p className="text-md">{course.title}</p>
    </div>
  ));
  const inProgressItems = inProgress.map((course) => (
    <div key={course.subject + "-" + course.courseCode} className="flex gap-2 items-center">
      <CheckBoxBaseInProgress/>
      <b className="text-md">{course.subject + "-" + course.courseCode}:</b>
      <p className="text-md">{course.title}</p>
    </div>
  ));
  const plannedItems = planned.map((course) => (
    <div key={course.subject + "-" + course.courseCode} className="flex gap-2 items-center">
      <CheckBoxBasePlanned/>
      <b className="text-md">{course.subject + "-" + course.courseCode}:</b>
      <p className="text-md">{course.title}</p>
    </div>
  ));

  const progressBar = () => {
    const green = completed.map((_, index) => (
        <div key={`Green-${index}`} className="indicator bg-bg-success-solid"></div>
    ));
    const yellow = inProgress.map((_, index) => (
        <div key={`Yellow-${index}`} className="indicator bg-bg-warning-solid"></div>
    ));
    const gray = planned.map((_, index) => (
        <div key={`Gray-${index}`} className="indicator bg-fg-disabled_subtle"></div>
    ));
    const rest = max_size - (green.length + yellow.length + gray.length);
    const white = Array.from({ length: rest }, (_, index) => (
        <div key={`White-${index}`} className="indicator bg-white border border-solid border-gray-400"></div>
    ));

    return (
        <div className="flex gap-1">
          {green}
          {yellow}
          {gray}
          {white}
        </div>
    );
  };

  const onCardClick = (e) => {
    e.stopPropagation();
    setPopupOpen(true);
  }
  return (
    <section className="">
      <div className ="cursor-pointer pathway-card h-full" onClick={(e) => (onCardClick(e))}>
        <header className="flex justify-between w-full items-start flex-shrink">
          <div className="w-[367px] mb-2">
            <div className="flex flex-col md:flex-row gap-2 items-start py-1">
              <Link className="pathway-title flex-1" href={'/pathways/'+title.replace("/", "+")} onClick={(e) => e.stopPropagation()}>{title}</Link>
              <p className="tag">{department}</p>
            </div>
            <div className="progress-bar">
              {progressBar()}
              <HelpIcon // TODO: Add tooltip
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
              />
              {isShown && (
                //<HelpBox/>
                true
                )
              }
            </div>
          </div>
          <div onClick={(e) => toggleBookmark(e)} className="p-2">
            {bookmark ? <BookmarkChecked /> : <Bookmark />}
          </div>
        </header>
        <div className="flex gap-3 flex-col flex-1">
          {completedItems}
          {inProgressItems}
          {plannedItems}
        </div>
        
        <button className="text-sm text-button-primary-bg hover:text-button-primary-bg_hover font-bold">
          Manage Course Selection
        </button>
      </div>
      <PathwayPopup pathwayPopup={pathwayPopup} open={popupOpen} onOpen={setPopupOpen}/>
    </section>
  );
};

const StatusIndicator = (status: string) => {
  return (
    <div className="w-4 h-4 basis-4 grow-0 shrink-0 rounded-lg bg-utility-gray-100 border border-solid border-utility-gray-300"></div>
  );
};

export default PathwayCard;
