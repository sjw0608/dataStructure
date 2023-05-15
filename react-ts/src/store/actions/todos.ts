import { TodoObject } from '../../ts/todoList';
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from '../constants';

let nextToDoId = 0;

export const addTodo = (text: string): TodoObject => ({
    type: ADD_TODO,
    completed: false,
    id: nextToDoId++,
    text,
})

export const toggleTodo = (id: number) => ({
    type: TOGGLE_TODO,
    id,
})

export const removeTodo = (id: number) => ({
    type: REMOVE_TODO,
    id,
})