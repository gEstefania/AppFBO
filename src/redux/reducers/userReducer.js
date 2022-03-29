import { LOG_IN, LOG_OUT } from "../types/actionTypes"

const defaultState =[]

const UserReducer =(state=defaultState,{type,payload})=>{
    switch (type) {
        case LOG_IN:
            return payload
        case LOG_OUT:
            return defaultState
        default:
            return state
    }
}

export default UserReducer;
