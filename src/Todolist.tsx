import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";
import s from './Todolist.module.css'

//Создадим тип объектов массивов task1, task2
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeTaskStatus:(taskId:string, isDone:boolean) => void
  filter: FilterValuesType
};

export function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  //логическая функция-обработчик введенного текста в Input
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  //логическая функция обработчик нажатия Enter+Сtrl в Input
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.ctrlKey && e.key === "Enter") {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  //логическая функция-обработчик добавления новой таски в массив
  const addTask = () => {
    if (newTaskTitle.trim() !== '') {// если введеная строка пустая выйти из функции
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    } else {
      setError('Title is requaired');
    }
    
  };

  //логическая функции-обработчики нажатия на кнопки "All", "Active", "Completed"
  const onAllClickHandler = () => props.changeFilter("All");
  const onActiveClickHandler = () => props.changeFilter("Active");
  const onCompletedAllClickHandler = () => props.changeFilter("Completed");

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyPressHandler}
          className={error ? s.error : ''}
        />{" "}
        {/*начальное значение поле ввода input*/}
        <button onClick={addTask}>+</button>
        {error && <div className={s.errormessage}>{error}</div>}
      </div>
      <ul>
        {props.tasks.map((t) => {
          //Логическая функция-обработчик события нажатия на "х"(удаления) внутри map
          const onRemoveHandler = () => props.removeTask(t.id);
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
props.changeTaskStatus(t.id ,e.currentTarget.checked)
          }

          return (
            <li key={t.id} className={t.isDone ? s.isdone : ''}>
              <input type="checkbox" 
              checked={t.isDone} 
              onChange = {onChangeHandler}/>
              <span>{t.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button className={props.filter === 'All' ? s.activefilter : ''} onClick={onAllClickHandler}>All</button>
        <button className={props.filter === 'Active' ? s.activefilter: ''} onClick={onActiveClickHandler}>Active</button>
        <button className={props.filter === 'Completed' ? s.activefilter: ''} onClick={onCompletedAllClickHandler}>Completed</button>
      </div>
    </div>
  );
}

