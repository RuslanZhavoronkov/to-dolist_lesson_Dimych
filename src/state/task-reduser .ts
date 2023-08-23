import { v1 } from "uuid"
import { TaskStateType } from "../AppWithRedux"
import { AddTodolistACType, RemoveTodolistACType, todoListId1, todoListId2 } from "./todolists-reduser"

// Типизация action, возвращенного функцией action-create
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeStatusACType = ReturnType<typeof changeStatusAC>
type ChangeTitleTaskACType = ReturnType<typeof changeTitleTaskAC>


type ActionType = RemoveTaskACType | AddTaskACType | ChangeStatusACType | ChangeTitleTaskACType | AddTodolistACType | RemoveTodolistACType

const initialState: TaskStateType = {
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
  }

export const taskReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return { ...state, [action.payload.todoListId]: 
                state[action.payload.todoListId].filter(el => el.id !== action.payload.taskId) }
        }

        case 'ADD-TASK': {
            return { ...state, [action.payload.todoListId]: 
                [...state[action.payload.todoListId], { id: v1(), title: action.payload.titleTask, isDone: false }] }
        }

        case 'CHANGE-TASK-STATUS': {
            return {...state, [action.payload.todoListId]: 
                state[action.payload.todoListId].map(el => el.id === action.payload.taskId ?{...el, isDone: action.payload.isDone} :el)}
        }

        case 'CHANGE-TASK-TITLE': {
            return {...state, [action.payload.todoListId]: 
                state[action.payload.todoListId].map(el => el.id === action.payload.taskId ? {...el, title:action.payload.title}:el)}
        }

        case 'ADD-TODOLIST': {
            return {...state,[action.payload.id]: []}
        }

        case "REMOVE-TODOLIST": {
            
            const {[action.payload.id]:[], ...rest} = state
            return rest
            // let copyState = {...state}
            // delete copyState[action.payload.id]
            // return copyState
        }

        default:
            return state;
    }
}



//Function Action-Create, возвращающая объект action- инструкцию по удалению таски

export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId,
            todoListId
        }
    } as const
}


//Function action-create, возвращающая объект - инструкцию по добавлению таски

export const addTaskAC = (titleTask: string, todoListId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            titleTask,
            todoListId
        }
    } as const
}


//Напишем функцию action-create, возвращающая объект action- инструкцию по изменению статуса таски

export const changeStatusAC = (taskId: string, isDone: boolean, todoListId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskId,
            isDone,
            todoListId
        }
    } as const
}


//Напишем функцию action-create, возвращающая объект action - инструкцию по изменению title таски

export const changeTitleTaskAC = (taskId:string, title: string, todoListId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            taskId,
            title,
            todoListId
        }
    } as const
}