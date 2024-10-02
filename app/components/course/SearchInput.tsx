import {SearchInputProps} from "@/app/model/CourseInterface";
import {SearchIcon} from "@/app/components/utils/Icon";

export const SearchInput = ({ searchString, setSearchString }: SearchInputProps) => {
    return (
        <label htmlFor="course-input" className="basis-0 grow">
            <div className="px-3.5 py-2.5 flex items-center gap-2 cursor-text border-gray-300 border border-solid rounded-lg input-wrapper">
                <SearchIcon />
                <input
                    className="outline-none text-gray-500 text-md w-full basis-0 grow "
                    type="text"
                    name="course"
                    id="course-input"
                    value={searchString}
                    placeholder="Search"
                    onChange={(e) => setSearchString(e.target.value)}
                />
            </div>
        </label>
    );
};