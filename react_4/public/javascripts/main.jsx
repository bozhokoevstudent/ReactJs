class ContactList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studlist: []
        };

    }

    componentDidMount() {
        fetch(`/getstlist`)
            .then(res => res.json())
            .then(json => this.setState({ studlist: json }));
    }




    render() {
        return (
            <div className="contactlist">
            <p>Компонент ContactList</p>
                {this.state.studlist.map((stud) =>
                    <div key={stud.id_stud} id={stud.id_stud} >
                        <p id={stud.id_stud} onClick={this.props.hclick}>{stud.fam + ' ' + stud.name}</p>
                    </div>
                )}


            </div>
        )
    }
}

class MessageBox extends React.Component {

    render() {  
        return (
            <div>
                <h1>Компонент MessageBox</h1>
                {this.props.st_mes.map((mes) => 
                    <div>{mes.id_student + 'sms: ' + mes.message_text}</div>
                
                )}
<h1>{this.props.id_st}</h1>
            </div>

        )
    }
}


class MainComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            st_mes: []
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        fetch(`/getmessage?id_st=${event.target.id}`)
        .then(res => res.json())
        .then(json => this.setState({st_mes: json }));
     }

     




    render() {
        return (
            <div className="mainbox">
                <ContactList hclick={this.handleClick.bind(this)}/>
                <MessageBox st_mes={this.state.st_mes}/>

            </div>
        )
    }
}

ReactDOM.render(
            <MainComp />
            ,

    document.getElementById("root")
)


