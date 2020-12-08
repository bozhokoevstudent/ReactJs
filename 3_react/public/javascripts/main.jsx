    	class ContactList extends React.Component{
            constructor(props){
                super(props);
				this.state = {studlist: [],
				chtext: 'www',
				fio: 'ФИО'
				};
				
				this.handleChange = this.handleChange.bind(this)
		}


		
            componentDidMount(){
                fetch('/getstlist')
                  .then(res => res.json())
                  .then(json => this.setState({studlist: json}));
            }


				handleChange(event){
					this.setState({chtext: event.target.value});
				}



			render(){
				return(
					<div className="contactlist">
						{this.state.studlist.map((stud) => 
						  <div key = {stud.id_stud} id={stud.id_stud}>
						  <p id={stud.fam + '' + stud.name}value={stud.fam} onClick={this.props.hclick}>{stud.fam + '' + stud.name}</p>
					</div>
					)}



						{this.state.fio}<br />
						{this.state.chtext}<br />
		


			<form>
				<input onChange={this.handleChange}></input>
			</form>
		
					</div>
				)
			}}
		

		class MessegaBox extends React.Component{
			constructor(props){
			
				super(props);
				this.state = {student: 'Эрмеков Давлет'};
				this.Handleprivet = this.Handleprivet.bind(this);
			}


				Handleprivet(){
				alert('Добро пожаловать!!!');
				this.setState({student: 'Божокоев Арзымат'});
			}



			render(){
				return(
					<div className="directlist">
						Hello <br />
						How are yoy? <br />
						Арзымат <br />
						Whatapp <br />
						{this.state.student}<br />
						<button onClick={this.Handleprivet}>Изменить ФИО</button>
						<p>{this.props.message}</p>
					</div>
				)
			}
		}


		class MainComp extends React.Component{
			constructor(props) {
				super(props);
				this.state = {mes: 'Вот прям сюда'}
			}



			handleClick(){
				this.setState  ({mes: event.target.id})
			}



			render(){
				return(
					<div className="mainbox">
				<ContactList hclick={this.handleClick.bind(this)} />
				<MessegaBox message={this.state.mes} />
			</div>
				)
			}
		}



		ReactDOM.render(
			<MainComp />
			,

		document.getElementById("root")
        )
        


