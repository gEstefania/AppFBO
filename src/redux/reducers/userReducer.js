import { LOG_IN, LOG_OUT, SET_IS_NEW_USER } from "../types/actionTypes"

const defaultState =[]

const UserReducer =(state=defaultState,{type,payload})=>{
    switch (type) {
        case LOG_IN:
            return {...state, ...payload}
        case LOG_OUT:
            return defaultState
        case SET_IS_NEW_USER:
            return {...state, ...payload}
        default:
            return state
    }
}

export default UserReducer;
