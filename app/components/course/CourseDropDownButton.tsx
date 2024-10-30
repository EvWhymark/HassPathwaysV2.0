import React, { useEffect, useState } from 'react';
import { ICourseSchema } from '@/public/data/dataInterface';
import { useAppContext } from "../../contexts/appContext/AppProvider";
import { clsx } from 'clsx';

const colorMap = {
  "No Selection": "bg-bg-primary text-text-quaternary",
  "In Progress": "bg-bg-warning-secondary text-text-warning",
  "Completed": "bg-bg-success-solid text-text-white",
  "Planned": "bg-bg-tertiary text-text-tertiary",
};

const CourseCardDropDown = ({
  title,
  courseCode,
  status = "No Selection"
}: ICourseSchema) => {
  const [isOpen, setIsOpen] = useState(false);
  const {courses, updateCourseState} = useAppContext();
  //status = courses.find(course => course.name === title)?.status || "No Selection";
  const [dropDownText, setDropDownText] = useState<string>(status);
  const chipStyle = clsx("text-sm font-semibold px-2 py-2.5 border border-utility-gray-200 rounded-lg cursor-pointer text-center", colorMap[dropDownText]);
  useEffect(() => {
    setDropDownText(status);
  }, [status]);

  const handleOption = (newStatus: string) => {
    updateCourseState(title, newStatus);
    setDropDownText(newStatus);
    setIsOpen(false);
  };

  const options  = [
    {label: "Planned", icon: "/assets/svg/plus.svg", style: "bg-bg-primary hover:bg-utility-gray-200"},
    {label: "In Progress", icon: "/assets/svg/plus.svg", style: "bg-bg-warning-primary hover:bg-bg-warning-secondary"},
    {label: "Completed", icon: "/assets/svg/plus.svg", style: "bg-bg-success-primary hover:bg-bg-success-secondary"},
    {label: "Remove", icon: "/assets/svg/x-close.svg", style: " bg-bg-error-primary hover:bg-bg-error-secondary"}
  ];

  const dropdownProcess = () => {
    if(dropDownText==="No Selection"){
      //If no selection get rid of remove as an option
      options.pop();
    }
      return options
          .filter(option => option.label !== dropDownText)
          .map(option => (
              <li key={option.label} className={`py-2 px-4 ${option.style} cursor-pointer flex items-center`}
                  onClick={() => handleOption(option.label)}>
                <img src={option.icon} alt="" className="w-4 h-4"/>
                <div className="flex-1 text-center">{option.label}</div>
              </li>
          ));

  }

  return (
      <div
          className="relative"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
      >
        <div
            id="fixed-size-div"
            className={chipStyle}
        >
          {dropDownText}
        </div>
        {isOpen && (
            <div className="absolute w-48 bg-text-white shadow-lg rounded-lg border border-utility-gray-300 z-10 right-px">
          <ul >
              {dropdownProcess()}

          </ul>
        </div>
      )}
    </div>
  );
};

export default CourseCardDropDown;

