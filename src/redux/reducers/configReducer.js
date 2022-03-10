import { SET_DEVICE_TOKEN } from "../types/actionTypes"

const initialState = {

}

const configReducer=(state=initialState,{type,payload})=>{
    switch(type){
        case SET_DEVICE_TOKEN:
            return {...state,deviceToken:payload}
        default:
            return state
    }
}

export default configReducer