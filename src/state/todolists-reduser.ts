import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../AppWithRedux";


export type ActionsTypes = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeTodolistFilterACType


export let todoListId1 = v1();
export let todoListId2 = v1();


const initialState: TodolistType[] = [
    { id: todoListId1, title: 'What to learn', filter: 'All' },
    { id: todoListId2, title: 'What to buy', filter: 'All' }
  ]

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsTypes): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.id);
        }
        case "ADD-TODOLIST": {
            
            return [{ id: action.payload.id, title: action.payload.title, filter: 'All' }, ...state]
            
        }
        case "CHANGE-TODOLIST_TITLE": {
            return state.map(el => el.id === action.payload.id ? { ...el, title: action.payload.title } : el);
        }
        case "CHANGE-TODOLIST-FILTER": {
           
            return state.map(el => el.id === action.payload.id ? { ...el, filter: action.payload.filter } : el);
        }

        default:
            return state;
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
            title,
            id:v1()
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


export const changeTodolistFilterAC = (filter: FilterValuesType,id: string) => {
    return {
        type:  "CHANGE-TODOLIST-FILTER",
        payload: {
            id,
            filter
        }
    } as const
}

//Пропишем типизацию автоматов(типы возвращенных, функциями значений) для функции action-create

export type RemoveTodolistACType = ReturnType <typeof removeTodolistAC>
export type AddTodolistACType = ReturnType <typeof  addTodolistAC>
type ChangeTodolistTitleACType = ReturnType <typeof changeTodolistTitleAC>
type ChangeTodolistFilterACType = ReturnType <typeof changeTodolistFilterAC>