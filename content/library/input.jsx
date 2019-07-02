class Input extends React.Component {
    handleKeyDown(e) {
        if(this.props.onEnter && e.key === "Enter") 
            this.props.onEnter(e.target.value);
    }

    render() {
        return (
            <input 
                className="Input"
                type="text"
                autoFocus={this.props.autoFocus}
                onKeyDown={e => this.handleKeyDown(e)} />
        )
    }
}

Input.propTypes = {
    onEnter: PropTypes.func.isRequired, // Function to run when the enter key is pressed

    autoFocus: PropTypes.bool, // If true, this input field will be auto focused
}

export default Input;