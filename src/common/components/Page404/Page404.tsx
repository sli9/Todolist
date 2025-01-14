import s from "./Page404.module.css"
import Button from "@mui/material/Button"
import { Link } from "react-router"
import Box from "@mui/material/Box"

export const Page404 = () => {
  return (
    <Box textAlign={"center"} justifyContent={"center"}>
      <h1 className={s.title}>404</h1>
      <h2 className={s.subTitle}>page not found</h2>
      <Button variant={"contained"} component={Link} to="/">
        Back to todolists
      </Button>
    </Box>
  )
}
