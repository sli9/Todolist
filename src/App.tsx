import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed"
type TodolistType = {
    todolistId: string
    title: string
    filter: FilterValuesType
}
type StateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolist, setTodolist] = useState<Array<TodolistType>>([
        {todolistId: todolistId_1, title: 'What to learn', filter: 'all'},
        {todolistId: todolistId_2, title: 'What to buy', filter: 'all'},
    ])

    //BLL:
    const [tasks, setTasks] = useState<StateType>({
        [todolistId_1]:
            [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "React", isDone: false},
            ],
        [todolistId_2]:
            [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "React", isDone: false},
            ]
    })

    const removeTask = (taskID: string, todolistId: string) => { //2
        tasks[todolistId] = tasks[todolistId].filter(t => t.id !== taskID)
        setTasks({...tasks}) // new array for render
    }
    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {
            id: v1(),
            // title: title,
            title,
            isDone: false
        }
        tasks[todolistId] = [newTask, ...tasks[todolistId]]
        setTasks({...tasks})
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todolistId: string) => {
        tasks[todolistId] = tasks[todolistId].map(t => t.id === taskID ? {...t, isDone} : t)
        setTasks({...tasks})
    }
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolist(todolist.map(tl => tl.todolistId === todolistId ? {...tl, filter: filter} : tl))
    }
    const removeTodolist = (todolistId: string) => {
        setTodolist(todolist.filter(tl=>tl.todolistId!==todolistId))
        delete tasks[todolistId]

    }
    const addTodolist = (title: string) => {
      const newTodolist: TodolistType = {
          todolistId: v1(), title: title, filter: "all"
      }
        setTodolist([newTodolist, ...todolist])
        setTasks({...tasks, [newTodolist.todolistId]: []})
    }


    // GUI (CRUD):
    return (
        <div className="App">
            <div><h5>Add Todolist</h5>
            <AddItemForm addItem={addTodolist}/></div>
            {todolist.map((tl) => {

                let tasksForTodoList = tasks[tl.todolistId]
                if (tl.filter === "active") {
                    tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                }
                if (tl.filter === "completed") {
                    tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                }
                return (
                    <TodoList
                        key={tl.todolistId}
                        id={tl.todolistId}
                        filter={tl.filter}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        addTask={addTask}
                        removeTodolist={removeTodolist}
                    />
                )
            })}

        </div>
    );
}

export default App;
