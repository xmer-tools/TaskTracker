import { connect } from 'react-redux';
import Input from './library/input';
import { renameColumn } from './.redux/actions';

// Shows the user all the active tasks
class Column extends React.Component {
    render() {
        return (
            <div className="Column">
                <div className="header">
                    <div />
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
                    <div>
                        Add
                    </div>
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
    renameColumn: (id, val) => dispatch(renameColumn(id, val))
});

export default connect(mapProps, mapDispatch)(Column);