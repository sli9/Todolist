import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { Navigate } from "react-router"
import { useLogin } from "../../lib/hooks/useLogin"
import { LoginFormLabel } from "./loginFormLabel/LoginFormLabel"
import { LoginForm } from "./loginForm/LoginForm"
import Grid from "@mui/material/Grid2"
import {Path} from "common/routing";

export const Login = () => {
    const { isLoggedIn } = useLogin()

    if (isLoggedIn) {
        return <Navigate to={`/${Path.Main}`} />
    }

    return (
        <Grid container justifyContent={"center"}>
            <Grid justifyContent={"center"}>
                <FormControl>
                    <FormLabel>
                        <LoginFormLabel />
                    </FormLabel>
                    <LoginForm />
                </FormControl>
            </Grid>
        </Grid>
    )
}
