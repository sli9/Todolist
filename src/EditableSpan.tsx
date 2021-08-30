import React, {ChangeEvent, useState} from "react";

type spanPropsType = {
    title: string
    changeCallback: (newTitle: string)=> void
}

function EditableSpan(props: spanPropsType) {
   let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')
    const showInput = () => {
       setEditMode(true)
        setTitle(props.title)
    }
    const showSpan = () => {
      setEditMode(false)
        props.changeCallback(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode ?
    <input value={title} autoFocus onBlur={showSpan} onChange={changeTitle}/> :
    <span onDoubleClick={showInput}>{props.title}</span>
}

export default EditableSpan;