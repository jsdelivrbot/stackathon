/* SPLITTING BY FOOD */

import React, {Component} from 'react';
import {ParticipantForm} from './index';
import {Link, Redirect} from 'react-router-dom';

class Splitting extends Component {
	constructor(){
		super();
		this.state = {
			redirect : false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e){
		if (this.state[e.target.name] === undefined){
			this.state[e.target.name] = [];
		}
		if (this.state[e.target.name].indexOf(e.target.value) !== -1){
			this.state[e.target.name].splice((this.state[e.target.name]).indexOf(e.target.value));
		} else {
			this.state[e.target.name].push(e.target.value);
		}
	}

	handleSubmit(e){
		e.preventDefault();
		let filteredState = {};
		let myKeys = Object.keys(this.state);
		for (var i of myKeys){
			if (i !== 'redirect'){
				filteredState[i] = this.state[i];
			}
		}
		this.props.addSplitItems(filteredState);
		this.setState({
			redirect : true
		});
	}

	render(){
		let handleSubmit = this.handleSubmit;
		let receipt = this.props.receipt;
		let rKeys = Object.keys(receipt);
		let participants = this.props.participants;
		let handleChange = this.props.handleChange;
		let handleClick = this.handleClick;
		if (this.state.redirect){
			return <Redirect to="/split"/>
		}
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					{rKeys.map(key => {
					return ( 
						<div name={key} key={key}>
							<h3>{receipt[key]} {key}</h3>
							{participants.map(participant => {
								return (
									<div key={participant}><input type='checkbox' name={receipt[key] + " " + key} onClick={handleClick} value={participant}/>{participant}<br/></div>
								)
							})}
						</div>
						)
					})}
					<button type='submit'>Submit</button>
				</form>
			</div>
		)
	}
}

export default Splitting;