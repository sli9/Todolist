import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { filterButtonsBoxSx } from "./FilterTasksButton.styles"
import { todolistsApi } from "../../../../api/todolistsApi"
import { DomainTodolist, FilterValuesType } from "../../../../lib/types"
import {useAppDispatch} from "../../../../../../utils/redux-utils";

type Props = {
  todolist: DomainTodolist
}

export const FilterTasksButtons = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const index = state.findIndex((tl) => tl.id === todolist.id)
        if (index !== -1) {
          state[index].filter = filter
        }
      }),
    )
  }

  return (
    <Box sx={filterButtonsBoxSx}>
      <Button
        variant={todolist.filter === "all" ? "outlined" : "text"}
        color={"inherit"}
        onClick={() => changeFilterTasksHandler("all")}
      >
        All
      </Button>
      <Button
        variant={todolist.filter === "active" ? "outlined" : "text"}
        color={"warning"}
        onClick={() => changeFilterTasksHandler("active")}
      >
        Active
      </Button>
      <Button
        variant={todolist.filter === "completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilterTasksHandler("completed")}
      >
        Completed
      </Button>
    </Box>
  )
}
