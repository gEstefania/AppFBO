import { SET_COURSES } from "../types/actionTypes"

const initialState=[]

const courseReducer= (state=initialState,{type,payload}) =>{
        switch(type){
        case SET_COURSES:
            return payload
        default:
            return state
    }
}
export default courseReducer