import { DomainTask, GetTasksResponse, TaskRequestDataType, TaskType } from "./tasksApi.types"
import { baseApi } from "../../../app/baseApi"
import {TaskPageSize} from "common/enums";
import {BaseResponse} from "common/types";

export const tasksApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<
            { tasks: TaskType[]; totalCount: number },
            { todolistId: string; args: { page: number } }
        >({
            query: ({ todolistId, args }) => ({
                url: `todo-lists/${todolistId}/tasks`,
                params: { ...args, count: TaskPageSize.default },
            }),
            keepUnusedDataFor: 5 * 60,
            transformResponse(tasksResponse: GetTasksResponse): {
                tasks: TaskType[]
                totalCount: number
            } {
                return {
                    tasks: tasksResponse.items.map((t) => ({ ...t, taskStatus: "idle" })),
                    totalCount: tasksResponse.totalCount,
                }
            },
            providesTags: (result, error, arg) =>
                result
                    ? [
                        ...result.tasks.map((t) => ({ type: "Task" as const, id: t.todoListId })),
                        { type: "Task", id: arg.todolistId },
                    ]
                    : ["Task"],
        }),
        addTask: build.mutation<
            BaseResponse<{ item: DomainTask }>,
            { title: string; todolistId: string }
        >({
            query: ({ title, todolistId }) => ({
                url: `todo-lists/${todolistId}/tasks`,
                method: "POST",
                body: { title },
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg.todolistId }],
        }),
        removeTask: build.mutation<BaseResponse, { taskId: string; todolistId: string }>({
            query: ({ taskId, todolistId }) => ({
                url: `todo-lists/${todolistId}/tasks/${taskId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg.todolistId }],
        }),
        updateTask: build.mutation<
            BaseResponse<{ item: DomainTask }>,
            { taskId: string; todolistId: string; task: TaskRequestDataType }
        >({
            query: ({ taskId, todolistId, task }) => {
                return {
                    url: `todo-lists/${todolistId}/tasks/${taskId}`,
                    method: "PUT",
                    body: task,
                }
            },
            invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg.todolistId }],
        }),
    }),
})

export const {
    useGetTasksQuery,
    useAddTaskMutation,
    useRemoveTaskMutation,
    useUpdateTaskMutation,
} = tasksApi
