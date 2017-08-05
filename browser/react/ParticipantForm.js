import React, {Component} from 'react';

const ParticipantForm = (props) =>{
	let participants = props.participants;
	let handleClick = props.handleClick;
	return (
		<div>
			{participants.map(participant => {
				return (
					<div key={participant}><input type='checkbox' name={participant} onClick={handleClick} />{participant}<br/></div>
				)
			})}
		</div>
	)
}

// class ParticipantForm extends Component {
// 	constructor(){
// 		super();
// 		this.state = {

// 		};
// 	}

// 	render(){
// 		let participants = this.props.participants;
// 		let handleClick = this.props.handleClick;
// 		return (
// 			<div>
// 				{participants.map(participant => {
// 					return (
// 						<div key={participant}><input type='checkbox' name={participant} onClick={handleClick} />{participant}<br/></div>
// 					)
// 				})}
// 			</div>
// 		)
// 	}
// }

export default ParticipantForm;