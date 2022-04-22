import {SET_DEVICE_TOKEN, SHOW_SIGNUP_SCREEN} from "../types/actionTypes"
export const setDeviceToken=(payload)=>{
    return{
        type:SET_DEVICE_TOKEN,
        payload
    }
}

export const showSignUpScreen=(payload)=>{
    return{
        type:SHOW_SIGNUP_SCREEN,
        payload
    }
}