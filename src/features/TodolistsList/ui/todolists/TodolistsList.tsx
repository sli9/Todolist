import Paper from "@mui/material/Paper"
import { Todolist } from "./todolist/Todolist"
import Grid from "@mui/material/Grid2"
import { useGetTodolistsQuery } from "../../api/todolistsApi"
import {TodolistSkeleton} from "../skeletons/todolistSceleton/TodolistSkeleton";

export const TodolistsList = () => {
    const { data: todolists, isLoading } = useGetTodolistsQuery(undefined, {
        // pollingInterval: 3000,
        // skipPollingIfUnfocused: true,
    })

    if (isLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "space-between", gap: "64px" }}>
                {Array(3)
                    .fill(null)
                    .map((_, id) => (
                        <TodolistSkeleton key={id} />
                    ))}
            </div>
        )
    }
    return (
        <>
            {todolists?.map((todolist) => {
                return (
                    <Grid key={todolist.id}>
                        <Paper elevation={3} sx={{ p: "10px" }}>
                            <Todolist key={todolist.id} todolist={todolist} />
                        </Paper>
                    </Grid>
                )
            })}
        </>
    )
}
