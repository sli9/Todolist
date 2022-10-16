import {slice as tasksSlice, asyncActions as tasksAsyncActions} from "./tasks-reducer";
import {slice as todolistsSlice, asyncAcyions as todolistsAsyncActions} from './todolists-reducer'
import { TodolistsList } from "./TodolistsList";

const todolistsActions = {
    ...todolistsAsyncActions,
    ...todolistsSlice.actions
}
const tasksActions = {
    ...tasksAsyncActions,
    ...tasksSlice.actions
}


const tasksReducer = tasksSlice.reducer
const todolistsReducer = todolistsSlice.reducer

export {
    tasksReducer,
    tasksActions,
    todolistsReducer,
    todolistsActions,
    TodolistsList,
}