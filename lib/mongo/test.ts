import path from "path";
import clientPromise from ".";
import { Collection, Db, MongoClient } from "mongodb";
import { forEach } from "lodash";

import file20 from '../../json/2020/pathways.json';
import file21 from '../../json/2021/pathways.json';
import file22 from '../../json/2022/pathways.json';
import file23 from '../../json/2023/pathways.json';

let client: MongoClient;
let db: Db;
let file: Collection;

async function init() {
    if (db) return;
    try {
        client = await clientPromise;
        db = await client.db();
        file = await db.collection('2020');
    } catch (error) {
        throw new Error('Failed to establish connection to database');
    }
}

(async () => {
    await init();
})();

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

export async function getPathways(): Promise<{ data?: Pathway[]; error?: string }> {
    try {
        if (!file) await init();

        const result = await file
            .find({})
            .limit(20)
            .map((each: any) => ({
                _id: each._id.toString(),
                department: each.department,
                pathways: each.pathways,
            }))
            .toArray();

        console.log(result);

        return { data: result };
    } catch (error) {
        return { error: "Failed to fetch pathways" };
    }
}

export async function updatePathways(year: string): Promise<{ data?: Pathway[]; error?: string }> {
    try {
        if (!file) await init();
        
        var pathways: MongoPathway[] = file20;
        file = await db.collection('2020');
        switch (year) {
            case "2021":
                pathways = file21;
                file = await db.collection('2021');
                break;
            case "2022":
                pathways = file22;
                file = await db.collection('2022');
                break;
            case "2023":
                pathways = file23;
                file = await db.collection('2023');
                break;
            default:
                break;
        }

        // clear the collection
        file.deleteMany({});

        pathways.forEach(async (path: MongoPathway) => {
            const result = await file
                .insertOne(path, { writeConcern: undefined });
        });

        const result = await file
            .find({})
            .limit(100)
            .map((each: any) => ({
                _id: each._id.toString(),
                department: each.department,
                pathways: each.pathways,
            }))
            .toArray();

        console.log(result);

        return { data: result };

    } catch (error) {
        return { error: "Failed to fetch pathways" };
    }
}
