import {RequestStatus} from "../../../common/types";
import {Todolist} from "../api/todolistsApi.types";

export type DomainTodolist = Todolist & {
    filter: FilterValuesType
    todolistStatus: RequestStatus
}

export type FilterValuesType = "all" | "active" | "completed"
