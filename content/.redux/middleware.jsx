import openSocket from 'socket.io-client';
import { actions, addColumn, addTask, initColumns, moveTask, renameColumn } from './actions';

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

                case actions.DRAG_END:
                    var dragData = store.getState().dragging;

                    // It's a task being moved and isn't being moved to the same column
                    if(dragData.task && dragData.column != dragData.target.column) {
                        store.dispatch(moveTask(dragData.task, dragData.column, dragData.target.column));
                        socket.emit('moveTask', dragData.task, dragData.column, dragData.target.column);
                    }

                    // TODO: it could also be a column being moved
                    return;
            }

        next(action);
    }
}