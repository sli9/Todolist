import { Skeleton } from "@mui/material"
import Paper from "@mui/material/Paper"
import s from "./TodolistSkeleton.module.css"

export const TodolistSkeleton = () => {
  return (
    <Paper className={s.todolist}>
      <div className={s.todolistTitle}>
        <Skeleton animation={"wave"} width={150} height={50} />
        <Skeleton animation={"wave"} width={20} height={40} />
      </div>

      <div className={s.addItemForm}>
        <Skeleton animation={"wave"} width={230} height={60} />
        <Skeleton animation={"wave"} width={20} height={40} />
      </div>

      <>
        {Array(4)
          .fill(null)
          .map((_, id) => (
            <div key={id} className={s.common}>
              <div className={s.tasks}>
                <Skeleton animation={"wave"} width={20} height={40} />
                <Skeleton animation={"wave"} width={150} height={40} />
              </div>
              <Skeleton animation={"wave"} width={20} height={40} />
            </div>
          ))}
      </>

      <div className={s.common}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <Skeleton animation={"wave"} key={id} width={80} height={60} />
          ))}
      </div>
    </Paper>
  )
}
