
export type FieldErrorType = { field: string, error: string };

export type BaseResponse<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors?: Array<FieldErrorType>
    data: D
}

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"