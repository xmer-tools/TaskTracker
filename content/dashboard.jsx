import { connect } from 'react-redux';
import { addColumn } from './.redux/actions';
import Column from './column';

// Shows the user all the active tasks
class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newColumn: false
        };
    }

    // Allows the user to create a new column
    newColumn() {
        this.setState({
            newColumn: true
        });
    }

    // Sends the new column through redux
    addColumn(val) {
        this.props.addColumn(val);
        this.setState({
            newColumn: false
        });
    }

    render() {
        return (
            <div className="Dashboard">
                {this.props.columns.map(col => {
                    return <Column key={col._id} {...col} />
                })}

                {this.state.newColumn ? 
                    <Column new addColumn={val => this.addColumn(val)}/> : 
                    null
                }

                <div className="add" onClick={() => this.newColumn()}>
                    Add Column
                </div>
            </div>
        )
    }
}

const mapProps = state => ({
    columns: state.columns
});

const mapDispatch = dispatch => ({
    addColumn: title => dispatch(addColumn({title}))
});

export default connect(mapProps, mapDispatch)(Dashboard);