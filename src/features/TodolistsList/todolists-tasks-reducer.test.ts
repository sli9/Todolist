import { TasksStateType} from './tasks-reducer'
import {TodolistType} from "../../api/types";
import {tasksReducer, todolistsActions, todolistsReducer} from "./index";
import {DomainTodolist} from "./lib/types";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<DomainTodolist> = [];

    let todolist: TodolistType = {
        title: 'new todolist',
        id: 'any id',
        addedDate: '',
        order: 0
    }

    const action = todolistsActions.addTodolistTC.fulfilled({todolist}, 'requestId', todolist.title);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});
