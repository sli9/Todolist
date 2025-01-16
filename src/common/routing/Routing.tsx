import { Route, Routes } from "react-router"
import { Page404 } from "common/components"
import { ProtectedRoutes } from "common/routing/ProtectedRoutes"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectIsLoggedIn } from "../../app/appSlice"
import {Main} from "../../app/Main";
import {Login} from "../../features/Authorization/ui/login/Login";

export const Path = {
  Main: "Todolist",
  Login: "login",
  NotFound: "*",
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
        <Route path={Path.Main} element={<Main />} />
      </Route>
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.NotFound} element={<Page404 />} />
    </Routes>
  )
}
