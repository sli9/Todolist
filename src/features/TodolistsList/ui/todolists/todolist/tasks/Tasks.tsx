import List from "@mui/material/List"
import { Task } from "./task/Task"
import { TaskSkeleton } from "../../../skeletons/taskSkeleton/TaskSkeleton"
import { DomainTodolist } from "../../../../lib/types"
import { TasksPagination } from "../tasksPagination/TasksPagination"
import { useTasks } from "../../../../lib/hooks/useTasks"

type Props = {
    todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
    const { totalCount, isLoading, tasksForTodolist, setPage, page } = useTasks(todolist)

    if (isLoading) {
        return <TaskSkeleton />
    }

    return (
        <>
            {tasksForTodolist?.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <>
                    <List dense>
                        {tasksForTodolist?.map((task) => (
                            <Task key={task.id} todolist={todolist} task={task} />
                        ))}
                    </List>
                    <TasksPagination page={page} setPage={setPage} totalCount={totalCount || 0} />
                </>
            )}
        </>
    )
}
