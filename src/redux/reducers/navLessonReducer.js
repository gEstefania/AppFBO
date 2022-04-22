import { INSIDE_LESSON } from "../types/actionTypes";

const initialState = []

const navLessonReducer = (state = initialState, {type,payload}) => {
    switch (type) {
        case INSIDE_LESSON:
            return payload
        default:
            return state;
    }
}

export default navLessonReducer