import { SET_SUB_CAT } from "../types/actionTypes"

export const setSubcategory=(payload)=>{
    return{
        type: SET_SUB_CAT,
        payload
    }
}