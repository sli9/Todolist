import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import styles from "./TodolistTitle.module.css"
import {
  todolistsApi,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} from "../../../../api/todolistsApi"
import { DomainTodolist } from "../../../../lib/types"
import {RequestStatus} from "common/types";
import {EditAbleSpan} from "common/components/EditableSpan/EditableSpan";
import {useAppDispatch} from "common/hooks/useAppDispatch";

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const [removeTodolist] = useRemoveTodolistMutation()
  const [changeTodolistTitle] = useUpdateTodolistTitleMutation()

  const updateQueryData = (status: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const index = state.findIndex((tl) => tl.id === todolist.id)
        if (index !== -1) {
          state[index].todolistStatus = status
        }
      }),
    )
  }

  const removeTodolistHandler = () => {
    updateQueryData("loading")
    removeTodolist(todolist.id)
      .unwrap()
      .catch(() => {
        updateQueryData("idle")
      })
  }

  const changeTodolistTitleHandler = (newTitle: string) => {
    changeTodolistTitle({ id: todolist.id, title: newTitle })
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditAbleSpan
          title={todolist.title}
          disable={todolist.todolistStatus === "loading"}
          changeTitle={changeTodolistTitleHandler}
        />
      </h3>
      <IconButton onClick={removeTodolistHandler} disabled={todolist.todolistStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
