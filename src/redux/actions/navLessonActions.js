import { INSIDE_LESSON } from "../types/actionTypes";

export const insideLesson=(payload)=>{
    return{
        type:INSIDE_LESSON,
        payload
    }
}