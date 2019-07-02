import { combineReducers } from 'redux';
import { actions } from './actions';

// Controls the list of columns the user can see
const columns = (state = [], action) => {
    switch (action.type) {
        case actions.INIT_COLUMNS:
            return action.columns;

        case actions.ADD_COLUMN:
            return [...state, action.column]

        case actions.RENAME_COLUMN:
            return state.map(col => {
                if(col._id === action.id)
                    col.title = action.title;

                return col;
            });

        case actions.ADD_TASK:
            return state.map(col => {
                // action.title originally is used to store the title only
                // After the server saves the task action.title is used to store the entire task object
                if(col._id === action.id)
                    col.tasks = [...col.tasks, action.title];

                return col;
            });
        
        default:
            return state;
    }
};

export default combineReducers({
    columns
});