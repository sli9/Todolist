import {appReducer, appSlise} from '../features/Application'
import {authReducer, authSice} from '../features/Auth'
import {configureStore} from "@reduxjs/toolkit";
import {baseApi} from "./baseApi";


export const store = configureStore({
    reducer: {
        [appSlise.name]: appReducer,
        [authSice.name]: authReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});


