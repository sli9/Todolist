import Grid from "@mui/material/Grid2"
import Container from "@mui/material/Container"
import {useAddTodolistMutation} from "../features/TodolistsList/api/todolistsApi";
import {AddItemForm} from "common/components/AddItemForm/AddItemForm";
import {TodolistsList} from "../features/TodolistsList/ui/todolists/TodolistsList";

export const Main = () => {
    const [addTodolist] = useAddTodolistMutation()

    const addTodolistHandler = (title: string) => {
        addTodolist(title)
    }

    return (
        <Container maxWidth={"lg"} fixed>
            <AddItemForm addItem={addTodolistHandler} helperText={"Add new todolist"} />
            <Grid container spacing={8} sx={{ mt: "20px", justifyContent: "center" }}>
                <TodolistsList />
            </Grid>
        </Container>
    )
}
