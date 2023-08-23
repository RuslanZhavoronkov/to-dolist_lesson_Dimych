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
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootState } from "./state/store";

export type FilterValuesType = "All" | "Completed" | "Active";

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}


export type TaskStateType = {
  [key: string]: TaskType[]
}





function AppWithRedux() {


  const dispatch = useDispatch(); //Главный диспатч для отправки объекта эктион в главный редюсер "rootReducer"
  const todoLists = useSelector <AppRootState, TodolistType[]>(state => state.todoLists)
  

  //Функция обработчик нажатия кнопок "All", "Completed", "Active"(логическая функция)
  function changeFilter(value: FilterValuesType, todolistId: string) { // принимает теперь и id todolist, которрый нужно поменять
    dispatch(changeTodolistFilterAC(value,todolistId))
  }



  let removeTodolist = (todolistId: string) => {
    dispatch(removeTodolistAC(todolistId))
    
  }


  let changeTodolistTitle = (todolistId: string, newTitle: string) => {
    dispatch(changeTodolistTitleAC(todolistId, newTitle))
  }

  const addTodolist = (title: string) => {
    dispatch(addTodolistAC(title))
    
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
            return (
              <Grid item>
                <Paper style={{ padding: '10px' }}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
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

export default AppWithRedux;



//__________________________________________________________________________________________________________________________________________________________


// function AppWithRedux() {


//   const dispatch = useDispatch(); //Главный диспатч для отправки объекта эктион в главный редюсер "rootReducer"
//   const todoLists = useSelector <AppRootState, TodolistType[]>(state => state.todoLists)
//   const tasksObj = useSelector <AppRootState, TaskStateType>(state => state.tasksObj)

  
  
//   //Функция обработчик нажатия кнопки "x"(логическая функция)
//   function removeTask(id: string, todolistId: string) {
//     dispatch(removeTaskAC(id, todolistId));  //посылаем dispatch объект action в reducer
//     // dispatchToTaskReducer(removeTaskAC(id,todolistId))
//   }


//   //Функция добавляющая новую таску(объект) в массив
//   function addTask(title: string, todolistId: string) {
//    dispatch(addTaskAC(title,todolistId));
//   }



//   //Функция обработчик, поставленного флажка в checkbox input
//   function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
//    dispatch(changeStatusAC(taskId,isDone,todolistId));
//   }


//   //Функция обработчик, поставленного флажка в checkbox input
//   function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
//     dispatch( changeTitleTaskAC(taskId, newTitle, todolistId));
//   }

//   //Функция обработчик нажатия кнопок "All", "Completed", "Active"(логическая функция)
//   function changeFilter(value: FilterValuesType, todolistId: string) { // принимает теперь и id todolist, которрый нужно поменять
//     dispatch(changeTodolistFilterAC(value,todolistId))
//   }



//   let removeTodolist = (todolistId: string) => {
//     dispatch(removeTodolistAC(todolistId))
    
//   }


//   let changeTodolistTitle = (todolistId: string, newTitle: string) => {
//     dispatch(changeTodolistTitleAC(todolistId, newTitle))
//   }

//   const addTodolist = (title: string) => {
//     dispatch(addTodolistAC(title))
    
//   }



//   return (