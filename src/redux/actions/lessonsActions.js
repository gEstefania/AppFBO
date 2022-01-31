import { axiosApi } from "../../http"
import { GET_DESCRIPTION, GET_LESSONS } from "../types/actionTypes";

export const fetchLessons = () => {
    return async (dispatch) => {
        const {data} = await axiosApi.get('https://jsonplaceholder.typicode.com/todos');
        
        dispatch({
            type: GET_LESSONS,
            payload: {
                lessons: data,
            }
        })

    }
}

export const fetchLessonDescription = () => {

    return async (dispatch) => {

        const {data} = await axiosApi.get('https://jsonplaceholder.typicode.com/todos/1');

        dispatch({
            type: GET_DESCRIPTION,
            payload: data.title
        })

        

    }
    

}