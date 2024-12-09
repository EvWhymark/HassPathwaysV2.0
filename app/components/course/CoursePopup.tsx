import { ICourseSchema } from "@/public/data/dataInterface";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import OfferedSemestersTag from "./OfferedSemestersTag";
import Link from "next/link";
import AttributeTag from "./AttributeTag";

const CoursePopup = ({course, open, onOpen}) => {
    let quatalog_link = "https://quatalog.com/courses/" + course.subject + "-" + course.courseCode;
    return (
        <Dialog open={open} onOpenChange={onOpen}>
            <DialogContent className="flex flex-col items-center justify-start bg-bg-primary rounded-xl shadow-xl max-h-[918px] max-w-[771px] h-[calc(100%-40px)] mx-auto xl:mx-0">
                <DialogHeader className="bg-bg-primary p-6 rounded-t-xl flex flex-col items-start bg-opacity-100 w-full">
                    <div className="text-display-xs flex-1 mt-8">
                        {course.title} ({course.subject}-{course.courseCode})
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        {course.term.years && course.term.years.length > 0 && 
                            OfferedSemestersTag(course.term)
                        }
                        <div className="flex gap-1">
                            {AttributeTag(course.attributes)}
                        </div>
                    </div>
                    <b>Description:</b>
                    <span className="mt-1 text-sm">{course.description}</span>
                    {course.prereqs.raw_precoreqs && (<b>Prerequisites:</b>)}
                    <span className="mt-1 text-sm">{course.prereqs.raw_precoreqs}</span>
                    <b>More Info:</b>
                    <Link className="mt-1 text-sm underline" href={quatalog_link}>Quatalog</Link>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default CoursePopup;