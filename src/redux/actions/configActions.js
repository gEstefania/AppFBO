import {SET_DEVICE_TOKEN} from "../types/actionTypes"
export const setDeviceToken=(payload)=>{
    return{
        type:SET_DEVICE_TOKEN,
        payload
    }
}
