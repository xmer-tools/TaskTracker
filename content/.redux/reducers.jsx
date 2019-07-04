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

        case actions.RENAME_TASK:
            return state.map(col => {
                if(col._id == action.colId)
                    col.tasks = col.tasks.map(task => {
                        if(task._id == action.taskId)
                            task.title = action.title;

                        return task;
                    });
                return col;
            });

        case actions.REMOVE_TASK:
            return state.map(col => {
                if(col._id == action.col) {
                    col.tasks.splice(
                        col.tasks.findIndex(task => task._id == action.task),
                        1
                    );

                    col.tasks = [...col.tasks];
                }

                return col;
            });

        default:
            return state;
    }
};

// Controls the dragging features
const dragging = (state = null, action) => {
    switch(action.type) {
        case actions.DRAG_START:
            return {
                column: action.columnId,
                task: action.taskId
            };

        case actions.DRAG_OVER_COLUMN:
            return {
                ...state, 
                target: {
                    column: action.id
                    // TODO: add task here so the user can set task index
                }
            };

        case actions.DRAG_OVER_TRASH:
            return {
                ...state, 
                target: "Trash"
            };

        case actions.DRAG_END:
            return null;
    }

    return state;
}

export default combineReducers({
    columns,
    dragging
});