import { combineReducers } from 'redux';
import { actions } from './actions';

// Controls the list of tasks the user can see
const tasks = (state = [], action) => {
    switch (action.type) {
        case actions.INIT_TASKS:
            return action.tasks;

        case actions.ADD_TASK:
            return [...state, action.task]
        
        default:
            return state;
    }
};

export default combineReducers({
    tasks
});