import { SET_CAT } from "../types/actionTypes"

export const setCategory=(payload)=>{
    return{
        type: SET_CAT,
        payload
    }
}