import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";


export type RemoveTolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}

export type AddTodolistsActionType = {
    type: "ADD-TODOLIST",
    title: string
}

export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST_TITLE",
    id: string,
    title: string
}


export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string,
    filter: FilterValuesType
}

export type ActionsTypes =  RemoveTolistActionType | AddTodolistsActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType


export const todolistsReducer = (state: TodolistType[], action: ActionsTypes ): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.id);
        }
        case "ADD-TODOLIST": {
            return [...state, { id: v1(), title: action.title, filter: 'All' }]
        }
        case "CHANGE-TODOLIST_TITLE": {
            return state.map(el => el.id === action.id ? { ...el, title: action.title } : el);
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.id ? { ...el, filter: action.filter } : el);
        }


        default:
            throw new Error("I don't understand this action type")
    }
}