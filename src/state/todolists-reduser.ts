import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";


export type ActionsTypes = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeTodolistFilterACType


export const todolistsReducer = (state: TodolistType[], action: ActionsTypes): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.id);
        }
        case "ADD-TODOLIST": {
            return [...state, { id: v1(), title: action.payload.title, filter: 'All' }]
        }
        case "CHANGE-TODOLIST_TITLE": {
            return state.map(el => el.id === action.payload.id ? { ...el, title: action.payload.title } : el);
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.payload.id ? { ...el, filter: action.payload.filter } : el);
        }

        default:
            throw new Error("I don't understand this action type")
    }
}


//Create 'Action-create function'

export const removeTodolistAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            id
        }
    } as const
}

export const addTodolistAC = (title:string) => {
    return {
        type: "ADD-TODOLIST",
        payload:{
            title
        }
    } as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST_TITLE",
        payload: {
            id,
            title
        }
    } as const
}


export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type:  "CHANGE-TODOLIST-FILTER",
        payload: {
            id,
            filter
        }
    } as const
}

//Пропишем типизацию автоматов(типы возвращенных, функциями значений) для функции action-create

type RemoveTodolistACType = ReturnType <typeof removeTodolistAC>
type AddTodolistACType = ReturnType <typeof  addTodolistAC>
type ChangeTodolistTitleACType = ReturnType <typeof changeTodolistTitleAC>
type ChangeTodolistFilterACType = ReturnType <typeof changeTodolistFilterAC>