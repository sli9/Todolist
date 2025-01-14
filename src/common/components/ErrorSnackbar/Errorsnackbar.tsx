import { Alert, Slide, SlideProps, Snackbar } from "@mui/material"
import { SyntheticEvent } from "react"
import { useAppSelector } from "common/hooks/useAppSelector"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { selectAppError, setAppError } from "app/appSlice"

export const Errorsnackbar = () => {
  const appError = useAppSelector(selectAppError)

  const dispatch = useAppDispatch()

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    dispatch(setAppError({ error: null }))
  }
  return (
    <Snackbar
      open={appError !== null}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      transitionDuration={{ enter: 1500 }}
      autoHideDuration={5000}
    >
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
        {appError}
      </Alert>
    </Snackbar>
  )
}

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction={"up"} />
}
