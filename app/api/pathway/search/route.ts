import { NextResponse, NextRequest } from "next/server";
import { IPathwaySchema, ICourseClusterSchema } from "@/public/data/dataInterface";
import { pathwayDepartment } from "@/public/data/staticData"; 
import * as fs from "fs";
import cors from "cors";
import path from "path";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const catalogYear = params.get("catalogYear");

  const pathways = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "json") + `/${catalogYear}` + "/pathways.json",
      "utf8"
    )
  );

  let pathwayResult: IPathwaySchema[] = [];

  for (var [pathwayName, data] of Object.entries(pathways)) {
    let description: string = "";
    let schema: Array<ICourseClusterSchema> = [];
    let allCourses: Array<string> = [];
    let department: string = "No Data";
    let resultPathway: IPathwaySchema = {
      title: pathwayName,
      description: "no pathway found",
      compatibleMinor: ["no pathway found"],
      department: department,
      coursesIn: ["no pathway found"],
      clusters: []
    }
    for (let key of Object.keys(pathways[pathwayName])) {
      if (key == "description"){
          description = pathways[pathwayName][key];
      }
      else if (key == "name" || key == "minor" || key == "remaining_header"){
          continue;
      }
      else{
          let temp_courses: Array<string> = [];
          for (let course_name of Object.keys(pathways[pathwayName][key])){
              temp_courses.push(course_name);
              allCourses.push(course_name);
          }
          let temp_description: string = "";
          let temp_name: string = key;
          if (key == 'Remaining'){
              temp_description = pathways[pathwayName]["remaining_header"] ? pathways[pathwayName]["remaining_header"] : "Take your remaining courses from this list:";
          } else{
              if (key == "Required"){
                  if (temp_courses.length == 1){
                      temp_description = "You must take the following course:";
                  } else {
                      temp_description = "Take all of the following courses:";
                  }
              } else {
                  temp_description = "You must take one of the following courses:";
                  temp_name = "One Of";
              }
          }
          let num = 3;
          if (key != "Remaining"){
              num = 1;
          }
          if (key == "Required"){
              num = temp_courses.length;
          }
          let cluster: ICourseClusterSchema = {
              name: temp_name,
              numCourses: num,
              description: temp_description,
              courses: temp_courses
          };
          schema.push(cluster);
      }
    }
    for (var [key, value] of Object.entries(pathwayDepartment)) {
      if (value.pathway == pathwayName){
        department = value.department;
        break;
      }
    }
    let totalCourses = 0;
    for (let cluster of schema){
      totalCourses += cluster.numCourses;
      if (cluster.name == "Remaining"){
        cluster.numCourses = allCourses.length - totalCourses
      }
    }   
    let clusterOrder = ["Required", "One Of", "Remaining"];
    schema.sort((a, b) => {
      return clusterOrder.indexOf(a.name) - clusterOrder.indexOf(b.name);
    });
    resultPathway = {
      description: description,
      title: pathwayName,
      department: department,
      compatibleMinor: pathways[pathwayName]["minor"] ? pathways[pathwayName]["minor"] : [],
      coursesIn: allCourses,
      clusters: schema,
    }
    pathwayResult.push(resultPathway);
  }

  const searchString = params.get("searchString");
  if (searchString) {
    pathwayResult = pathwayResult.filter((v) => v.title.toLowerCase().includes(searchString.toLowerCase()));
  }

  const departmentFilter = params.get("department");
  if (departmentFilter) {
    const departments = departmentFilter.split(",");
    pathwayResult = pathwayResult.filter((v) => departments.includes(v.department));
  }

  return NextResponse.json(pathwayResult);
}