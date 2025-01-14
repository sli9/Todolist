import React, {useCallback, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {Route, Routes, useNavigate} from 'react-router-dom'
import {selectStatus} from "../features/Application/selectors";
import {useAppDispatch} from "../utils/redux-utils";
import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import s from './App.module.css'
import {Main} from "./Main";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Auth/ui/login/Login";
import {useLogoutMutation, useMeQuery} from "../features/Auth/api/AuthApi";
import {ResultCode} from "common/enums";
import {selectIsLoggedIn, setIsLoggedIn} from "../features/Application/app-reducer";
import {baseApi} from "./baseApi";
import {useAppSelector} from "common/hooks/useAppSelector";
import {Navigate} from "react-router";


function App() {
    const status = useSelector(selectStatus)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const [isInitialized, setIsInitialized] = useState<boolean>(false)

    const [logout] = useLogoutMutation()
    const {data, isLoading} = useMeQuery()

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoading) {
            setIsInitialized(true)
            if (data?.resultCode === ResultCode.Sucsess) {
                dispatch(setIsLoggedIn({isLoggedIn: true}))
            }
        }
    }, [isLoading, data])

    const logoutHandler = useCallback(() => {
        logout()
            .then(res => {
                if (res.data?.resultCode === ResultCode.Sucsess) {
                    dispatch(setIsLoggedIn({isLoggedIn: false}))
                    localStorage.removeItem('sn-token')
                }
            })
            .then(() => {
                dispatch((baseApi.util.invalidateTags(['Task', 'Todolist'])))
            })
        navigate('/login')
    }, [])

    if (!isInitialized) {
        return <div className={s.circularProgressContainer}>
            <CircularProgress size={150} thickness={2}/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                {!isLoggedIn && <Login/>}
                <Routes>
                    <Route path={'/'} element={<Main/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
