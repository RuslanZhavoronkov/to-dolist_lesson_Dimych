import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";
import s from './Todolist.module.css'
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

//Создадим тип объектов массивов task1, task2
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  filter: FilterValuesType
  removeTodolist: (todolistId: string) => void
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
  changeTodolistTitle: (todolistId: string, newTitle: string) => void
};

export function Todolist(props: PropsType) {

  //логическая функции-обработчики нажатия на кнопки "All", "Active", "Completed"
  const onAllClickHandler = () => props.changeFilter("All", props.id);
  const onActiveClickHandler = () => props.changeFilter("Active", props.id);
  const onCompletedAllClickHandler = () => props.changeFilter("Completed", props.id);
  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }

  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }

  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
  }

  return (
    <div>
      <h3><EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist}><Delete /></IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <div>
        {props.tasks.map((t) => {
          //Логическая функция-обработчик события нажатия на "х"(удаления) внутри map
          const onRemoveHandler = () => props.removeTask(t.id, props.id);
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
          }

          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id)
          }

          return (
            <div key={t.id} className={t.isDone ? s.isdone : ''}>
              <Checkbox 
                checked={t.isDone}
                onChange={onChangeStatusHandler} />

              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
              <IconButton onClick={onRemoveHandler}> <Delete /> </IconButton>
            </div>
          );
        })}
      </div>
      <div>
        <Button variant = {props.filter === 'All' ? 'contained' : 'text'} onClick={onAllClickHandler}>All</Button>
        <Button color={"primary"} variant={props.filter === 'Active' ? 'contained' : 'text'} onClick={onActiveClickHandler}>Active</Button>
        <Button color={"secondary"} variant={props.filter === 'Completed' ? 'contained' : 'text'} onClick={onCompletedAllClickHandler}>Completed</Button>
      </div>
    </div>
  );
}

//------------------------------------------------------------------------------------------------------------------


