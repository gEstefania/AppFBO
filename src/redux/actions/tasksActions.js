import { SET_TASKS, TOGGLE_TASKS } from "../types/actionTypes"

export const setTasks=(payload)=>{
    return{
        type:SET_TASKS,
        payload
    }
}

export const toggleTasks=(payload)=>{
    return{
        type:"TOGGLE_TASK",
        payload
    }
}