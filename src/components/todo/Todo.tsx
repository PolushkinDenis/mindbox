import React, { FC, useEffect, useState } from "react";
import './Todo.scss'
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { todo } from "../../store/todoSlice";
import { ITodo } from "../../types/todo";
import TodoList from "../todoList/TodoList";

interface ISortType {
    type: "all" | "active" | "completed"
}

const Todo: FC = () => {
    const { tasks } = useAppSelector(state => state.todo)
    const [todos, setTodos] = useState<ITodo[]>(tasks)
    const [task, setTask] = useState<string>("")
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

    const dispatch = useAppDispatch()

    const addTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (task.length > 0) {
            dispatch(todo.actions.addTodo({ id: Date.now() + task, task, status: false }))
            setTask("")
        }
    }

    const clearCompleted = () => {
        dispatch(todo.actions.clearCompleted())
    }

    const todoFilter = () => {
        switch (filter) {
            case "all":
                setTodos(tasks)
                break;
            case "active":
                const activeTasks = tasks.filter(task => task.status === false)
                setTodos(activeTasks)
                break;
            case "completed":
                const completedTasks = tasks.filter(task => task.status === true)
                setTodos(completedTasks)
                break;
            default:
                setTodos(tasks)
                break;
        }
    }

    useEffect(() => {
        todoFilter()
    }, [tasks, filter])

    console.log(tasks)

    return (
        <main className="todo">
            <h1>TODOS</h1>
            <section>
                <form onSubmit={e => addTask(e)}>
                    <input type="text" onChange={e => setTask(e.target.value)} value={task} />
                    <button type="submit">Добавить</button>
                </form>
                <hr/>
                <TodoList todos={todos} />
                <hr/>
                <div className="footer">
                    <span>{tasks.filter(task => task.status === false).length} items left</span>
                    <div>
                        <button className={filter === "all" ? "button-act" : ""} onClick={() => setFilter("all")}>All</button>
                        <button className={filter === "active" ? "button-act" : ""} onClick={() => setFilter("active")}>Active</button>
                        <button className={filter === "completed" ? "button-act" : ""} onClick={() => setFilter("completed")}>Completed</button>
                    </div>
                    <button onClick={clearCompleted}>Clear completed</button>
                </div>
               
            </section>
            <div className="footer__bloc-start"></div>
                <div className="footer__bloc-end"></div>
        </main >
    )
}

export default Todo