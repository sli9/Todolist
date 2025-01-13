import axios from 'axios'
import { LoginParamsType,  TodolistType} from "./types";
import {BaseResponse} from "common/types";
import {TaskType} from "../features/TodolistsList/api/tasksApi.types";


const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'API-KEY': process.env.REACT_APP_API_KEY
    },
})

instance.interceptors.request.use(function (config){
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('sn-token')}`
    return config;
})

// api
export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<BaseResponse<{ item: TodolistType }>>('todo-lists', {title: title});
    },
    deleteTodolist(id: string) {
        return instance.delete<BaseResponse>(`todo-lists/${id}`);
    },
    updateTodolist(id: string, title: string) {
        return instance.put<BaseResponse>(`todo-lists/${id}`, {title: title});
    },
    // getTasks(todolistId: string) {
    //     return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    // },
    // deleteTask(todolistId: string, taskId: string) {
    //     return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    // },
    createTask(todolistId: string, taskTitile: string) {
        return instance.post<BaseResponse<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: taskTitile});
    },
    // updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    //     return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    // }
}


export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<BaseResponse<{ userId?: number, token: string }>>('auth/login', data);
    },
    logout() {
        return instance.delete<BaseResponse<{ userId?: number }>>('auth/login');
    },
    me() {
        return instance.get<BaseResponse<{ id: number; email: string; login: string }>>('auth/me');
    }
}


