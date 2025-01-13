import {TaskPriorities, TaskStatuses} from "common/enums";
import {RequestStatus} from "common/types";

export type GetTasksResponse = {
    items: DomainTask[]
    totalCount: number
    error?: string | null
}
export type DomainTask = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    addedDate: string
}

export type TaskRequestDataType = Omit<DomainTask, "id" | "todoListId" | "order" | "addedDate">

export type TaskType = DomainTask & { taskStatus: RequestStatus }
