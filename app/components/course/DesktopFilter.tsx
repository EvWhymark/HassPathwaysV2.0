import {FilterProps, FilterSectionProps} from "@/app/model/CourseInterface";
import {CourseList} from "@/app/components/course/CourseList";
import {courseFilters} from "@/public/data/staticData";
import {filterAction} from "@/app/components/course/FilterReducer";
import {CheckBoxChecked, CheckBoxUnChecked} from "@/app/components/utils/Icon";
import {SearchInput} from "@/app/components/course/SearchInput";

//The desktop version filter section. TODO: Fix the names
export const DesktopFilterSection = ({
                                         filterState,
                                         filterDispatch,
                                         searchString,
                                         setSearchString,
                                     }: FilterSectionProps) => {
    return (
        <>
            <div className="filters flex justify-start items-start gap-8 mb-4 md:mb-8">
                <DesktopFilter
                    filterState={filterState}
                    filterDispatch={filterDispatch}
                />
                <div className="grow flex flex-col gap-4">
                    <SearchInput
                        setSearchString={setSearchString}
                        searchString={searchString}
                    />
                    <div className="max-h-[100vh] overflow-y-scroll">
                        <CourseList searchString={searchString} filterState={filterState} />
                    </div>
                </div>
            </div>
        </>
    );
};


const DesktopFilter = ({ filterState, filterDispatch }: FilterProps) => {
    return (
        <div className="rounded-lg shadow-lg p-6 min-w-[290px] max-w-xs grid grid-flow-row gap-2 border border-solid border-gray-100">
            {courseFilters.map((section) => (
                <section key={section.apiName}>
                    <header className="text-md font-medium text-gray-900">
                        {section.displayName}
                    </header>
                    <div className="flex flex-wrap">
                        {section.options.map((choice) => {
                            const selected = filterState[section.apiName].includes(choice.value);
                            const actionType = selected ? filterAction.REM : filterAction.ADD;
                            return (
                                <div className="px-3 py-2 basis-auto shrink-0" key={choice.value}>
                                    <div
                                        className="cursor-pointer flex gap-2 items-center"
                                        onClick={() => {
                                            filterDispatch({
                                                type: actionType,
                                                payload: {
                                                    group: section.apiName,
                                                    value: choice.value,
                                                },
                                            });
                                        }}
                                    >
                                        {selected ? <CheckBoxChecked /> : <CheckBoxUnChecked />}
                                        <label className={`text-sm shrink-0 cursor-pointer ${selected && "font-medium"}`}>
                                            {choice.displayName}
                                        </label>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            ))}
        </div>
    );
};