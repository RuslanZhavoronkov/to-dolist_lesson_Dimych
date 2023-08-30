import React, { ChangeEvent, useCallback } from "react"
import { TaskType } from "./Todolist"
import { Checkbox, IconButton } from "@mui/material"
import { EditableSpan } from "./EditableSpan"
import { Delete } from "@mui/icons-material"

export type SuperTaskProps = {
    todolistId: string
    task:TaskType
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void

}



export const SuperTask: React.FC<SuperTaskProps> = React.memo((props) => {
console.log('Super Task')
    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.removeTask, props.task.id, props.todolistId])


    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId);
    }, [props.changeTaskStatus, props.task.id, props.todolistId])


    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    }, [props.changeTaskTitle, props.task.id, props.todolistId])

    return (


        <div className={props.task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={props.task.isDone}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
            <IconButton onClick={onClickHandler}>
                <Delete />
            </IconButton>
        </div>


    )
})
