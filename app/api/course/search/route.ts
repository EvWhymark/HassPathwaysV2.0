import { NextResponse, NextRequest } from "next/server";
import { ICourseSchema, IPrereqSchema, ISingleYearOfferedSchema } from "@/public/data/dataInterface";
import { catalogList } from "@/public/data/staticData";
import path from "path";
import fs from "fs";

function courseConstructor (courses: any, course: string, catalogYear: string): ICourseSchema {
  let yearToInsert: ISingleYearOfferedSchema = {
    year: catalogYear,
    fall: courses[course]["offered"]["fall"],
    spring: courses[course]["offered"]["spring"],
    summer: courses[course]["offered"]["summer"],
  };
  let prereq_set = new Set<string>(courses[course]["prerequisites"]);
  let prereq_array = Array.from(prereq_set);
  return {
    title: course,
    courseCode: courses[course]["ID"],
    filter: "",
    description: courses[course]["description"],
    subject: courses[course]["subj"],
    status: "No Selection",
    prereqs: {
      courses: prereq_array,
      raw_precoreqs: courses[course]["rawprecoreq"],
    },
    term: {
      years: [yearToInsert],
      uia: courses[course]["offered"]["uia"],
      text: courses[course]["offered"]["text"],
    },
    attributes: {
      HI: courses[course]["properties"]["HI"],
      CI: courses[course]["properties"]["CI"],
      major_restricted: courses[course]["properties"]["major_restricted"],
    },
  }
}

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
  const transformedData: ICourseSchema[] = [];
  const coursesAdded: Set<string> = new Set<string>();

  for (let year of catalogList) {
    const jsonYear = path.join(process.cwd(), "json") + `/${year.text}` + "/courses.json";
    let yearData = JSON.parse(fs.readFileSync(jsonYear, "utf8"));
    for (let course of Object.keys(yearData)) {
      if (!coursesAdded.has(course)) {
        transformedData.push(courseConstructor(yearData, course, year.text));
      }
      coursesAdded.add(course);
    }
  }

  return NextResponse.json(transformedData);
}
