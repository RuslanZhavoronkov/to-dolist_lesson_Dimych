import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../AppWithRedux";
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from "./todolists-reduser";


test('correct todolist should be removed', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' }
    ]



    // const endState = todolistsReducer(startState, {type: "REMOVE-TODOLIST", id: todolistId1})
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})



test('correct todolist should be added', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' }
    ]



    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe('All')
})


test('correct todolist should change its name', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' }
    ]
    // const action = {
    //     type: "CHANGE-TODOLIST_TITLE" as const,
    //     id: todolistId2,
    //     title: newTodolistTitle
    // }


    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2,newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)

})


test('correct filter of todolist should changed', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "Completed";

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' }
    ]

    // const action = {
    //     type: "CHANGE-TODOLIST-FILTER" as const,
    //     id: todolistId2,
    //     filter: newFilter
    // }


    const endState = todolistsReducer(startState, changeTodolistFilterAC( newFilter,todolistId2))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe('Completed')

})