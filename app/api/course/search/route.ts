import { NextResponse, NextRequest } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  // Fetch the course description and prerequisites data
  // const courseDescriptions = await (
  //   await fetch("https://raw.githubusercontent.com/quatalog/data/master/catalog.json")
  // ).json();

  // const courseAttributes = await (
  //   await fetch("https://raw.githubusercontent.com/quatalog/data/master/prerequisites.json")
  // ).json();

  // // Combine both datasets
  // const combinedData = Object.entries(courseAttributes).map(([code, attributes]) => ({
  //   title: courseDescriptions[code]?.name || "Unknown Course",
  //   courseCode: code,
  //   tag: attributes.attributes || [],
  //   description: courseDescriptions[code]?.description || "No description available",
  //   prereqs: attributes?.prerequisites || false,
  //   semester: 
  // }));

  // console.log(combinedData);
  // return NextResponse.json(combinedData);

  // Fetch local course JSON
  const catalogYear = params.get("catalogYear");
  const courseData = path.join(process.cwd(), "json") + `/${catalogYear}` + "/courses.json"
  const courses = JSON.parse(fs.readFileSync(courseData, "utf8"));

  return NextResponse.json(courses);
}
