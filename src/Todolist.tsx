import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

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
};

export function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  //логическая функция-обработчик введенного текста в Input
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  //логическая функция обработчик нажатия Enter+Сtrl в Input
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.key === "Enter") {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  //логическая функция-обработчик добавления новой таски в массив
  const addTask = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle("");
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
        />{" "}
        {/*начальное значение поле ввода input*/}
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {props.tasks.map((t) => {
          //Логическая функция-обработчик события нажатия на "х"(удаления) внутри map
          const onRemoveHandler = () => props.removeTask(t.id);
          return (
            <li key={t.id}>
              <input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedAllClickHandler}>Completed</button>
      </div>
    </div>
  );
}
