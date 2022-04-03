import { LOG_IN, LOG_OUT, SET_IS_NEW_USER } from "../types/actionTypes"

export const login=(payload)=>{ 
    return{
        type:LOG_IN,
        payload
    }
}
export const logout=()=>{
    return {
        type:LOG_OUT,
        payload:{}
    }
}

export const IsNewUser=(payload)=>{
    return {
        type: SET_IS_NEW_USER,
        payload
    }
}
