import React, {useCallback, useEffect} from 'react'
import './App.css'
import {useSelector} from 'react-redux'
import {Navigate, Route, Routes} from 'react-router-dom'
import {selectIsInitialaized, selectStatus} from "../features/Application/selectors";
import {authActions, authSelectors, Login} from "../features/Auth";
import {useActions} from "../utils/redux-utils";
import {appActions} from "../features/Application";
import {TodolistsList} from "../features/TodolistsList";
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
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector(selectStatus)
    const isInitialized = useSelector(selectIsInitialaized)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)

    const {logout} = useActions(authActions)
    const {initializeApp} = useActions(appActions)

    useEffect(() => {
        if (!demo) {
            initializeApp()
        }
    }, [])

    const logoutHandler = useCallback(() => {
        logout()
        return <Navigate to={"/Todolist"}/>
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
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
                <Routes>
                    <Route path={'/Todolist'} element={<TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
