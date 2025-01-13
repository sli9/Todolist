import {todolistsAPI} from '../../api/todolists-api'
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {AppRootStateType, ThunkError} from "../../utils/types";
import {appActions} from "../CommonActions/App";
import {asyncAcyions as asyncTodolistsActions} from "./todolists-reducer";
import {TaskType} from "./api/tasksApi.types";
import {TaskPriorities, TaskStatuses} from "common/enums";

const initialState: TasksStateType = {}

// export const fetchTasks = createAsyncThunk<{ tasks: TaskType[], todolistId: string }, string, ThunkError>('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
//     thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
//     try {
//         const res = await todolistsAPI.getTasks(todolistId)
//         const tasks = res.data.items
//         thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
//         return {tasks: tasks, todolistId: todolistId}
//     } catch (err) {
//         return handleAsyncServerNetworkError(err as AxiosError, thunkAPI)
//     }
// })
//
// export const removeTask = createAsyncThunk<{ taskId: string, todolistId: string }, { taskId: string, todolistId: string }, ThunkError>('tasks/removeTask',
//     async (param) => {
//         await todolistsAPI.deleteTask(param.todolistId, param.taskId)
//         return {taskId: param.taskId, todolistId: param.todolistId}
//     })

export const addTask = createAsyncThunk<TaskType, { title: string, todolistId: string }, ThunkError>('tasks/addTask',
    async (param, thunkAPI) => {
        thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))

        try {
            const res = await todolistsAPI.createTask(param.todolistId, param.title)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
                return res.data.data.item
            }

            return handleAsyncServerAppError(res.data, thunkAPI, false);
        } catch (error) {
            return handleAsyncServerNetworkError(error as AxiosError, thunkAPI, false)
        }
    })

// export const updateTask = createAsyncThunk('tasks/updateTask', async (param: {
//     taskId: string,
//     model: UpdateDomainTaskModelType,
//     todolistId: string
// }, {dispatch, getState, rejectWithValue}) => {
//
//     const state = getState() as AppRootStateType
//     const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
//     if (!task) {
//         //throw new Error("task not found in the state");
//         return rejectWithValue('task not found in the state')
//     }

//     const apiModel: UpdateTaskModelType = {
//         deadline: task.deadline,
//         description: task.description,
//         priority: task.priority,
//         startDate: task.startDate,
//         title: task.title,
//         status: task.status,
//         ...param.model
//     }
//
//
//     try {
//         const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
//         if (res.data.resultCode === 0) {
//             return param
//         } else {
//             handleAsyncServerAppError(res.data, {dispatch, rejectWithValue});
//         }
//     } catch (error) {
//         handleAsyncServerNetworkError(error as AxiosError, {dispatch, rejectWithValue});
//     }
//
// })

export const asyncActions = {
    addTask,
}


export const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: create => ({
        clearTasks: create.reducer(() => {return {}})
    }),
    extraReducers: (builder) => {
        builder.addCase(asyncTodolistsActions.addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        })
            .addCase(asyncTodolistsActions.removeTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(asyncTodolistsActions.fetchTodolistsTC.fulfilled, (state, action) => {
                action.payload.todolists.forEach((tl: any) => {
                    state[tl.id] = []
                })
            })
            // .addCase(fetchTasks.fulfilled, (state, action) => {
            //     state[action.payload.todolistId] = action.payload.tasks
            // })
            // .addCase(removeTask.fulfilled, (state, action) => {
            //     const tasks = state[action.payload.todolistId]
            //     const index = tasks.findIndex(t => t.id === action.payload.taskId)
            //     if (index > -1) {
            //         tasks.splice(index, 1)
            //     }
            // })
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.todoListId].unshift(action.payload)
            })
            // .addCase(updateTask.fulfilled, (state, action) => {
            //     if (action.payload) {
            //         const tasks = state[action.payload.todolistId]
            //         const index = tasks.findIndex(t => t.id === action.payload?.taskId)
            //         if (index > -1) {
            //             tasks[index] = {...tasks[index], ...action.payload.model}
            //         }
            //     }
            // })
    }
})

export const {clearTasks} = slice.actions


// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


