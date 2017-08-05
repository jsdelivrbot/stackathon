// /* SPLITTING BY PERSON */

// import React, {Component} from 'react';
// import {ItemForm} from './index';
// import {Link} from 'react-router-dom';

// const Splitting = (props) =>{
// 	let receiptItems = props.receipt;
// 	let participants = props.participants;
// 	let handleChange = props.handleChange;
// 	let handleClick = props.handleClick;
// 	return (
// 		<div>
// 			<form>
// 			{participants.map(each => {
// 			return ( 
// 				<div>
// 					<h3>{each}</h3>
// 					<ItemForm receipt={receiptItems} handleChange={handleChange}/>
// 				</div>
// 				)
// 			})}
// 				<Link to='/split'><input type='button' value='Submit' onClick={handleClick}/></Link>
// 			</form>
// 		</div>
// 	)
// };

// export default Splitting;

/* SPLITTING BY FOOD */

import React, {Component} from 'react';
import {ParticipantForm} from './index';
import {Link} from 'react-router-dom';

const Splitting = (props) =>{
	let receiptItems = props.receipt;
	let participants = props.participants;
	let handleChange = props.handleChange;
	let handleClick = props.handleClick;
	let handleSubmit = props.handleSubmit;
	console.log('received participants: ', participants);
	return (
		<div>
			<form onSubmit={handleSubmit}>
			{receiptItems.map(each => {
			return ( 
				<div>
					<h3>{each}</h3>
					<ParticipantForm participants={participants} handleChange={handleChange}/>
				</div>
				)
			})}
				<Link to='/split'><input type='submit' value='Submit'/></Link>
			</form>
		</div>
	)
};

export default Splitting;