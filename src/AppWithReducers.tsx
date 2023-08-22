import React, { useReducer, useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { type } from "os";
import { AddItemForm } from "./AddItemForm";
import { title } from "process";
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from "./state/todolists-reduser";
import { addTaskAC, changeStatusAC, changeTitleTaskAC, removeTaskAC, taskReducer } from "./state/task-reduser ";

export type FilterValuesType = "All" | "Completed" | "Active";

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}


export type TaskStateType = {
  [key: string]: TaskType[]
}





function AppWithReducers() {

  let todoListId1 = v1();
  let todoListId2 = v1();

  let [todoLists, dispatchTodolistReducer] = useReducer(todolistsReducer,
    [
      { id: todoListId1, title: 'What to learn', filter: 'All' },
      { id: todoListId2, title: 'What to buy', filter: 'All' }
    ])
    debugger

  //Создадим массив для хранения всех тасок
  let [tasksObj, dispatchToTaskReducer] = useReducer(taskReducer, {
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
debugger

  //Функция обработчик нажатия кнопки "x"(логическая функция)
  function removeTask(id: string, todolistId: string) {
    dispatchToTaskReducer(removeTaskAC(id, todolistId));  //посылаем dispatch объект action в reducer
    // dispatchToTaskReducer(removeTaskAC(id,todolistId))
  }


  //Функция добавляющая новую таску(объект) в массив
  function addTask(title: string, todolistId: string) {
   dispatchToTaskReducer(addTaskAC(title,todolistId));
  }



  //Функция обработчик, поставленного флажка в checkbox input
  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
   dispatchToTaskReducer(changeStatusAC(taskId,isDone,todolistId));
  }


  //Функция обработчик, поставленного флажка в checkbox input
  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    dispatchToTaskReducer( changeTitleTaskAC(taskId, newTitle, todolistId));
  }

  //Функция обработчик нажатия кнопок "All", "Completed", "Active"(логическая функция)
  function changeFilter(value: FilterValuesType, todolistId: string) { // принимает теперь и id todolist, которрый нужно поменять
    dispatchTodolistReducer(changeTodolistFilterAC(value,todolistId))
  }



  let removeTodolist = (todolistId: string) => {
    dispatchTodolistReducer(removeTodolistAC(todolistId))
    dispatchToTaskReducer(removeTodolistAC(todolistId))
  }


  let changeTodolistTitle = (todolistId: string, newTitle: string) => {
    dispatchTodolistReducer(changeTodolistTitleAC(todolistId, newTitle))
  }

  const addTodolist = (title: string) => {
    dispatchTodolistReducer(addTodolistAC(title))
    dispatchToTaskReducer(addTodolistAC(title))
  }



  return (

    <div className="App">

      <AppBar position={"static"}>
        <Toolbar>
          <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
            <Menu />
          </IconButton>
          <Typography variant={"h6"}>
            News
          </Typography>
          <Button color={"inherit"}>Login</Button>
        </Toolbar>
      </AppBar>

      <Container fixed>

        <Grid container style={{ padding: '20px' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>

        <Grid container spacing={3}>
          {todoLists.map(tl => {

            let tasksForTodolist = tasksObj[tl.id];//Записали массив тасок для конкретного тудулиста

            if (tl.filter === "Completed") {
              tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === true);
            }
            if (tl.filter === "Active") {
              tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === false);
            }
            return (
              <Grid item>
                <Paper style={{ padding: '10px' }}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            )
          })}
        </Grid>

      </Container>

    </div>
  );
}

export default AppWithReducers;
