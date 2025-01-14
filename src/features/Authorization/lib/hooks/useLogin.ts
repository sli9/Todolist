import { useAppDispatch } from "common/hooks/useAppDispatch"
import { SubmitHandler, useForm } from "react-hook-form"
import { ResultCode } from "common/enums"
import { selectIsLoggedIn, selectThemeMode, setIsLoggedIn } from "../../../../app/appSlice"
import { useAppSelector } from "common/hooks/useAppSelector"
import { getTheme } from "common/theme"
import { LoginArgs } from "features/Authorization/api/authApi.types"
import {useLoginMutation} from "../../api/authApi";

export const useLogin = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const dispatch = useAppDispatch()

    const [login] = useLoginMutation()

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<LoginArgs>({ defaultValues: { email: "", password: "", rememberMe: false } })

    const onSubmit: SubmitHandler<LoginArgs> = (data) => {
        login(data)
            .then((res) => {
                if (res.data?.resultCode === ResultCode.Sucsess) {
                    dispatch(setIsLoggedIn({ isLoggedIn: true }))
                    localStorage.setItem("sn-token", res.data.data.token)
                }
            })
            .finally(() => reset())
    }

    return { isLoggedIn, theme, handleSubmit, onSubmit, control, errors, register }
}
