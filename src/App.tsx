import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";

export type FilterValuesType = "All" | "Completed" | "Active";

function App() {
  //Создадим массивы задач
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "Redux", isDone: false },
  ]);

  let [filter, setFilter] = useState<FilterValuesType>("All");

  //Функция обработчик нажатия кнопки "x"(логическая функция)
  function removeTask(id: number) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  //Функция обработчик нажатия кнопок "All", "Completed", "Active"(логическая функция)
  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  let tasksForTodolist = tasks;

  if (filter === "Completed") {
    tasksForTodolist = tasks.filter((t) => t.isDone === true);
  }
  if (filter === "Active") {
    tasksForTodolist = tasks.filter((t) => t.isDone === false);
  }

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
