import { ADD_TASK, COMPLETE_TASK, DELETE_TASK, EDIT_TASK } from "./todoTypes"

export const addTaskToStore = (task) => {
    return {
        type: ADD_TASK,
        payload: task
    }
}

export const editTaskToStore = (taskList) => {
    return {
        type: EDIT_TASK,
        payload: taskList
    }
}

export const deleteTaskToStore = (taskList) => {
    return {
        type: DELETE_TASK,
        payload: taskList
    }
}

export const completeTaskToStore = (taskList) => {
    return {
        type: COMPLETE_TASK,
        payload: taskList
    }
}