import React, { FC } from "react";
import { ITodo } from "../../types/todo";
import { todo } from "../../store/todoSlice";
import { useAppDispatch } from "../../hooks/redux";
import './TodoList.scss'

interface TodoListProps {
    todos: ITodo[]
}

const TodoList: FC<TodoListProps> = ({ todos }) => {
    const dispatch = useAppDispatch()

    return (
        <div className="todoList">
            {todos.map(task => (
                <div className="todoList__item" key={task.id} >
                    {/* <input className="checkbox" type="checkbox" onChange={e => dispatch(todo.actions.changeStatus(task.id))} checked={task.status} /> */}
                    <div className="checkbox-wrapper">
                        <label>
                            <input
                                type="checkbox"
                                className={task.status ? "checked" : ""}
                                checked={task.status}
                                onChange={e => dispatch(todo.actions.changeStatus(task.id))}
                            />
                            <span className={task.status ? "task-completed" : "task-active"}>{task.task}</span>
                        </label>
                    </div>
                    {/* <label className={task.status ? "task-completed" : "task-active"}>{task.task}</label> */}
                </div>
            ))}
        </div>
    )
}

export default TodoList