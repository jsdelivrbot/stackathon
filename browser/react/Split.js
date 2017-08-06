import React from 'react';

const Split = (props) => {
	let participants = props.participants;
	let final = props.dividedTotal;
	console.log('did I get the final split items? ', final);
	return (
		<div>
			{participants.map(each=><div key={each}><h4>{each} owes you: {final[each]}</h4></div>)}
		</div>
	)
};

export default Split;