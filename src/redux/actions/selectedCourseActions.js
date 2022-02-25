import { SET_CURRENT_COURSE } from "../types/actionTypes"

export const setCurrentCourse=(payload)=>{
    return{
        type:SET_CURRENT_COURSE,
        payload
    }
}