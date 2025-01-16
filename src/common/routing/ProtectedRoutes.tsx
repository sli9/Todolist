import { Navigate, Outlet } from "react-router"
import {Path} from "common/routing/Routing";

type Props = {
  isLoggedIn: boolean
}

export const ProtectedRoutes = ({ isLoggedIn }: Props) => {
  return isLoggedIn ? <Outlet /> : <Navigate to={`/${Path.Login}`} />
}
