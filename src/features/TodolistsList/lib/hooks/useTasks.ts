import { useState } from "react"
import { useGetTasksQuery } from "../../api/tasksApi"
import { DomainTodolist } from "../types"
import {TaskStatuses} from "common/enums";

export const useTasks = (todolist: DomainTodolist) => {
    const [page, setPage] = useState<number>(1)

    const { data, isLoading } = useGetTasksQuery({
        todolistId: todolist.id,
        args: { page },
    })

    let tasksForTodolist = data?.tasks
    if (todolist.filter === "active") {
        tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatuses.New)
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatuses.Completed)
    }
    return { tasksForTodolist, isLoading, page, setPage, totalCount: data?.totalCount }
}
