import openSocket from 'socket.io-client';
import { actions, addColumn, initColumns } from './actions';

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

    // Sending actions to server
    return next => action => {
        if(!action.loop)
            switch (action.type) {
                case actions.ADD_COLUMN:
                    socket.emit('addColumn', action.column);
                    return;
            }

        next(action);
    }
}