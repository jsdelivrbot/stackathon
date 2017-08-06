import React from 'react';

const Split = (props) => {
	let participants = props.participants;
	let final = props.dividedTotal;
	return (
		<div>
			{participants.map(each=><div key={each}><h4>{each} owes you: {(final[each]) ? final[each] : 0}</h4></div>)}
		</div>
	)
};

export default Split;