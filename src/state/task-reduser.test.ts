import { v1 } from "uuid";
import { addTaskAC, changeStatusAC, changeTitleTaskAC, removeTaskAC, taskReducer } from "./task-reduser ";
import { TaskStateType } from "../App";
import { TaskType } from "../Todolist";
import { addTodolistAC, removeTodolistAC } from "./todolists-reduser";



test('remove task', () => {


    const startTaskState: TaskStateType = {
        'todoListId1': [
            { id: '1', title: "CSS", isDone: false },
            { id: '2', title: "JS", isDone: true },
            { id: '3', title: "React", isDone: false }
        ],
        'todoListId2': [
            { id: '1', title: "bread", isDone: false },
            { id: '2', title: "milk", isDone: true },
            { id: '3', title: "tea", isDone: false }
        ]
    }


    const resultTaskState = taskReducer(startTaskState, removeTaskAC('1', 'todoListId1'))

    expect(resultTaskState['todoListId1'].length).toBe(2)
    expect(startTaskState['todoListId1'].length).toBe(3)
    expect(resultTaskState['todoListId1'][0].id).toBe('2')
    expect(resultTaskState['todoListId1'].every(el => el.id !== '1')).toBeTruthy()


})


test('Add task', () => {

    const startTaskState: TaskStateType = {
        'todoListId1': [
            { id: '1', title: "CSS", isDone: false },
            { id: '2', title: "JS", isDone: true },
            { id: '3', title: "React", isDone: false }
        ],
        'todoListId2': [
            { id: '1', title: "bread", isDone: false },
            { id: '2', title: "milk", isDone: true },
            { id: '3', title: "tea", isDone: false }
        ]
    }

    const newTaskTitle: string = "React samuray"

    const resultTaskState = taskReducer(startTaskState, addTaskAC("React samuray", 'todoListId1'))

    expect(resultTaskState['todoListId1'].length).toBe(4)
    expect(resultTaskState['todoListId2'].length).toBe(3)
    expect(startTaskState['todoListId1'].length).toBe(3)
    expect(resultTaskState['todoListId1'][3].title).toBe("React samuray")
    expect(resultTaskState['todoListId1'][3].isDone).toBe(false)
    expect(resultTaskState['todoListId1'][3].id).toBeDefined()
})



test('Change task status', () => {

    const startTaskState: TaskStateType = {
        'todoListId1': [
            { id: '1', title: "CSS", isDone: false },
            { id: '2', title: "JS", isDone: true },
            { id: '3', title: "React", isDone: false }
        ],
        'todoListId2': [
            { id: '1', title: "bread", isDone: false },
            { id: '2', title: "milk", isDone: true },
            { id: '3', title: "tea", isDone: false }
        ]
    }

    const newSatus: boolean = true

    const resultTaskState = taskReducer(startTaskState, changeStatusAC('3', newSatus, 'todoListId1'))

    expect(resultTaskState['todoListId1'][2].isDone).toBeTruthy;
    expect(resultTaskState['todoListId2'][2].isDone).toBeFalsy;
})


test('Change task title', () => {


    const startTaskState: TaskStateType = {
        'todoListId1': [
            { id: '1', title: "CSS", isDone: false },
            { id: '2', title: "JS", isDone: true },
            { id: '3', title: "React", isDone: false }
        ],
        'todoListId2': [
            { id: '1', title: "bread", isDone: false },
            { id: '2', title: "milk", isDone: true },
            { id: '3', title: "tea", isDone: false }
        ]
    }


    const resultTaskState = taskReducer(startTaskState, changeTitleTaskAC('3', 'Samuray', 'todoListId1'))

    expect(resultTaskState['todoListId1'][2].title).toBe('Samuray')

})


// добавление объекта action (инструкцией) по добавлению тудулиста в taskReduser

test('new array should be added when new todolist is added', () => {
    const startTaskState: TaskStateType = {
        'todoListId1': [
            { id: '1', title: "CSS", isDone: false },
            { id: '2', title: "JS", isDone: true },
            { id: '3', title: "React", isDone: false }
        ],
        'todoListId2': [
            { id: '1', title: "bread", isDone: false },
            { id: '2', title: "milk", isDone: true },
            { id: '3', title: "tea", isDone: false }
        ]
    }

    const resultTaskState = taskReducer(startTaskState, addTodolistAC("New Todolist"))



    const keys = Object.keys(resultTaskState);
    const newKey = keys.find(k => k !== "todoListId1" && k !== "todoListId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)
    expect(resultTaskState[newKey]).toEqual([])
})

test ('property todolistId should be deleted',() => {
    const startTaskState: TaskStateType = {
        'todoListId1': [
            { id: '1', title: "CSS", isDone: false },
            { id: '2', title: "JS", isDone: true },
            { id: '3', title: "React", isDone: false }
        ],
        'todoListId2': [
            { id: '1', title: "bread", isDone: false },
            { id: '2', title: "milk", isDone: true },
            { id: '3', title: "tea", isDone: false }
        ]
    }

    const resultTaskState = taskReducer(startTaskState, removeTodolistAC ('todoListId2'))

    const keys = Object.keys(resultTaskState)
    expect(keys.length).toBe(1)
    expect(resultTaskState['todoListId2']).not.toBeDefined()
})