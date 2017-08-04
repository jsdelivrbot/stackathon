import React, {Component} from 'react';

class HowManyPeople extends Component{
	constructor(){
		super()
		this.state = {
			inputValue : '',
			edited : false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name] : e.target.value
		});
		console.log(this.state)
	}

	handleSubmit(e){
		e.preventDefault();
		let participants = [];
		Object.keys(this.state).forEach((key) => {
			if (key!=='inputValue'&& key!== 'edited'){
				participants.push(this.state[key])
			}
		});
		this.props.addParticipants(participants);
		this.setState({
			inputValue: '',
			edited: false
		});
	}

	render(){
		let num = Number(this.state.inputValue);
		let numArr = [...Array(num).keys()];
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
				<fieldset>
					<legend>Split-{this.state.inputValue}-Ways</legend>
					<div className='form-group'>
						<label htmlFor='how-many' name='how-many'>X </label>
						<input type='text' name='inputValue' value={this.state.inputValue} onChange={this.handleChange} />
						{numArr.map((each)=><div key={each}><label>Person {each + 1}: </label><input type='text' name={each} placeholder={each+1} onChange={this.handleChange}/></div>)}
					</div>
					<button type='submit'>Submit</button>
				</fieldset>
				</form>
			</div>
		)
	}
}

export default HowManyPeople;