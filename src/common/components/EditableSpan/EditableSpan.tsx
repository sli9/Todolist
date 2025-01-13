import { ChangeEvent, KeyboardEvent, useState } from "react"
import TextField from "@mui/material/TextField"

type Props = {
    title: string
    className?: string
    disable?: boolean
    changeTitle: (title: string) => void
}

export const EditAbleSpan = ({ className, title, changeTitle, disable }: Props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(title)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const deactivateMode = () => {
        setEditMode(false)
        if (newTitle.trim() !== "") {
            changeTitle(newTitle)
        } else setNewTitle(title)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            deactivateMode()
        }
    }

    return (
        <>
            {editMode && !disable ? (
                <TextField
                    value={newTitle}
                    autoFocus
                    onBlur={deactivateMode}
                    onChange={onChangeHandler}
                    onKeyUp={(event) => onKeyPressHandler(event)}
                    slotProps={{
                        input: {
                            sx: { height: "30px" },
                        },
                    }}
                />
            ) : (
                <span className={className} onDoubleClick={() => setEditMode(true)}>
          {title}
        </span>
            )}
        </>
    )
}
