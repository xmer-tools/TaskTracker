import openSocket from 'socket.io-client';
import { actions, initTasks } from './actions';

const socket = openSocket(window.location.origin);

// Connects to socket io to send and receive via redux actions
export default store => {
    // Receiving actions from server
    socket.on('initTasks', tasks => {
        store.dispatch(initTasks(tasks));
    });


    // Sending actions to server
    return next => action => {
        console.log('action', action);

        switch (action.type) {
            case actions.ADD_TASK:
                socket.emit('addTask', action.task);
        }

        next(action);
    }
}