import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITodo } from '../types/todo'

interface TodoState {
    tasks: ITodo[]
}

const initialState: TodoState = {
    tasks: []
}

export const todo = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<ITodo>)  {
            state.tasks.push(action.payload)
        },
        changeStatus(state, action: PayloadAction<string>) {
            const index = state.tasks.findIndex(task => task.id === action.payload)
            if(index !== -1) {
                state.tasks[index].status = !state.tasks[index].status
            }
        },
        clearCompleted(state) {
            state.tasks = state.tasks.filter(task => task.status === false)
        }
    }
})

export default todo.reducer