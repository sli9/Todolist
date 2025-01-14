import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import {todolistsApi} from "../features/TodolistsList/api/todolistsApi";
import {tasksApi} from "../features/TodolistsList/api/tasksApi";

export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export const appSlice = createSlice({
  name: "app",
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectAppStatus: (state) => state.status,
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectAppError: (state) => state.error,
  },
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    isLoggedIn: false,
    error: null as string | null,
  },
  reducers: (create) => ({
    changeTheme: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
  extraReducers: (builder) => {
    builder
        .addMatcher(isFulfilled, (state) => {
          state.status = "succeeded"
        })
        .addMatcher(isRejected, (state) => {
          state.status = "failed"
        })
        .addMatcher(isPending, (state, action) => {
          if (
              // do not show ProgressBar when todolists and tasks is pending, because for them we use skeletons witch rendering when
              // isLoading in useGetQueries is true
              todolistsApi.endpoints.getTodolists.matchPending(action) ||
              tasksApi.endpoints.getTasks.matchPending(action)
          ) {
            return
          }
          state.status = "loading"
        })
  },
})

export const { changeTheme, setAppError, setIsLoggedIn } = appSlice.actions
export const { selectThemeMode, selectAppStatus, selectAppError, selectIsLoggedIn } =
    appSlice.selectors
export const appReducer = appSlice.reducer
