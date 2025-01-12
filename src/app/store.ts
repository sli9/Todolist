import {appReducer, appSlise} from '../features/Application'
import {authReducer, authSice} from '../features/Auth'
import {configureStore} from "@reduxjs/toolkit";
import {tasksReducer, tasksSliceForStore, todolistsReducer, todolistsSliceForStore} from "../features/TodolistsList";


// непосредственно создаём store
export const store = configureStore({
    reducer: {
        [appSlise.name]: appReducer,
        [authSice.name]: authReducer,
        [todolistsSliceForStore.name]: todolistsReducer,
        [tasksSliceForStore.name]: tasksReducer,
    },
});


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
