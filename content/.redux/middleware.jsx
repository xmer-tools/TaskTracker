import openSocket from 'socket.io-client';
import { actions, addColumn, addTask, initColumns, moveTask, renameColumn, renameTask, removeTask } from './actions';

const socket = openSocket(window.location.origin);

// Connects to socket io to send and receive via redux actions
export default store => {
    // Used when the socket sends us something
    // Prevents broadcast loops
    var safeDispatch = action => {
        action.loop = true;
        store.dispatch(action);
    }

    // Receiving actions from server
    socket.on('initColumns', columns => safeDispatch(initColumns(columns)));
    socket.on('addColumn', column => safeDispatch(addColumn(column)));
    socket.on('renameColumn', (id, title) => safeDispatch(renameColumn(id, title)));
    socket.on('addTask', (id, title) => safeDispatch(addTask(id, title)));
    socket.on('moveTask', (task, from, to) => safeDispatch(moveTask(task, from, to)));
    socket.on('renameTask', (colId, taskId, title) => safeDispatch(renameTask(colId, taskId, title)));
    socket.on('removeTask', (task, col) => safeDispatch(removeTask(task, col)));

    // Sending actions to server
    return next => action => {
        if(!action.loop)
            switch (action.type) {
                case actions.ADD_COLUMN:
                    socket.emit('addColumn', action.column);
                    return;

                case actions.RENAME_COLUMN:
                    socket.emit('renameColumn', action.id, action.title);
                    break;
                
                case actions.ADD_TASK:
                    socket.emit('addTask', action.id, action.title);
                    return;

                case actions.RENAME_TASK:
                    socket.emit('renameTask', action.colId, action.taskId, action.title);
                    break;

                case actions.DRAG_END:
                    var dragData = store.getState().dragging;

                    // If it's getting thrown in the trash
                    if (dragData.task && dragData.target === "Trash") {
                        store.dispatch(removeTask(dragData.task, dragData.column));
                        socket.emit('removeTask', dragData.task, dragData.column);
                    }

                    // It's a task being moved and isn't being moved to the same column
                    else if(dragData.task && dragData.column != dragData.target.column) {
                        store.dispatch(moveTask(dragData.task, dragData.column, dragData.target.column));
                        socket.emit('moveTask', dragData.task, dragData.column, dragData.target.column);
                    }
                    // TODO: it could also be a column being moved
                    next(action);

                    break;

            }

        next(action);
    }
}