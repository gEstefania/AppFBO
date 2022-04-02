import { SET_CAT } from "../types/actionTypes"

const initialState ={}
const categoryReducer=(state=initialState,{type,payload})=>{
    switch(type){
        case SET_SUB_CAT:
            return payload
        default:
            return state
    }
}

export default categoryReducer;