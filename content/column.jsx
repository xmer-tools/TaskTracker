import { connect } from 'react-redux';
import { addTask } from './.redux/actions';

// Shows the user all the active tasks
class Column extends React.Component {
    render() {
        return (
            <div className="Column">
                <div className="header">
                    <div>
                        [-]
                    </div>
                    <div>
                        Title
                    </div>
                    <div onClick={() => this.props.addTask({name: "temp"})}>
                        Add
                    </div>
                </div>
            </div>
        )
    }
}

const mapProps = state => ({
});

const mapDispatch = dispatch => ({
    addTask: task => dispatch(addTask(task))
});

export default connect(mapProps, mapDispatch)(Column);