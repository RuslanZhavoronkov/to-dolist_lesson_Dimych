import { ChangeEvent, useState } from "react"

type EditableSpanPropsType = {
    title: string
    onChange: (newValue:string) => void
  }
  
  export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {

  let [editMode, setEditMode] = useState<boolean>(false)
  let [title, setTitle] = useState<string>('')
  
const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
}

const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
}

const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
setTitle(e.currentTarget.value)
}


    return (
       editMode ? <input value={title}  onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>:
       <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
  }



 