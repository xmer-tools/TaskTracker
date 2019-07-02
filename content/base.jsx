require('./base.scss');

class Base extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {};
        
        global.toggleMenu = () => {
            this.setState({hideMenu: !this.state.hideMenu});
        };
    }
    
    render() {
        return(
            <div className='MainArea'>
                Hello World
            </div>
        );
    }
}

export default Base;

ReactDOM.render(
    <Base />,
    document.getElementById('content')
);