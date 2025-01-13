import { FilterTasksButtons } from "./filterTasksButton/FilterTasksButtons"
import { TodolistTitle } from "./todolistTitle/TodolistTitle"
import {DomainTodolist} from "../../../lib/types";
import {useAddTaskMutation} from "../../../api/tasksApi";
import {Tasks} from "./tasks/Tasks";
import {AddItemForm} from "common/components/AddItemForm/AddItemForm";

type Props = {
    todolist: DomainTodolist
}

export const Todolist = ({ todolist }: Props) => {
    const [addTask] = useAddTaskMutation()

    const addTaskHandler = (taskTitle: string) => {
        addTask({ todolistId: todolist.id, title: taskTitle })
    }

    return (
        <div>
            <TodolistTitle todolist={todolist} />
            <AddItemForm
                addItem={addTaskHandler}
                helperText={"Add new task"}
                disabled={todolist.todolistStatus === "loading"}
            />
            <Tasks todolist={todolist} />
            <FilterTasksButtons todolist={todolist} />
        </div>
    )
}
