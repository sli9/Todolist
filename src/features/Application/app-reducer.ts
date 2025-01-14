import {createSlice, isFulfilled, isRejected} from '@reduxjs/toolkit'
import {appActions} from "../CommonActions/App";
import {todolistsApi} from "../TodolistsList/api/todolistsApi";
import {tasksApi} from "../TodolistsList/api/tasksApi";

export const slice = createSlice({
    name: 'app',
    selectors: {
        selectIsLoggedIn: state => state.isLoggedIn
    },
    initialState: {
        status: 'idle',
        error: null,
        isLoggedIn: false,
    } as InitialStateType,
    reducers: create => ({
        setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }),
    }),
    extraReducers: builder => {
        builder
            .addCase(appActions.setAppStatus, (state, action) => {
                state.status = action.payload.status
            })
            .addCase(appActions.setAppError, (state, action) => {
                state.error = action.payload.error
            })
            .addMatcher(isFulfilled, (state) => {state.status = 'succeeded'})
            .addMatcher(isRejected, (state) => {state.status = 'failed'})
            .addMatcher(isFulfilled, (state, action) => {
            if (todolistsApi.endpoints.getTodolists.matchPending(action) || tasksApi.endpoints.getTasks.matchPending(action)) {return}

                state.status = 'succeeded'
            })
    }
})

export const{setIsLoggedIn} = slice.actions
export const {selectIsLoggedIn} = slice.selectors


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null,
    isLoggedIn: boolean,
}





