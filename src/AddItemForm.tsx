import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type addItemPropsType = {
    addItem: (title: string)=> void
}

function AddItemForm(props: addItemPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(event.currentTarget.value)
    }
    const onKeyPressAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTask()
        }
    }

    const userMsg = error ? <div style={{color: "red"}}>Title is required!</div> : null

    return <div>
        <input
            className={error ? "error" : ""}
            value={title}
            onChange={changeTitle}
            onKeyPress={onKeyPressAddTask}
        />
        <button onClick={addTask}>+</button>
        {userMsg}
    </div>
}

export default AddItemForm;