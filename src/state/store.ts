import { combineReducers, createStore } from "redux";
import { taskReducer } from "./task-reduser ";
import { todolistsReducer } from "./todolists-reduser";
import { TaskStateType, TodolistType } from "../AppWithRedux";






//function create main Reducer
const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasksObj: taskReducer
});


//function create store
export const store = createStore(rootReducer);

//auto type state
export type AppRootState = ReturnType <typeof rootReducer>


//window.store = store;