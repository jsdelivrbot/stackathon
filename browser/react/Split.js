import React from 'react';

const Split = (props) => {
	let participants = props.participants;
	let final = props.dividedTotal;
	return (
		<div>
			{participants.map(each=><div><h4>{each} owes you: {final[each]}</h4></div>)}
		</div>
	)
};

export default Split;