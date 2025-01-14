import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material"
import {selectThemeMode, setIsLoggedIn, ThemeMode} from "./appSlice"
import { getTheme } from "common/theme/theme"
import { Errorsnackbar, Header } from "common/components"
import { useAppSelector } from "common/hooks/useAppSelector"
import { Routing } from "common/routing"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useEffect, useState } from "react"
import s from "./App.module.css"
import { ResultCode } from "common/enums"
import {useMeQuery} from "../features/Authorization/api/authApi";

export const App = () => {
    const themeMode: ThemeMode = useAppSelector(selectThemeMode)
    const [isInitialized, setIsInitialized] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const { data, isLoading } = useMeQuery()

    useEffect(() => {
        if (!isLoading) {
            setIsInitialized(true)
            if (data?.resultCode === ResultCode.Sucsess) {
                dispatch(setIsLoggedIn({ isLoggedIn: true }))
            }
        }
    }, [isLoading, data])

    if (!isInitialized) {
        return (
            <div className={s.circularProgressContainer}>
                <CircularProgress size={150} thickness={2} />
            </div>
        )
    }

    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline />
            <Header />
            <Routing />
            <Errorsnackbar />
        </ThemeProvider>
    )
}
