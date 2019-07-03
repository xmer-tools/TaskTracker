class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            val: this.props.value,
            focus: this.props.autoFocus
        }
    }

    handleKeyDown(e) {
        if(this.props.onEnter && e.key === "Enter") {
            this.setState({focus: false});
            this.props.onEnter(this.state.val);
        }

        else if (this.props.value)
            this.setState({val: e.target.value});
    }

    /**
     * Sets / unsets the focus of this element
     * @param {*} blur if this is being blurred
     */
    focus(blur){
        this.setState({focus: !blur});

        // Blur should also act as if the user pressed "Enter" to ensure the changes are saved
        if(blur)
            this.handleKeyDown({key: "Enter"});
    }

    render() {
        var props = {
            className: "Input",
            type: "Text",
            autoFocus: this.state.focus,
            value: this.state.val || this.props.value || undefined,
            onChange: e => this.handleKeyDown(e),
            onKeyDown: e => this.handleKeyDown(e),
            onBlur: () => this.focus(1)
        }

        if(this.state.focus) {
            if(this.props.multiline)
                return (
                    <textarea {...props} />
                );

            return (
                <input {...props} />
            );
        }

        return (
            <div onClick={() => this.focus()} className={props.className}>
                {props.value}
            </div>
        )
    }
}

Input.propTypes = {
    onEnter: PropTypes.func.isRequired, // Function to run when the enter key is pressed
    multiline: PropTypes.bool, // If there is a possibility for multiple lines

    value: PropTypes.string, // Default Value for this field
    autoFocus: PropTypes.bool, // If true, this input field will be auto focused
}

export default Input;