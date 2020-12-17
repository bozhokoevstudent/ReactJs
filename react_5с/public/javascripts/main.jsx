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
                {this.state.studlist.map((stud) =>
                    <div key={stud.id_stud} id={stud.id_stud} >
                        <p className="spisok" id={stud.id_stud} onClick={this.props.hclick}>{stud.fam + ' ' + stud.name}</p>
                    </div>
                )}


            </div>
        )
    }
}
class StudInfo extends React.Component{
    render(){
        return(
            <div >
                <h3 className="user">{this.props.fio}</h3>

            </div>
        )
    }
}



class SendMessage extends React.Component{
    constructor(props){
        super(props);
        this.state = {textvalue: ""};
        this.handleChange = this.handleChange.bind(this);
        this.sendToBase = this.sendToBase.bind(this);
    }
        handleChange(e){
            this.setState({textvalue: e.target.value});
        
        }

        sendToBase(){
            fetch(`/sendmessage?mess=` + this.state.textvalue + '&st_id=' + this.props.st_id) 
       

}


render(){
    if (this.props.visible){
    return(
        
        <div className="sendmes">

            <input type="text" name="mes" onChange={this.handleChange}/>
            <input type="submit" onClick={this.sendToBase}/>

        </div>
    )
     } else{
    return <div></div>
}
}
}

class MessageBox extends React.Component {

    render() {  
        return (
            <div>
                {this.props.st_mes.map((mes) => 
                    <div className="sms">{mes.id_student + 'sms: ' + mes.message_text}</div>
                
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
            st_mes: [],
            st_info:'',
            visible: false,
            st_id: ''
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleSendMes = this.handleSendMes.bind(this);
        
    }

    handleClick(event) {


        fetch(`/getmessage?id_st=${event.target.id}`)
        .then(res => res.json())
        .then(json => this.setState({st_mes: json }));

           
        this.getStudInfo(event.target.id);
this.setState({visible: true});
this.setState({st_id: event.target.id})
         }

     
getStudInfo(id_stud){
    fetch(`/getstinfo?id_st=${id_stud}`)
        .then(res => res.json())
        .then(json => this.setState({st_info: json[0].fio })
            )

};

handleSendMes(text){
    alert(text);
}



    render() {
        return (
            <div className="mainbox">
                <ContactList hclick={this.handleClick.bind(this)}/>
            <div>    
                <StudInfo fio={this.state.st_info} />
                <MessageBox st_mes={this.state.st_mes}/> 
                <SendMessage 
                            visible={this.state.visible}   
                            sendmes = {this.handleSendMes.bind(this)}
                            st_id={this.state.st_id}/>

                
</div>
            </div>
        )
    }
}

ReactDOM.render(
            <MainComp />
            ,

    document.getElementById("root")
)


