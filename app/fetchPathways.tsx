import { useEffect, useState, useDeferredValue } from "react";
import { IPathwaySchema } from "@/public/data/dataInterface";
import { validCatalogYear } from "@/public/data/staticData";
import { useAppContext } from "@/app/contexts/appContext/AppProvider";

const useFetchPathways = (searchString: string) => {
    const { catalog_year } = useAppContext();
    const [resultPathways, setResultPathways] = useState<IPathwaySchema[]>([]);
    const deferSearchString = useDeferredValue(searchString);

    useEffect(() => {
        const apiController = new AbortController();
        const validYear = validCatalogYear.includes(catalog_year);
        const searchYear = validYear ? "2022-2023" : catalog_year;

        fetch(
            `http://localhost:3000/api/pathway/search?${new URLSearchParams({
                searchString: deferSearchString,
                department: "",
                catalogYear: searchYear,
            })}`,
            {
                signal: apiController.signal,
                cache: "no-store",
                next: {
                    revalidate: false,
                },
            }
        )
            .then((data) => data.json())
            .then((data) => {
                setResultPathways(data);
            })
            .catch((err) => {
                if (err.name === "AbortError") return;
                console.error("Fetching Error: ", err);
            });


    }, [catalog_year, deferSearchString]);

    return resultPathways;
};

export default useFetchPathways;
