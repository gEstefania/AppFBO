import { SET_DEVICE_TOKEN,  SHOW_SIGNUP_SCREEN} from "../types/actionTypes"

const initialState = {

}

const configReducer=(state=initialState,{type,payload})=>{
    switch(type){
        case SET_DEVICE_TOKEN:
            return {...state,deviceToken:payload}
        case SHOW_SIGNUP_SCREEN:
            return payload
        default:
            return state
    }
}

export default configReducer