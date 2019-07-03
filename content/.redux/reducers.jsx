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

        case actions.MOVE_TASK:
            var fromCol = state.find(col => col._id === action.from),
                toCol = state.find(col => col._id === action.to),
                task = fromCol.tasks.splice(
                    fromCol.tasks.findIndex(task => task._id === action.id), 1
                );


            fromCol.tasks = [...fromCol.tasks];
            toCol.tasks = [...toCol.tasks, ...task];

            return [...state];

        default:
            return state;
    }
};

// Controls the dragging features
const dragging = (state = {}, action) => {
    switch(action.type) {
        case actions.DRAG_START:
            return {
                column: action.columnId,
                task: action.taskId
            };

        case actions.DRAG_OVER_COLUMN:
            return {...state, target: {
                column: action.id
            }};
    }

    return state;
}

export default combineReducers({
    columns,
    dragging
});