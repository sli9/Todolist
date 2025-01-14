import { Navigate, Outlet } from "react-router"

type Props = {
  isLoggedIn: boolean
}

export const ProtectedRoutes = ({ isLoggedIn }: Props) => {
  return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />
}
