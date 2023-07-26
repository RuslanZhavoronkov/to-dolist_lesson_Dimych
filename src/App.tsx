import React, { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { type } from "os";
import { AddItemForm } from "./AddItemForm";
import { title } from "process";

export type FilterValuesType = "All" | "Completed" | "Active";
type TodolistType = {
  id: string
  title: string
  filter:FilterValuesType
}


type TaskStateType = {
  [key: string] : TaskType[]
}

function App() {
  //Создадим массивы задач
 

  
//Функция обработчик, поставленного флажка в checkbox input
function changeStatus (taskId:string, isDone:boolean, todolistId: string) {
//1.Необходимо найти нужный массив тасок по айди
let tasks = tasksObj[todolistId]
let task = tasks.find(t => t.id === taskId)  //Если найдем по id таску, то запишем ее в переменную таску
if(task) { //Если таска нашлась, то поменяй ее значение свойства isDone на на чекнутое 
  task.isDone = isDone
  //tasksObj[todolistId]
  setTasks({...tasksObj})
}

}


//Функция обработчик, поставленного флажка в checkbox input
function changeTaskTitle (taskId:string, newTitle: string, todolistId: string) {
  //1.Необходимо найти нужный массив тасок по айди
  let tasks = tasksObj[todolistId]
  let task = tasks.find(t => t.id === taskId)  //Если найдем по id таску, то запишем ее в переменную таску
  if(task) { //Если таска нашлась, то поменяй ее значение свойства isDone на на чекнутое 
    task.title = newTitle
   // tasksObj[todolistId]
    setTasks({...tasksObj})
  }
  
  }



  //Функция обработчик нажатия кнопки "x"(логическая функция)
  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let filtredTasks = tasks.filter((t) => t.id !== id)
    tasksObj[todolistId] = filtredTasks

    setTasks({...tasksObj});
  }

  //Функция добавляющая новую таску(объект) в массив
  function addTask(title:string, todolistId: string) {
    let task = { id: v1(), title: title, isDone: false };//1. создали новую таску с title который пришел с тудулист
    let tasks = tasksObj[todolistId] //2. из объекта тасок достали необходимый массив(по айди который пришел из тудулиста) куда будет добавлена новая таска
    let newTasks = [task, ...tasks]; //создали новый массив объектов

    tasksObj[todolistId] = newTasks
    setTasks({...tasksObj});
  }

  //Функция обработчик нажатия кнопок "All", "Completed", "Active"(логическая функция)
  function changeFilter(value: FilterValuesType, todolistId: string) { // принимает теперь и id todolist, которрый нужно поменять
    
let todoList = todoLists.find(tl => tl.id === todolistId);
if(todoList){
  todoList.filter = value
}
setTodolists([...todoLists])
  }

 let todoListId1 = v1();
 let todoListId2 = v1();

let [todoLists, setTodolists] = useState <TodolistType[]> (
  [
  {id: todoListId1, title: 'What to learn', filter: 'All'},
  {id: todoListId2, title: 'What to buy', filter: 'All'}
]) 

//Создадим массив для хранения всех тасок
let [tasksObj, setTasks] = useState<TaskStateType> ({
  [todoListId1]: [
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Rest API", isDone: false },
    { id: v1(), title: "GraphQL", isDone: false }
  ],
  [todoListId2]: [
    { id: v1(), title: "Book", isDone: false },
    { id: v1(), title: "Milk", isDone: true },
  ]
})

let removeTodolist = (todolistId: string) => {
  let filteredTodolist = todoLists.filter(tl => tl.id !== todolistId)
  setTodolists(filteredTodolist)
  delete tasksObj[todolistId];
  setTasks({...tasksObj})
}


let changeTodolistTitle = (todolistId: string, newTitle: string) => {
  const todolist = todoLists.find(tl => tl.id === todolistId)
  if (todolist) {
    todolist.title = newTitle
    setTodolists([...todoLists])
  }
}

const addTodolist = (title: string) => {
  let todoList: TodolistType = {
    id: v1(), 
    title: title, 
    filter: 'All'}

    setTodolists([todoList, ...todoLists]);

    setTasks({
    ...tasksObj,
    [todoList.id] : []
    })

  }
  


  return (
    
    <div className="App">
      <AddItemForm addItem={addTodolist}/>
      {todoLists.map(tl => {

let tasksForTodolist = tasksObj[tl.id];//Записали массив тасок для конкретного тудулиста

if (tl.filter === "Completed") {
  tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === true);
}
if (tl.filter === "Active") {
  tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === false);
}



        return (
           <Todolist
        key={tl.id}
        id={tl.id}
        title={tl.title}
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus = {changeStatus}
        filter={tl.filter}
        removeTodolist = {removeTodolist}
        changeTaskTitle={changeTaskTitle}
        changeTodolistTitle={changeTodolistTitle}
      />
        )
      })}
     
    </div>
  );
}

export default App;
