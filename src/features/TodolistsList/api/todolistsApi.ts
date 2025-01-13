import { Todolist } from "./todolistsApi.types"
import { BaseResponse } from "common/types"
import { baseApi } from "../../../app/baseApi"
import { DomainTodolist } from "../lib/types"

export const todolistsApi = baseApi.injectEndpoints({
    endpoints: (build) => {
        return {
            getTodolists: build.query<DomainTodolist[], void>({
                query: () => "todo-lists",
                transformResponse(todolists: Todolist[]): DomainTodolist[] {
                    return todolists.map((tl) => ({ ...tl, todolistStatus: "idle", filter: "all" }))
                },
                providesTags: ["Todolist"],
            }),
            addTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
                query: (title) => {
                    return {
                        url: "todo-lists",
                        method: "POST",
                        body: { title },
                    }
                },
                invalidatesTags: ["Todolist", "Task"],
            }),
            removeTodolist: build.mutation<BaseResponse, string>({
                query: (id) => {
                    return {
                        url: `todo-lists/${id}`,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["Todolist"],
            }),
            updateTodolistTitle: build.mutation<BaseResponse, { id: string; title: string }>({
                query: ({ id, title }) => {
                    return {
                        url: `todo-lists/${id}`,
                        method: "PUT",
                        body: { title },
                    }
                },
                invalidatesTags: ["Todolist"],
            }),
        }
    },
})

export const {
    useGetTodolistsQuery,
    useAddTodolistMutation,
    useRemoveTodolistMutation,
    useUpdateTodolistTitleMutation,
} = todolistsApi
