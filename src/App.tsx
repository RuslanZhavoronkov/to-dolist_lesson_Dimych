import React, { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";

export type FilterValuesType = "All" | "Completed" | "Active";

function App() {
  //Создадим массивы задач
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
  ]);
 

  let [filter, setFilter] = useState<FilterValuesType>("All");

//Функция обработчик, поставленного флажка в checkbox input
function changeStatus (taskId:string, isDone:boolean) {
let task = tasks.find(t => t.id === taskId)  //Если найдем по id таску, то запишем ее в переменную таску
if(task) { //Если таска нашлась, то поменяй ее значение свойства isDone на на чекнутое 
  task.isDone = isDone
}

setTasks([...tasks]); //Возьми новый массив обратно с измененной таской
}



  //Функция обработчик нажатия кнопки "x"(логическая функция)
  function removeTask(id: string) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  //Функция добавляющая новую таску(объект) в массив
  function addTask(title:string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks]; //создали новый массив объектов
    setTasks(newTasks);
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
        addTask={addTask}
        changeTaskStatus = {changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
