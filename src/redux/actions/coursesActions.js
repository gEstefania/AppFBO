import { SET_COURSES } from "../types/actionTypes"

export const setCourses=(payload)=>{

    return{
        type:SET_COURSES,
        payload
    }
}