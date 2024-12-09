import { IOfferedSchema } from "@/public/data/dataInterface";

const offeredSemestersChecker = ( term: IOfferedSchema | undefined) => {
    if (!term) return [];
    const offeredSemesters = [];
    if (term.years[term.years.length - 1].fall) offeredSemesters.push("Fall");
    if (term.years[term.years.length - 1].spring) offeredSemesters.push("Spring");
    if (term.years[term.years.length - 1].summer) offeredSemesters.push("Summer");
    if (term.uia) offeredSemesters.push("Upon Instructor Availability");
    return offeredSemesters;
  };

const offeredSemestersTag = (term: IOfferedSchema | undefined) => {
    const offeredSemesters = offeredSemestersChecker(term);
    return (
      <div className="flex">
        <div className="badge-group text-xs">
        {offeredSemesters.includes("Fall") ? 
          <p className="badge badge-primary">
            Fall
          </p> : 
          <p className="badge badge-disabled">
            Fall
          </p>
        }
        {offeredSemesters.includes("Spring") ?
          <p className="badge badge-primary">
            Spring
          </p> :
          <p className="badge badge-disabled">
            Spring
          </p>
        }
        {
          offeredSemesters.includes("Summer") ?
            <p className="badge badge-primary">
              Summer
            </p> :
            <p className="badge badge-disabled">
              Summer
            </p>
        }
        </div>
      </div>
    );
    
  }

export default offeredSemestersTag;