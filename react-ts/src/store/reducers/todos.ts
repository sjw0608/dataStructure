import { TodoObject } from '../../ts/todoList';
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from '../constants';

const todos = (state: Array<TodoObject> = [], action: TodoObject) => {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false,
                }
            ];
        case TOGGLE_TODO:
            return state.map((todo: TodoObject): TodoObject => (todo.id === action.id)
                ? { ...todo, completed: !todo.completed }
                : todo);
        case REMOVE_TODO:
            return state.filter((todo: TodoObject) => todo.id !== action.id);
        default:
            return state;
    }
}

export default todos;