import { SET_SUB_CAT } from "../types/actionTypes"

const initialState ={}
const subcategoryReducer=(state=initialState,{type,payload})=>{
    switch(type){
        case SET_SUB_CAT:
            return payload
        default:
            return state
    }
}

export default subcategoryReducer;