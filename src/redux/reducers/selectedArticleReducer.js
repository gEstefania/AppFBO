import { SET_CURRENT_ARTICLE } from "../types/actionTypes"

const initialState ={}
const selectedArticleReducer=(state=initialState,{type,payload})=>{
    switch(type){
        case SET_CURRENT_ARTICLE:
            return payload
        default:
            return state
    }
}

export default selectedArticleReducer