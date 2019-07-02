import { connect } from 'react-redux';
import Input from './library/input';

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
                        {(() => {
                            if(this.props.new) 
                                return (
                                    <Input autoFocus 
                                        onEnter={val => this.props.addColumn(val)}
                                    />
                                );

                            return this.props.data.title;
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
    data: PropTypes.object, // Mongo Column Data

    // These are required only if this is a new column
    new: PropTypes.bool, // If this column is brand new
    addColumn: PropTypes.func, // One parameter, value. Saves the new column to the database
}

const mapProps = state => ({
});

const mapDispatch = dispatch => ({
});

export default connect(mapProps, mapDispatch)(Column);