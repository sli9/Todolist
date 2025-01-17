import { ChangeEvent, KeyboardEvent, useState } from "react"
import TextField from "@mui/material/TextField"

export type EditableSpanProps = {
    /** Current title */
    title: string
    /** Class name for span styles */
    className?: string
    /** If true, edit mode will be disabled */
    disable?: boolean
    /** Callback to change title and send new title on server */
    changeTitle: (title: string) => void
}

/** Component to edit span on double click */
export const EditAbleSpan = ({ className, title, changeTitle, disable }: EditableSpanProps) => {
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
                //data-testid for storybook
                <span data-testid={"double-click-span"} className={className} onDoubleClick={() => setEditMode(true)}>
          {title}
        </span>
            )}
        </>
    )
}
