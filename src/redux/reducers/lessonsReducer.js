import {SET_LESSONS } from "../types/actionTypes";

const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LESSONS:
            return action.payload 
        default:
            return state;
    }
}