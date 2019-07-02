class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            val: this.props.value
        }
    }

    handleKeyDown(e) {
        if(this.props.onEnter && e.key === "Enter")
            this.props.onEnter(e.target.value);

        else if (this.props.value)
            this.setState({val: e.target.value});
    }

    render() {
        return (
            <input 
                className="Input"
                type="text"
                autoFocus={this.props.autoFocus}
                value={this.state.val || this.props.value || undefined}
                onChange={e => this.handleKeyDown(e)}
                onKeyDown={e => this.handleKeyDown(e)} />
        )
    }
}

Input.propTypes = {
    onEnter: PropTypes.func.isRequired, // Function to run when the enter key is pressed

    value: PropTypes.string, // Default Value for this field
    autoFocus: PropTypes.bool, // If true, this input field will be auto focused
}

export default Input;