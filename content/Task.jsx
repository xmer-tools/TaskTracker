import Input from "./library/input";

// Displays this task
class Task extends React.Component {
    render() {
        return (
            <div className="Task">
                {(()=>{
                    if(this.props.new)
                        return (
                            <Input autoFocus
                                onEnter={val => this.props.addTask(val)}
                            />
                        );

                    return (
                        <Input 
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

export default Task;