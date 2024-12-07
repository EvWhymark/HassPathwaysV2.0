import { useAppContext } from "@/app/contexts/appContext/AppProvider";
import { ICourseClusterSchema, ICourseSchema } from "@/public/data/dataInterface";
import { FC, MouseEventHandler, useState } from "react";
import CourseCard from "../course/CourseCard";



const ClusterComponent = ({clusters}) => {
    const { courses } = useAppContext();
    const [selectedCluster, setSelectedCluster] = useState<number>(0);
    console.log(clusters);
    return (
        <section className="">
            <div className="py-1 px-1 sm:flex flex-wrap gap-x-1 hidden max-w-[723px] bg-utility-gray-50 rounded-lg border-utility-gray-200 border">
                {clusters && clusters.map((cluster, i) => {
                    return (
                        <SmallRadioButton
                            checked={selectedCluster === i}
                            label={cluster.name}
                            tag={cluster.courses.length}
                            clickCallback={() => setSelectedCluster(i)}
                        />
                    )})
                }
            </div>
            <div className="my-3 grid grid-flow-row gap-y-3">
                {clusters.length > 0 && <CourseList courses={
                    courses.filter((course) => clusters[selectedCluster].courses.includes(course.title)
                )} />}
            </div>
        </section>
    )
};

const SmallRadioButton = ({
    checked,
    label,
    tag,
    clickCallback,
  }: {
    checked: boolean;
    label: string;
    tag: number;
    clickCallback: MouseEventHandler;
  }) => {

    const fontStyle = checked ? "text-utility-gray-800" : "text-utility-gray-500";
    const fillStyle = checked ? "bg-text-white shadow-sm" : "bg-utility-gray-50";

    return (
        <button
            className={`flex py-1 px-3.5 gap-2 items-center !rounded-md hover:!bg-gray-100 ${fillStyle}`}
            onClick={clickCallback}
        >
            <span className={`text-sm font-semibold ${fontStyle}`}>
                {label}
            </span>
            <p className={`tag tag-gray`}>{tag}</p>
        </button>
    )
};

interface CourseListProps {
    courses: Array<ICourseSchema>;
  }
  
  const CourseList: FC<CourseListProps> = ({ courses }) => {
    return (
      <div className="my-3 grid grid-flow-row gap-y-3">
        {courses.map((course) => {
          return <CourseCard key={course.subject + "-" + course.courseCode} {...course} />;
        })}
      </div>
    );
  };

export default ClusterComponent;