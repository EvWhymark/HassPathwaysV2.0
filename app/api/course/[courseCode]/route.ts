import { NextResponse, NextRequest } from "next/server";
import { ICourseSchema, IPrereqSchema, IPropertiesSchema, IOfferedSchema, ISingleYearOfferedSchema } from "@/public/data/dataInterface";
import { catalogList } from "@/public/data/staticData";
import path from "path";
import * as fs from "fs";
import { template } from "lodash";

function offeredConstructor(allData: Object[], courseData: any, course: string) {
  let offered_years: ISingleYearOfferedSchema[] = [];
  for (let yearData of allData) {
    for (let [i, j] of Object.entries(yearData)) {
      if (i === "year") {
        continue;
      }
      if (j.name === courseData[course]["name"]) {
        offered_years.push({
          year: yearData.year,
          fall: j.offered.fall,
          spring: j.offered.spring,
          summer: j.offered.summer,
        });
      }
    }
  }
  return offered_years;
}

function courseConstructor(courseData: any, course: string, allData: Object[]) {
  let prereq_inserting: IPrereqSchema = {
    raw_precoreqs: courseData[course]["rawprecoreq"],
    courses: courseData[course]["prerequisites"],
  };
  let whenOffered = courseData[course]["offered"];
  let properties: IPropertiesSchema = {
    HI: courseData[course]["properties"]["HI"],
    CI: courseData[course]["properties"]["CI"],
    major_restricted: courseData[course]["properties"]["major_restricted"],
  };
  let offered_years: ISingleYearOfferedSchema[] = offeredConstructor(allData, courseData, course);
  let courseSemester: IOfferedSchema = {
    years: offered_years,
    uia: whenOffered.uia,
    text: whenOffered.text,
  };
  return {
    title: courseData[course]["name"],
    courseCode: courseData[course]["ID"],
    filter: "",
    subject: courseData[course]["subj"],
    description: courseData[course]["description"],
    prereqs: prereq_inserting,
    attributes: properties,
    term: courseSemester,
    status: "No Selection",
  };
}

// Main GET function
export async function GET(request: NextRequest) {
  const pathParts = request.nextUrl.pathname.split("/");
  const selectedCourseCode = pathParts[pathParts.length - 1].toUpperCase();
  let subjLooking = selectedCourseCode.split("-")[0];
  let idLooking = selectedCourseCode.split("-")[1];
  const allData: Object[] = [];
  let response: ICourseSchema = {
    title : "Course not found",
    description: "des not found",
    filter: "",
    subject: subjLooking,
    courseCode: idLooking,
    prereqs: undefined,
    attributes: {
      CI: false,
      HI: false,
      major_restricted: false,
    },
    term: undefined,
    status: "No Selection",
  }
  for (let year of catalogList) {
    const jsonYear = path.join(process.cwd(), "json") + `/${year.text}` + "/courses.json";
    let yearData = JSON.parse(fs.readFileSync(jsonYear, "utf8"));
    yearData.year = year.text;
    allData.push(yearData);
  }
  
  let index: number = 0;
  for (let year of catalogList) {
    let courseData = allData[index];
    for (let course of Object.keys(courseData)) {
      if (subjLooking === courseData[course]["subj"] && idLooking === courseData[course]["ID"]) {
        response = courseConstructor(courseData, course, allData);
        break;
      }
    }
    if (response.title !== "Course not found") {
      break;
    }
    index++;
  }
  
  // Return the response
  return NextResponse.json(response);
}
