import { connect } from 'react-redux';
import { initTasks } from './.redux/actions';
import Column from './column';

// Shows the user all the active tasks
class Dashboard extends React.Component {
    render() {
        return (
            <div className="Dashboard">
                <Column />
            </div>
        )
    }
}

const mapProps = state => ({
    tasks: state.tasks
});

const mapDispatch = dispatch => ({
    initTasks: tasks => dispatch(initTasks(tasks))
});

export default connect(mapProps, mapDispatch)(Dashboard);