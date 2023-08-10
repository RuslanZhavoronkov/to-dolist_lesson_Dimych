import { v1 } from "uuid";
import { TodolistType } from "../App";


export type ActionType = {
    type: string
    [key: string]: any
}



export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.id);
        }
        case "ADD-TODOLIST" : {
            return [...state, {id:v1(), title: action.title, filter: 'All'}]
        }
        case "CHANGE-TODOLIST_TITLE": {
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        }
        case "CHANGE-TODOLIST-FILTER" : {
            return state.map(el => el.id === action.id ? {...el, filter: action.filter}: el)
        }


        default:
            throw new Error("I don't understand this action type")
    }
}