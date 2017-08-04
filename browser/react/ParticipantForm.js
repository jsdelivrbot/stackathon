import React from 'react';

const ParticipantForm = (props) =>{
	let participants = props.participants;
	let handleChange = props.handleChange;
	return (
		<div>
			{participants.map(participant => {
				return (
					<div><input type='checkbox' name={participant} onChange={handleChange} on={false}/>{participant}<br/></div>
				)
			})}
		</div>
	)
}

export default ParticipantForm;