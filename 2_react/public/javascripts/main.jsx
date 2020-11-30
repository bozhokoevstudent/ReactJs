    	class ContactList extends React.Component{
            constructor(props){
                super(props);
                this.state = {studlist: []}
            }

            componentDidMount(){
                fetch('/getstlist')
                  .then(res => res.json())
                  .then(json => this.setState({studlist: json}));
            }

			render(){
				return(
					<div className="contactlist">
						{this.state.studlist.map((stud) => 
						  <div key = {stud.id_stud} id={stud.id_stud}>
						  <p id={stud.id_stud}>{stud.fam + '' + stud.name}</p>
					</div>
					)}
					</div>
				)
			}
		}
		class MessegaBox extends React.Component{
			render(){
				return(
					<div className="directlist">
						Hello <br />
						How are yoy? <br />
						Арзымат <br />
						Whatapp <br />
					</div>
				)
			}
		}

		ReactDOM.render(
			<div className="mainbox">
				<ContactList />
				<MessegaBox />
			</div>
			,

		document.getElementById("root")
        )
        


