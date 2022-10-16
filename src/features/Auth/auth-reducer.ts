import {authAPI} from '../../api/todolists-api'
import {handleAsyncServerAppError, handleAsyncServerNetworkError,} from '../../utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appActions} from "../CommonActions/App";
import {FieldErrorType, LoginParamsType} from "../../api/types";
import {AxiosError} from "axios";

const {setAppStatus} = appActions

export const login = createAsyncThunk<undefined, LoginParamsType, {
    rejectValue: { errors: string[], fieldsErrors?: Array<FieldErrorType> }
}>('auth/login', async (data, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (err) {
        return handleAsyncServerNetworkError(err as AxiosError, thunkAPI)
    }
})

export const logout = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error as AxiosError, thunkAPI)
    }
})

export const asyncActions = {
    login,
    logout,
}


export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false
        })
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions







