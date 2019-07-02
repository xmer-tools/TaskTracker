import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import middleware from '_redux/middleware';
import app from '_redux/reducers';
import Dashboard from './dashboard';

// Redux Setup
let store = createStore(app, applyMiddleware(middleware));
global.getState = () => store.getState();

// Controls the entire screen
// This component should never be unloaded
require('./base.scss');
class Base extends React.Component{
    constructor(props){
        super(props);
    }
    
    render() {
        return(
            <div className='MainArea'>
                <Dashboard />
            </div>
        );
    }
}

export default Base;

ReactDOM.render(
    <Provider store={store}>
        <Base />
    </Provider>,
    document.getElementById('content')
);