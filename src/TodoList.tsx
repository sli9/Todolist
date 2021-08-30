import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeCallback: (taskID: string, newTitle: string, todolistId: string)=> void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function TodoList(props: TodoListPropsType) {

    const setAllFilterValue = () => props.changeFilter("all", props.id)
    const setActiveFilterValue = () => props.changeFilter("active", props.id)
    const setCompletedFilterValue = () => props.changeFilter("completed", props.id)

    const allBtnClass = props.filter === "all" ? "active-filter" : ""
    const activeBtnClass = props.filter === "active" ? "active-filter" : ""
    const completedBtnClass = props.filter === "completed" ? "active-filter" : ""

    const removeTodolistHandler = () => props.removeTodolist(props.id)
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }

    // JSX
    return (
        <div>
            <h3><EditableSpan title={props.title} changeCallback={changeTodolistTitle}/>
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map((t) => {
                    const removeTask = () => props.removeTask(t.id, props.id)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    const changeCallback= (newTitle: string)=>
                        props.changeCallback(t.id, newTitle, props.id)
                    return (
                        <li key={t.id}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={changeTaskStatus}
                            />
                            <EditableSpan title={t.title} changeCallback={changeCallback}/>
                            <button onClick={removeTask}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button
                    className={allBtnClass}
                    onClick={setAllFilterValue}
                >All
                </button>
                <button
                    className={activeBtnClass}
                    onClick={setActiveFilterValue}
                >Active
                </button>
                <button
                    className={completedBtnClass}
                    onClick={setCompletedFilterValue}
                >Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;