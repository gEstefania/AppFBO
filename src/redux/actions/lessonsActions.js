import { SET_LESSONS } from "../types/actionTypes";

export const setLeassons=(payload)=>{
    return{
        type:SET_LESSONS,
        payload
    }
}