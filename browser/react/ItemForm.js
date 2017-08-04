import React from 'react';

const ItemForm = (props) =>{
	let receipt = props.receipt;
	let handleChange = props.handleChange;
	return (
		<div>
			{receipt.map(item => {
				return (
					<div><input type='checkbox' name={item} onChange={handleChange} on={false}/>{item}<br/></div>
				)
			})}
		</div>
	)
}

export default ItemForm;