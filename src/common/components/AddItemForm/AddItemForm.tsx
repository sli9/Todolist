import { ChangeEvent, KeyboardEvent, useState } from "react"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import InputLabel from "@mui/material/InputLabel"
import OutlinedInput from "@mui/material/OutlinedInput"
import IconButton from "@mui/material/IconButton"
import AddBoxIcon from "@mui/icons-material/AddBox"

export type AddItemFormProps = {
    /** Callback can be used to add new entity by "POST" request */
    addItem: (itemTitle: string) => void
    /** Text to be displayed below input */
    helperText?: string
    /** If true, input and button will be disabled */
    disabled?: boolean
}

/** Component to add new item */
export const AddItemForm = ({ addItem, helperText, disabled }: AddItemFormProps) => {
    const [itemTitle, setItemTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }
    const addItemHandler = () => {
        if (itemTitle.trim() === "") {
            setError("Title is required")
        } else {
            addItem(itemTitle.trim())
            setItemTitle("")
        }
    }
    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === "Enter") addItemHandler()
    }

    return (
        <Box>
            <FormControl error={!!error} disabled={disabled} sx={{ "& .Mui-focused": { top: 0 } }}>
                <InputLabel htmlFor={"item-input"} sx={{ top: -12 }}>
                    Enter a title
                </InputLabel>
                <OutlinedInput
                    id={"item-input"}
                    autoComplete={"off"}
                    label={"Enter a title"}
                    area-describedby={"helper-text"}
                    value={itemTitle}
                    onChange={changeItemTitleHandler}
                    onKeyUp={addItemOnKeyUpHandler}
                    sx={{ height: "30px" }}
                />
                <FormHelperText id={"helper-text"}>{error ? error : helperText}</FormHelperText>
            </FormControl>
            <IconButton
                onClick={addItemHandler}
                disabled={disabled}
                color={"primary"}
                sx={{ height: "30px" }}
            >
                <AddBoxIcon />
            </IconButton>
        </Box>
    )
}
