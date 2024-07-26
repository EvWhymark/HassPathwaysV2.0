// public/data/CourseData.ts
import { IcourseStatus } from "./staticInterface";

export const COURSE_STATE_KEY = "courseState";

export const courseState: Array<IcourseStatus> = [
  { display: "Completed", value: 1 },
  { display: "In Progress", value: 2 },
  { display: "Planned", value: 3 },
  { display: "Interested", value: 4 },
  { display: "Not Selected", value: 5 },
];

// Function to get course state from local storage
export const getCourseStateFromLocalStorage = (): IcourseStatus[] => {
  const storedState = localStorage.getItem(COURSE_STATE_KEY);
  return storedState ? JSON.parse(storedState) : [];
};

// Function to set course state to local storage
export const setCourseStateToLocalStorage = (courseState: IcourseStatus[]): void => {
  localStorage.setItem(COURSE_STATE_KEY, JSON.stringify(courseState));
};
