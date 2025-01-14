
import { ChangeEvent } from "react"
import { getListItemSx } from "./Task.styles"
import { TaskRequestDataType, TaskType } from "../../../../../api/tasksApi.types"
import { tasksApi, useRemoveTaskMutation, useUpdateTaskMutation } from "../../../../../api/tasksApi"
import {RequestStatus} from "common/types";
import {TaskStatuses} from "common/enums";
import {DomainTodolist} from "../../../../../lib/types";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"
import {EditAbleSpan} from "common/components/EditableSpan/EditableSpan";
import {useAppDispatch} from "common/hooks/useAppDispatch";

type Props = {
    todolist: DomainTodolist
    task: TaskType
}

export const Task = ({ todolist, task }: Props) => {
    const [removeTask] = useRemoveTaskMutation()
    const [updateTask] = useUpdateTaskMutation()

    const dispatch = useAppDispatch()

    const updateTaskStatus = (status: RequestStatus) => {
        dispatch(
            tasksApi.util.updateQueryData(
                "getTasks",
                { todolistId: todolist.id, args: { page: 1 } },
                (state) => {
                    const index = state.tasks.findIndex((tl) => tl.id === task.id)
                    if (index !== -1) state.tasks[index].taskStatus = status
                },
            ),
        )
    }

    const removeTaskHandler = () => {
        updateTaskStatus("loading")
        removeTask({ todolistId: todolist.id, taskId: task.id })
            .unwrap()
            .catch(() => updateTaskStatus("idle"))
    }

    const changeTaskTitleHandler = (newTitle: string) => {
        const requestData: TaskRequestDataType = {
            status: task.status,
            title: newTitle,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }
        updateTask({ todolistId: todolist.id, taskId: task.id, task: requestData })
    }

    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const requestData: TaskRequestDataType = {
            status: event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }
        updateTask({
            task: requestData,
            todolistId: todolist.id,
            taskId: task.id,
        })
    }

    return (
        <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatuses.Completed)}>
            <Checkbox
                disabled={todolist.todolistStatus === "loading" || task.taskStatus === "loading"}
                size={"small"}
                checked={task.status === TaskStatuses.Completed}
                onChange={(event) => changeTaskStatusHandler(event)}
            />
            <EditAbleSpan
                title={task.title}
                changeTitle={changeTaskTitleHandler}
                disable={todolist.todolistStatus === "loading" || task.taskStatus === "loading"}
            />
            <IconButton
                onClick={removeTaskHandler}
                sx={{ ml: "auto" }}
                disabled={todolist.todolistStatus === "loading" || task.taskStatus === "loading"}
            >
                {/*margin-left for align one child to right side*/}
                <DeleteIcon fontSize={"small"} />
            </IconButton>
        </ListItem>
    )
}
