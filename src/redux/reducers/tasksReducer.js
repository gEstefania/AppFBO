import { SET_TASKS, TOGGLE_TASK } from "../types/actionTypes"

/**
 [
    {
        lessonId:Reference,
        taskId:Reference,
        complete:Boolean,
        task:String
    }
 ]
   

*/
const initialState = []

const taskReducer=(state=initialState,{type,payload}) =>{
    switch(type){
        case SET_TASKS:
            if(state.filter(task=>task.lessonId === payload.lessonId && task.taskId === payload.taskId).length>0){
                return state
            }
            return [
                ...state,
                {
                    lessonId:payload.lessonId,
                    taskId:payload.taskId,
                    complete:false,
                    task:payload.task
                }
            ]
            
            
        case TOGGLE_TASK:
            let task= state.filter(task=>task.lessonId === payload.lessonId && task.taskId === payload.taskId )[0]
            const taskFiltered = task
            if(!task){
                return state
            }
            if(task.complete){
                task.complete=false
            }else{
                task.complete=true
            }
            return [
                task,
                ...state.filter(mtask=>mtask!==taskFiltered),
                

            ]
        
        default:
            return state
    }
}

export default taskReducer