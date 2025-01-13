import {appReducer, appSlise} from '../features/Application'
import {authReducer, authSice} from '../features/Auth'
import {configureStore} from "@reduxjs/toolkit";
import {tasksReducer, tasksSliceForStore, todolistsReducer, todolistsSliceForStore} from "../features/TodolistsList";
import {baseApi} from "./baseApi";


export const store = configureStore({
    reducer: {
        [appSlise.name]: appReducer,
        [authSice.name]: authReducer,
        [todolistsSliceForStore.name]: todolistsReducer,
        [tasksSliceForStore.name]: tasksReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});


