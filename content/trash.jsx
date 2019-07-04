import can from './images/trash.png';
import { connect } from 'react-redux';
import { overTrash } from './.redux/actions';

class Trash extends React.Component {
    render() {
        return (
            <div className={`Trash ${this.props.dragging ? "Dragging" : ""}`}
                onDragOver={e => e.preventDefault()}
                onDragEnter={() => this.props.dragOver()}
            >
                <img src={can} />
            </div>
        );
    }
}

const mapProps = state => ({
    dragging: state.dragging
});

const mapDispatch = dispatch => ({
    dragOver: () => dispatch(overTrash())
});

export default connect(mapProps, mapDispatch)(Trash);