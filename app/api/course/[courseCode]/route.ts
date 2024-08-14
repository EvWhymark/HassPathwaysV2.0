import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Define interfaces for your data structures
interface Offered {
  even: boolean;
  fall: boolean;
  odd: boolean;
  spring: boolean;
  summer: boolean;
  text: string;
  uia: boolean;
}

interface Section {
  class: string;
  days: string;
  instructor: string;
  location: string;
  time: string;
  type: string;
}

interface Properties {
  CI: boolean;
  HI: boolean;
  major_restricted: boolean;
}

interface CourseData {
  ID: string;
  subj: string;
  name: string;
  description: string;
  cross_listed: string[];
  offered: Offered;
  prerequisites: string[];
  professors: string[];
  properties: Properties;
  sections: { [key: string]: Section };
}

interface CourseDatabase {
  [key: string]: CourseData;
}


// Main GET function
export function GET(request: Request) {
  const pathParts = request.url.split("/");
  const selectedCourseCode = decodeURIComponent(pathParts[pathParts.length - 1]);

  // Extract year from query params
  const url = new URL(request.url);
  const selectedYear = url.searchParams.get("year") || "2022-2023";

  // Construct the file path based on the selected year
  const filePath = path.join(process.cwd(), "json", selectedYear, "courses.json");

  return fs.readFile(filePath, "utf-8")
    .then((fileContents) => {
      const courses: CourseDatabase = JSON.parse(fileContents);

      // Extract subj and ID from courseCode
      const [subj, IDWithParams] = selectedCourseCode.split("-");
      const ID = IDWithParams.slice(0, 4);
      console.log("Searching for course with subj:", subj, "and ID:", ID);


      // Find the course by subj and ID
      // Find the course by subj and ID
      let courseDescription = null;
      for (const [key, course] of Object.entries(courses)) {
        console.log("Checking course:", key);
        console.log("Comparing subj:", course.subj.trim().toUpperCase(), "with", subj.trim().toUpperCase());
        console.log("Comparing ID:", course.ID.trim(), "with", ID.trim());

        if (course.subj.trim().toUpperCase() === subj.trim().toUpperCase() &&
            course.ID.trim() === ID.trim()) {
          courseDescription = course;
          break;
        }
      }

      // If course is not found, fall back to a specific key
      if (!courseDescription) {
        console.log("Course not found, falling back to '2D Experimental Animation'");
        if (courses.hasOwnProperty("2D Experimental Animation")) {
          courseDescription = courses["2D Experimental Animation"];
        } else {
          console.log("'2D Experimental Animation' not found in courses.");
          return (new NextResponse(JSON.stringify({ error: "Course data not found, and fallback failed." }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }));
        }
      }

      return new NextResponse(JSON.stringify(courseDescription), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    })
    .catch((error) => {
      console.error("Failed to read courses.json:", error);
      return new NextResponse(JSON.stringify({ error: "Failed to read courses.json" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    });
}
