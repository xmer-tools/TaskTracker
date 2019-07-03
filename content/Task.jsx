import { connect } from 'react-redux';
import Input from "./library/input";
import { dragStart, dragEnd } from './.redux/actions';

// Displays this task
class Task extends React.Component {
    render() {
        return (
            <div className="Task" 
                draggable={!this.props.new} 
                onDragStart={() => this.props.dragStart(this.props._id)}
                onDragEnd={() => this.props.dragEnd()}
            >
                {(()=>{
                    if(this.props.new)
                        return (
                            <Input autoFocus
                                multiline
                                onEnter={val => this.props.addTask(val)}
                            />
                        );

                    return (
                        <Input 
                            multiline
                            key={this.props.title}
                            value={this.props.title}
                            onEnter={() => {}}
                        />
                    );
                })()}
            </div>
        )
    }
}

Task.propTypes = {
    _id: PropTypes.string, // Mongo ID for this task
    title: PropTypes.string, // Title of this task

    // These are required only if this is a new column
    new: PropTypes.bool, // If this column is brand new
    addTask: PropTypes.func, // One parameter, value. Saves the new task to the database
}

const mapProps = state => ({
});

const mapDispatch = dispatch => ({
    dragStart: id => dispatch(dragStart(true, id)),
    dragEnd: () => dispatch(dragEnd())
});

export default connect(mapProps, mapDispatch)(Task);