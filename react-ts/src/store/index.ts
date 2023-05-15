import { createStore, combineReducers } from 'redux';

import todos from './reducers/todos';

const reducer = combineReducers({
    todos,
});

export default createStore(reducer);