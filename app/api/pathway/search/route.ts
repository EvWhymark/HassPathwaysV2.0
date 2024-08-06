import { NextResponse, NextRequest } from "next/server";
import { IPathwaySchema } from "@/public/data/dataInterface";

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    console.log(params.get("catalogYear"));

    const catalogYear: string = params.get("catalogYear") || "2022-2023";
    const department: string = params.get("department") || "";
    const searchString: string = params.get("searchString") || "";

    const response = await fetch(`http://localhost:3000/api/getPathways?catalogYear=${catalogYear}&department=${department}&searchString=${searchString}`);
    if (!response.ok) {
      throw new Error("Server Reply Error");
    }

    const responseData = await response.json();
    let filteredPathways = responseData.files;

    if (department) {
      const departments = department.split(",");
      filteredPathways = filteredPathways.filter((c) => departments.includes(c["department"]));
    }

    let flattened = filteredPathways.flatMap((dep) => {
      return dep.pathways.map((path) => ({
        name: path.name,
        clusters: path.clusters,
        department: dep.department,
        required: path.required,
      }));
    });

    for (let c of flattened) {
      c["courses"] = c["clusters"]
        .map((b) => b["courses"])
        .flat()
        .concat(c["required"] || []);
    }

    if (searchString) {
      flattened = flattened.filter((v) => v.name.toLowerCase().includes(searchString.toLowerCase()));
    }

    const output: Array<IPathwaySchema> = flattened.map((data) => ({
      title: data.name,
      courses: data.courses,
      department: data.department,
    }));

    console.log("Searched for: " + catalogYear);
    return NextResponse.json(output);

  } catch (error: any) {
    return NextResponse.json({ status: "error", error: error.message }, { status: 500 });
  }
}

export function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
