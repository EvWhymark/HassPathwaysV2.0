import { NextResponse, NextRequest } from "next/server";
//import cors from "cors";

const tags_short_to_long = {
  HInq: "HASS Inquiry",
  CI: "Communication Intensive",
  PDII: "PDII Option for Engr Majors",
};

const hass_prefixes = [
  "ARTS",
  "COGS",
  "COMM",
  "ECON",
  "GSAS",
  "INQR",
  "ITWS",
  "LANG",
  "LITR",
  "PHIL",
  "PSYC",
  "STSO",
  "WRIT",
];

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const hass_courses_desc = Object.fromEntries(
    Object.entries(
      await (
        await fetch(
          "https://raw.githubusercontent.com/quatalog/data/master/catalog.json"
        )
      ).json()
    ).filter((c) => hass_prefixes.includes(c[0].substring(0, 4)))
  );

  const hass_courses_attributes = Object.entries(
    await (
      await fetch(
        "https://raw.githubusercontent.com/quatalog/data/master/prerequisites.json"
      )
    ).json()
  ).filter((c) => {
    const [key, _] = c;
    return Object.keys(hass_courses_desc).includes(key);
  });


  var blob = hass_courses_attributes;
  if (params.get("prefix")) {
    blob = blob.filter((c) =>
      params.get("prefix").includes(c[0].substring(0, 4))
    );
  }
  if (params.get("level")) {
    blob = blob.filter((c) =>
      params.get("level").includes(c[0].substring(5, 6))
    );
  }
  if (params.get("filter")) {
    blob = blob.filter((c) =>
      params
        .get("filter")
        .split(",")
        .map((p) => p.trim())
        .map((p) => tags_short_to_long[p])
        .every((v) => c[1]["attributes"].includes(v))
    );
  }
  var res = [];
  blob.forEach(([code, values]) =>
    res.push({
      title: hass_courses_desc[code]["name"],
      courseCode: code,
      tag: values["attributes"],
      description: hass_courses_desc[code]["description"],
      prereqs: values["prerequisites"],
    })
  );
  if (params.get("searchString")) {
    res = res.filter(
      (c) =>
        c["title"]
          .toLowerCase()
          .includes(params.get("searchString").toLowerCase()) ||
        c["courseCode"]
          .toLowerCase()
          .includes(params.get("searchString").toLowerCase())
    );
  }

  return NextResponse.json(res);
}
