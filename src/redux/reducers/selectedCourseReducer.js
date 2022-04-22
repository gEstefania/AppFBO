import { SET_CURRENT_COURSE } from "../types/actionTypes"

const initialState ={}
const selectedCourseReducer=(state=initialState,{type,payload})=>{
    switch(type){
        case SET_CURRENT_COURSE:
            return {...state, ...payload}
        default:
            return state
    }
}

export default selectedCourseReducer