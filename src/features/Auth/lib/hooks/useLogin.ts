import { useLoginMutation } from "../../api/AuthApi"
import { SubmitHandler, useForm } from "react-hook-form"
import { LoginArgs } from "../../api/AuthApi.types"
import { ResultCode } from "common/enums"
import {useAppDispatch} from "../../../../utils/redux-utils";
import {selectIsLoggedIn, setIsLoggedIn} from "../../../Application/app-reducer";
import {useAppSelector} from "common/hooks/useAppSelector";
import {useNavigate} from "react-router-dom";

export const useLogin = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const dispatch = useAppDispatch()
  const navigate = useNavigate();

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
          navigate('/')
        }
      })
      .finally(() => reset())

  }

  return { isLoggedIn, handleSubmit, onSubmit, control, errors, register }
}
