import { GET_DESCRIPTION, GET_LESSONS } from "../types/actionTypes";

const initialState = {
    isLoading: false,
    lessonDescription: '',
    lessons: []
};

// dispatch({
//     type: '',
//     payload: {}
// })

export default (state = initialState, action) => {
    switch (action.type) {

        case GET_LESSONS:
            return {
                ...state,
                lessons: action.payload.lessons,
            }

        case GET_DESCRIPTION:
            
            return {
                ...state,
                description: action.payload,
            };
    
        default:
            return state;
    }
}