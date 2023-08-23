import { TaskStateType, TodolistType } from "../AppWithRedux"
import { taskReducer } from "./task-reduser "
import { addTodolistAC, todolistsReducer } from "./todolists-reduser"

test('ids should be equals', () => {

    const startTaskState: TaskStateType = {}
    const startTodolistState: Array<TodolistType> = []

    const action = addTodolistAC('new todolist')
    const resultStartTaskState = taskReducer(startTaskState, action)
    const resultTodolistState = todolistsReducer(startTodolistState, action)

    const keys = Object.keys(resultStartTaskState)

    const idFromTask = keys[0]
    const idFromTodolist = resultTodolistState[0].id


    expect(keys.length).toBe(1)
    expect(resultTodolistState[0]).toBeDefined()
    expect(idFromTask).toBe(action.payload.id)
    expect(idFromTodolist).toBe(action.payload.id)

})