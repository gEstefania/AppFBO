import { SET_CURRENT_ARTICLE } from "../types/actionTypes"

export const setCurrentArticle=(payload)=>{
    return{
        type: SET_CURRENT_ARTICLE,
        payload
    }
}