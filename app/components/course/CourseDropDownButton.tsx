import React, { useEffect, useState } from 'react';
import { ICourseSchema } from '@/public/data/dataInterface';
import { useAppContext } from "../../contexts/appContext/AppProvider";
import { clsx } from 'clsx';

const colorMap = {
  "No Selection": "bg-primary-700 text-white",
  "In Progress": "bg-orange-500 text-white",
  "Completed": "bg-green-500 text-white",
  "Planned": "bg-gray-500 text-white", 
};

const CourseCardDropDown = ({
  title,
  courseCode,
  status = "No Selection"
}: ICourseSchema) => {
  const [isOpen, setIsOpen] = useState(false);
  const {courses, updateCourseState} = useAppContext();
  //status = courses.find(course => course.name === title)?.status || "No Selection";
  const [dropDownText, setDropDownText] = useState<string>(status);
  const chipStyle = clsx("text-sm font-semibold px-2 py-2.5 border border-solid border-gray-300 rounded-lg cursor-pointer text-center", colorMap[dropDownText]);
  useEffect(() => {
    setDropDownText(status);
  }, [status]);

  const handleOption = (newStatus: string) => {
    updateCourseState(title, newStatus);
    setDropDownText(newStatus);
    setIsOpen(false);
  };
  /*
  useEffect(() => {
    if (dropDownText !== "No Selection") {
      setIsOpen(true);
    }
  }, [dropDownText]);
  */


  const dropdownProcess = () => {
    const removeItem = (
      <li className="py-2 px-4 bg-primary-200 hover:bg-primary-300 cursor-pointer flex items-center" onClick={() => handleOption("No Selection")}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
        </svg>
        <div className="flex-1 text-center">
          Remove
        </div>
      </li>
    );

    const plusIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
      </svg>
    );

    const plannedItem = (
      <li className="py-2 px-4 bg-gray-200 hover:bg-gray-300 cursor-pointer flex items-center" onClick={() => handleOption("Planned")}>
        {plusIcon}
        <div className="flex-1 text-center">
          Planned
        </div>
      </li>
    );

    const inProgressItem = (
      <li className="py-2 px-4 bg-warning-200 hover:bg-warning-300 cursor-pointer flex items-center" onClick={() => handleOption("In Progress")}>
        {plusIcon}
        <div className="flex-1 text-center">
          In Progress
        </div>
      </li>
    );

    const completedItem = (
      <li className="py-2 px-4 bg-success-200 hover:bg-success-300 cursor-pointer flex items-center" onClick={() => handleOption("Completed")}>
        {plusIcon}
        <div className="flex-1 text-center">
          Completed
        </div>
      </li>
    );
    
    switch (dropDownText) {
      case "No Selection":
        return (
          <>
            {plannedItem}
            {inProgressItem}
            {completedItem}
          </>
        );
      case "Planned":
        return (
          <>
            {inProgressItem}
            {completedItem}
            {removeItem}
          </>
        );
      case "In Progress":
        return (
          <>
            {plannedItem}
            {completedItem}
            {removeItem}
          </>
        );
      case "Completed":
        return (
          <>
            {plannedItem}
            {inProgressItem}
            {removeItem}
          </>
        );
      default:
        return removeItem;
    }  
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div
        id="fixed-size-div"
        className={chipStyle}
      >
        {dropDownText}
      </div>
      {isOpen && (
        <div className="absolute w-48 bg-white shadow-lg rounded-lg border border-solid border-gray-300 z-10">
          <ul>
              {
                dropdownProcess()
              }
          </ul>
        </div>
      )}
    </div>
  );
};

export default CourseCardDropDown;

// import React, { useEffect, useState } from 'react';
// import { CourseCardProps } from "@/app/model/CourseInterface";
// import { useAppContext } from "../../contexts/appContext/AppProvider";

// const colorMap = {
//   "No Selection": "bg-primary-700 text-white",
//   "Planned": "bg-orange-500 text-white",
//   "In Progress": "bg-green-500 text-white",
//   "Interested": "bg-blue-500 text-white", 
// };

// const CourseCardDropDown = ({
//   title,
//   courseCode,
//   status = "No Selection"
// }: CourseCardProps) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [dropDownText, setDropDownText] = useState<string>(status);
//   const { courses, setCourses } = useAppContext();

//   const updateCourseInContext = (newState: string) => {
//     const updatedCourses = courses.map(course =>
//       course.courseCode === courseCode
//         ? { ...course, status: newState }
//         : course
//     );
//     setCourses(updatedCourses);
//   };

//   // Handlers for dropdown options
//   const handleOption = (newStatus: string) => {
//     setDropDownText(newStatus);
//     updateCourseInContext(newStatus);
//     setIsOpen(false);
//   };

//   useEffect(() => {
//     if (dropDownText !== "No Selection") {
//       setIsOpen(true);
//     }
//   }, [dropDownText]);

//   return (
//     <div
//       className="relative"
//       onMouseEnter={() => setIsOpen(true)}
//       onMouseLeave={() => setIsOpen(false)}
//     >
//       <div
//         id="fixed-size-div"
//         className={`text-sm font-semibold px-2 py-2.5 border border-solid border-gray-300 rounded-lg cursor-pointer text-center ${colorMap[dropDownText]}`}
//       >
//         {dropDownText}
//       </div>
//       {isOpen && (
//         <div className="absolute w-48 bg-white shadow-lg rounded-lg border border-solid border-gray-300 z-10">
//           <ul>
//             {dropDownText === "No Selection" && (
//               <>
//                 <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer" onClick={() => handleOption("Planned")}>Planned</li>
//                 <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer" onClick={() => handleOption("In Progress")}>In Progress</li>
//                 <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer" onClick={() => handleOption("Interested")}>Interested</li>
//               </>
//             )}
//             {dropDownText !== "No Selection" && (
//               <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer" onClick={() => handleOption("No Selection")}>Remove</li>
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseCardDropDown;

/*
"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { appReducer } from "./AppReducer";
import { INITIAL_LOAD_DATA, SET_CATALOG, SET_COURSES } from "../actions";
import {
  courseState,
  pathwaysCategories,
  APPLICATION_STATE_KEY,
} from "@/public/data/staticData";
import { ApplicationContext } from "@/app/model/AppContextInterface";
import { ICourseSchema } from "@/app/model/CourseInterface";

const constantApplicationValue = { courseState, pathwaysCategories };

const defaultInitialState: ApplicationContext = {
  catalog_year: "2022-2023",
  courses: [],
  setCourses: () => {},
  setCatalog: () => {},
  ...constantApplicationValue,
};

const AppContext = createContext<ApplicationContext>(defaultInitialState);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, defaultInitialState);

  useEffect(() => {
    const localStorageString = localStorage.getItem(APPLICATION_STATE_KEY);
    const stateWithoutLocalStorage = {
      ...defaultInitialState,
      catalog_year: "2022-2023",
    };

    const initialState = localStorageString
      ? JSON.parse(localStorageString)
      : stateWithoutLocalStorage;

    dispatch({
      type: INITIAL_LOAD_DATA,
      payload: initialState,
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(APPLICATION_STATE_KEY, JSON.stringify(state));
  }, [state]);

  const setCatalog = (catalog_year: string) => {
    dispatch({ type: SET_CATALOG, payload: catalog_year });
  };

  const setCourses = (courses: ICourseSchema[]) => {
    dispatch({ type: SET_COURSES, payload: courses });

    // Save updated courses to local storage
    const updatedState = { ...state, courses };
    console.log("SET");
    localStorage.setItem(APPLICATION_STATE_KEY, JSON.stringify(updatedState));
  };

  const fetchCourses = async () => {
    const localStorageCourses = localStorage.getItem("courses");
    if (localStorageCourses) {
      console.log("Courses fetched from local storage...");
      const courses = JSON.parse(localStorageCourses);
      dispatch({ type: SET_COURSES, payload: courses });
      return courses;
    }

    if (state.courses.length === 0) {
      console.log("Courses not fetched yet, fetching now...");

      const apiController = new AbortController();
      const fetchUrl = `http://localhost:3000/api/course/search?`;

      try {
        const response = await fetch(fetchUrl, {
          signal: apiController.signal,
          cache: "force-cache",
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        const transformedData = Object.keys(data).map((courseName) => ({
          ...data[courseName],
          name: courseName,
          status: "No Selection",
        }));

        setCourses(transformedData);

        return transformedData;

      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetching Error: ", error);
        }
      }
    } else {
      console.log("Courses already fetched, returning existing courses...");
      return state.courses;
    }
  };

  return (
    <AppContext.Provider value={{ ...state, setCatalog, setCourses, fetchCourses }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export default AppContextProvider;
*/