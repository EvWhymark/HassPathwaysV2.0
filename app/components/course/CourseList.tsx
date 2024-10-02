import {IFilterState} from "@/app/model/CourseInterface";
import {useDeferredValue, useEffect, useState} from "react";
import {ICourseSchema} from "@/public/data/dataInterface";
import {useAppContext} from "@/app/contexts/appContext/AppProvider";
import {courseFilters} from "@/public/data/staticData";
import CourseCard from "@/app/components/course/CourseCard";
import dynamic from "next/dynamic";

const Spinner = dynamic(() => import("@/app/components/utils/Spinner"));

//TODO The interface is wrong for this component. Need to change this method or change IFilterState
export const CourseList = ({
                        searchString,
                        filterState,
                    }: {
    searchString: string;
    filterState: IFilterState;
}) => {
    const [filteredCourses, setFilteredCourses] = useState<ICourseSchema[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const deferredSearchString = useDeferredValue(searchString);
    const deferredFilterState = useDeferredValue(filterState);
    const { catalog_year, courses, fetchCourses} = useAppContext();


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await fetchCourses();
            setIsLoading(false);
        };
        fetchData();
    }, [catalog_year]);



    useEffect(() => {
        const tags_short_to_long = courseFilters.reduce((acc, section) => {
            section.options.forEach(option => {
                if (option.value && option.displayName) {
                    acc[option.value] = option.displayName;
                }
            });
            return acc;
        }, {} as Record<string, string>);

        const applyFilters = () => {
            let filtered = courses;

            // Prefix Filtering
            if (deferredFilterState.prefix.length) {
                filtered = filtered.filter(course =>
                    deferredFilterState.prefix.some(prefix =>
                        course.subj.startsWith(prefix)
                    )
                );
            }

            // Level Filtering
            if (deferredFilterState.level.length) {
                filtered = filtered.filter(course =>
                    deferredFilterState.level.some(level =>
                        course.ID.substring(0, 1) === level
                    )
                );
            }
            // Semester Filtering
            if (deferredFilterState.semester.length) {
                filtered = filtered.filter(course => {
                    const offeredSemesters = [];
                    if (course.offered.fall) offeredSemesters.push("F");
                    if (course.offered.spring) offeredSemesters.push("S");
                    if (course.offered.summer) offeredSemesters.push("U");
                    return deferredFilterState.semester.some(sem => offeredSemesters.includes(sem));
                });
            }

            if (deferredFilterState.status.length) {
                filtered = filtered.filter(course =>
                    deferredFilterState.status.includes(course.status)
                );

            }

            // CI and HI Filtering
            if (deferredFilterState.filter.length && tags_short_to_long) {
                filtered = filtered.filter(course => {
                    const courseTags = course.properties;

                    return deferredFilterState.filter.some(tag => {
                        const tagDisplayName = tags_short_to_long[tag];
                        return courseTags[tag] && tagDisplayName;
                    });
                });
            }

            // Prerequisite Filtering
            if (deferredFilterState.prereq.includes("Noreq")) {
                filtered = filtered.filter(course =>
                    course.prerequisites.length === 0
                );
            }

            // Search String Filtering
            if (deferredSearchString) {
                filtered = filtered.filter(course =>
                    course.name.toLowerCase().includes(deferredSearchString.toLowerCase()) ||
                    course.ID.toLowerCase().includes(deferredSearchString.toLowerCase())
                );
            }

            setFilteredCourses(filtered);
        };

        applyFilters();
    }, [deferredSearchString, deferredFilterState, courses]);
    // TODO: Make it so that this css can be changed depending on where the course list is being used (clsx)
    return (
        <section className="grid grid-cols-4 gap-4">
            {isLoading ? <Spinner /> : filteredCourses.map((course, i) => (
                <CourseCard
                    title={course.name}
                    courseCode={course.subj + '-' + course.ID}
                    properties={course.properties}
                    prerequsits={course.prerequisites}
                    offered={course.offered}
                    status={course.status}
                    key={i} />
            ))}
        </section>
    );
};