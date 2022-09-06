import { ADD_TASK, COMPLETE_TASK, DELETE_TASK, EDIT_TASK } from "./todoTypes";

const initialState = {
    taskList: []
}

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                taskList: [...state.taskList, action.payload]
            }
        case DELETE_TASK:
            return {
                ...state,
                taskList: action.payload
            }
        case COMPLETE_TASK:
            return {
                ...state,
                taskList: action.payload
            }
        case EDIT_TASK:
            return {
                ...state,
                taskList: action.payload
            }
        default: return state
    }
}