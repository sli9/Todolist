import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { ColorModeSwitch } from "../ColorModeSwitcher/ColorModeSwitch"
import AppBar from "@mui/material/AppBar"
import { getTheme } from "common/theme"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { MenuButton } from "common/components"
import { LinearProgress } from "@mui/material"
import {
  changeTheme,
  selectAppStatus,
  selectIsLoggedIn,
  selectThemeMode,
  setIsLoggedIn,
} from "app/appSlice"
import { ResultCode } from "common/enums"
import { baseApi } from "../../../app/baseApi"
import {useLogoutMutation} from "../../../features/Authorization/api/authApi";

export const Header = () => {
  const appStatus = useAppSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  const [logout] = useLogoutMutation()

  const dispatch = useAppDispatch()

  const ChangeThemeModeHandler = () => {
    dispatch(changeTheme({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  const logoutHandler = () => {
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Sucsess) {
          dispatch(setIsLoggedIn({ isLoggedIn: false }))
          localStorage.removeItem("sn-token")
        }
      })
      .then(() => dispatch(baseApi.util.invalidateTags(["Todolist", "Task"])))
  }

  return (
    <AppBar position={"static"} sx={{ mb: "30px", color: "#ffffff" }}>
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          TODO
        </Typography>
        <Box sx={{ ml: "auto" }}>
          {isLoggedIn && <MenuButton onClick={logoutHandler}>logout</MenuButton>}
          <MenuButton>notifications</MenuButton>
          <MenuButton backgroundcolor={theme.palette.primary.dark}>settings</MenuButton>
          <ColorModeSwitch onChange={ChangeThemeModeHandler}/>
        </Box>
      </Toolbar>
      {appStatus === "loading" && <LinearProgress />}
    </AppBar>
  )
}
