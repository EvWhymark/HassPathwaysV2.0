import { NextResponse, NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Define interfaces for your data structures
interface CourseData {
  subj: string;
  crse: string;
  name: string;
  description: string;
  source: string;
  offered: any; // 添加 offered 字段以处理学期信息
  prerequisites: string[]; // 添加 prerequisites 字段
}

interface CourseDatabase {
  [key: string]: CourseData;
}

// Main GET function
export async function GET(request: NextRequest) {
  const pathParts = request.nextUrl.pathname.split("/");
  const selectedCourseName = decodeURIComponent(pathParts[pathParts.length - 1]);

  // Extract year from query params (e.g., ?year=2023-2024)
  const searchParams = request.nextUrl.searchParams;
  const selectedYear = searchParams.get("year") || "2022-2023"; // Default to 2022-2023 if no year is provided

  // Construct the file path based on the selected year
  const filePath = path.join(process.cwd(), "json", selectedYear, "courses.json");

  try {
    console.log("Attempting to read file from path:", filePath); // Debugging output to check file path

    const fileContents = await fs.readFile(filePath, "utf-8");
    const courses: CourseDatabase = JSON.parse(fileContents);

    console.log("Courses data:", courses);
    console.log("Looking for course name:", selectedCourseName);

    const courseDescription = courses[selectedCourseName];

    if (!courseDescription) {
      console.log("Course not found:", selectedCourseName);
      return new NextResponse(JSON.stringify({ error: "Course data not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new NextResponse(JSON.stringify(courseDescription), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to read courses.json:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to read courses.json" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
