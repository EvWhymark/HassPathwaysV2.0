import { IFilterDispatch, IFilterState } from "@/app/model/CourseInterface";

// Actions for Filter Reducer

export const filterAction = {
    ADD: "add",
    REM: "remove",
    RESET: "reset",
    SET: "set",
};

// Default Filter Values

export const filterInitializers = {
    filter: [],
    level: [],
    prefix: [],
    semester: [],
    prereq: [],
    status: [],
};
// Reduces "IFilterState" to a new state based on the action dispatched

export const filterReducer = (state: IFilterState, action: IFilterDispatch) => {
    switch (action.type) {
        case filterAction.ADD:
            return {
                ...state,
                [action.payload.group]: [
                    ...state[action.payload.group],
                    action.payload.value,
                ],
            };
        case filterAction.REM:
            return {
                ...state,
                [action.payload.group]: state[action.payload.group].filter(
                    (e: string) => e !== action.payload.value
                ),
            };
        case filterAction.RESET:
            return {
                filter: [],
                level: [],
                prefix: [],
                semester: [],
                prereq: [],
                status: [],
            };
        case filterAction.SET:
            return {
                ...state,
                [action.payload.group]: action.payload.value,
            };
        default:
            return state;
    }
}
