import { connect } from 'react-redux';
import Input from './library/input';
import { renameColumn, addTask, dragEnter } from './.redux/actions';
import add from './images/add';
import Task from './Task';

// Shows the user all the active tasks
class Column extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newTask: false
        };
    }

    // Allows the user to create a new task
    newTask() {
        this.setState({
            newTask: true
        });
    }

    // Sends the new task through redux
    addTask(val) {
        this.props.addTask(this.props._id, val);
        this.setState({
            newTask: false
        });
    }

    render() {
        return (
            <div className="Column">
                <div className="header">
                    <div>
                        {(() => {
                            if(this.props.new) 
                                return (
                                    <Input autoFocus 
                                        onEnter={val => this.props.addColumn(val)}
                                    />
                                );

                            return (
                                <Input 
                                    key={this.props.title}
                                    value={this.props.title}
                                    onEnter={val => this.props.renameColumn(this.props._id, val)}
                                />
                            );
                        })()}
                    </div>
                    <div onClick={() => this.newTask()}>
                        <img src={add} />
                    </div>
                </div>
                <div onDragEnter={() => this.props.dragEnter(this.props._id)}>
                    {this.props.tasks ? this.props.tasks.map(task => {
                        return <Task key={task._id} {...task} />;
                    }) : null} 

                    {this.state.newTask ? 
                        <Task new addTask={title => this.addTask(title)} /> :
                        null
                    }
                </div>
            </div>
        )
    }
}

Column.propTypes = {
    _id: PropTypes.string, // Mongo ID for this column
    title: PropTypes.string, // Title of the column

    // These are required only if this is a new column
    new: PropTypes.bool, // If this column is brand new
    addColumn: PropTypes.func, // One parameter, value. Saves the new column to the database
}

const mapProps = state => ({
});

const mapDispatch = dispatch => ({
    renameColumn: (id, val) => dispatch(renameColumn(id, val)),
    addTask: (id, val) => dispatch(addTask(id, val)),
    dragEnter: id => dispatch(dragEnter(false, id))
});

export default connect(mapProps, mapDispatch)(Column);