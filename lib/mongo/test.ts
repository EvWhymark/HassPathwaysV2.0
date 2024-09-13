import path from "path";
import clientPromise from ".";
import { Collection, Db, MongoClient } from "mongodb";

import file20 from '../../json/2019-2020/pathways.json';
import file21 from '../../json/2020-2021/pathways.json';
import file22 from '../../json/2021-2022/pathways.json';
import file23 from '../../json/2022-2023/pathways.json';

let client: MongoClient;
let db: Db;
let file: Collection;

async function init() {
    if (db) return;
    try {
        client = await clientPromise;
        db = await client.db();
    } catch (error) {
        throw new Error('Failed to establish connection to database');
    }
}

type Cluster = {
    name: string;
    courses: string[];
};

type PathwayDetails = {
    name: string;
    description: string;
    clusters: Cluster[];
};

type Pathway = {
    _id: string;
    department: string;
    pathways: PathwayDetails[];
};

type MongoPathway = {
    _id?: undefined;
    department: string;
    pathways: PathwayDetails[];
}

export async function getPathways(year: string, department: string, query: string): Promise<{ status?: string; data?: Pathway[]; error?: string }> {
    try {
        if (!db) await init();
        
        let pathways: MongoPathway[];
        switch (year) {
            case "2020-2021":
                pathways = file21;
                file = db.collection('2020-2021');
                break;
            case "2021-2022":
                pathways = file22;
                file = db.collection('2021-2022');
                break;
            case "2022-2023":
                pathways = file23;
                file = db.collection('2022-2023');
                break;
            default:
                pathways = file20;
                file = db.collection('2019-2020');
                break;
        }
        
        const queryObj: any = {};
        if (department) {
            queryObj.department = { $in: department.split(",") };
        }
        if (query) {
            queryObj["pathways.name"] = { $regex: query, $options: "i" };
        }

        const result = await file.find(queryObj).limit(20).toArray();
        const mappedResult = result.map((each: any) => ({
            _id: each._id.toString(),
            department: each.department,
            pathways: each.pathways,
        }));

        return {
            status: "ok",
            data: mappedResult,
        };
    } catch (error) {
        return {
            status: "error",
            error: "Failed to fetch pathways",
        };
    }
}

export async function updatePathways(year: string): Promise<{ status: string; data?: Pathway[]; error?: string }> {
    try {
        if (!db) await init();
        
        let pathways: MongoPathway[];
        switch (year) {
            case "2020-2021":
                pathways = file21;
                file = db.collection('2020-2021');
                break;
            case "2021-2022":
                pathways = file22;
                file = db.collection('2021-2022');
                break;
            case "2022-2023":
                pathways = file23;
                file = db.collection('2022-2023');
                break;
            default:
                pathways = file20;
                file = db.collection('2019-2020');
                break;
        }

        // clear the collection
        await file.deleteMany({});

        await file.insertMany(pathways);

        const result = await file.find({}).limit(100).toArray();
        const mappedResult = result.map((each: any) => ({
            _id: each._id.toString(),
            department: each.department,
            pathways: each.pathways,
        }));

        return { status: "ok", data: mappedResult };

    } catch (error) {
        return { status: "error", error: "Failed to fetch pathways" };
    }
}
