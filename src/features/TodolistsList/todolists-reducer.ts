import {todolistsAPI} from '../../api/todolists-api'
import {RequestStatusType} from '../Application/app-reducer'
import {handleAsyncServerAppError, handleAsyncServerNetworkError,} from '../../utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AxiosError} from "axios";
import {appActions} from "../CommonActions/App";
import {ThunkError} from "../../utils/types";
import {TodolistType} from "../../api/types";

const {setAppStatus} = appActions

const fetchTodolistsTC = createAsyncThunk<{
    todolists: TodolistType[]
}, undefined, ThunkError>('todolists/fetchTodolists',
    async (param, thunkAPI
    ) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        try {
            const res = await todolistsAPI.getTodolists()
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {todolists: res.data}
        } catch (error) {
            return handleAsyncServerNetworkError(error as AxiosError, thunkAPI);
        }
    })

const removeTodolistTC = createAsyncThunk<{
    id: string
}, string, ThunkError>('todolists/removeTodolist', async (todolistId, {
    dispatch,
}) => {
    //изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(setAppStatus({status: 'loading'}))
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(changeTodolistEntityStatus({id: todolistId, status: 'loading'}))
    await todolistsAPI.deleteTodolist(todolistId)
    //скажем глобально приложению, что асинхронная операция завершена
    dispatch(setAppStatus({status: 'succeeded'}))
    return {id: todolistId}
})

const addTodolistTC = createAsyncThunk<{
    todolist: TodolistType
}, string, ThunkError>('todolists/addTodolist', async (title: string, {
    dispatch,
    rejectWithValue,
}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return {todolist: res.data.data.item}
        } else {
            return handleAsyncServerAppError(res.data, {dispatch, rejectWithValue}, false)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error as AxiosError, {dispatch, rejectWithValue}, false)
    }
})

const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle', async (param: {
    id: string,
    title: string
}, thunkAPI) => {
    try {
        const res = await todolistsAPI.updateTodolist(param.id, param.title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {id: param.id, title: param.title}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error as AxiosError, thunkAPI, false)
    }

})

export const asyncAcyions = {
    fetchTodolistsTC,
    removeTodolistTC,
    addTodolistTC,
    changeTodolistTitleTC
}


export const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: create => ({
        changeTodolistFilter: create.reducer((state, action: PayloadAction<{
            id: string,
            filter: FilterValuesType
        }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        }),
        changeTodolistEntityStatus: create.reducer((state, action: PayloadAction<{
            id: string,
            status: RequestStatusType
        }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        }),
        clearTodolists: create.reducer(() => {
            return []
        })
    }),
    extraReducers: builder => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                if (index > -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                state[index].title = action.payload.title
            })
    }
})

export const {
    changeTodolistFilter, changeTodolistEntityStatus, clearTodolists
} = slice.actions


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

