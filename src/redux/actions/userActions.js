import { LOG_IN, LOG_OUT } from "../types/actionTypes"

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

