import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {HowManyPeople} from './index';

class SubmitReceipt extends Component{

	constructor(){
		super();
		this.state = {
			url : "",
			parsed : null,
			doneParsing : false,
			redirect : false,
			submitted : false
		}
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.runOCR = this.runOCR.bind(this);
	}

	async runOCR(url){
		let result = await Tesseract.recognize(url)
		.progress(function(result) {
			console.log(result["status"] + " (" + (result["progress"] * 100) + "%)")
		})
		.catch(err => console.error('errors: ', err));

		let textToBeParsed = result.text;
		let parsed = textToBeParsed.replace(/[^a-z A-Z0-9.$]/g, '');
		let parsedArray = parsed.split(' ').map(word => word.toLowerCase());
		let sepItems = {};
		let itemList = [];
		parsedArray.forEach(item=>{
			if (!isPrice(item)){itemList.push(item)}
				else {
					sepItems[item] = itemList;
					itemList = [];
				}
			});
		this.setState({
			parsed : sepItems,
			doneParsing: true
		});
		console.log('new state? ', this.state.parsed);
	}

	handleClick(e){
		this.setState({
			submitted : true
		});
		this.runOCR(this.state.url);
	}

	handleChange(e){
		this.state.url = e.target.value;
	}

	handleSubmit(e){
		e.preventDefault();
		this.props.addReceiptItems(this.state.parsedArray);
		this.setState({
			redirect : true
		});
	}

	render(){
		let doneParsing = this.state.doneParsing;
		let submitted = this.state.submitted;
		if (this.state.redirect){
			return <Redirect to="/submit-form"/>
		}
		return (
			<div>
				<fieldset>
					<legend>Receipt</legend>
					<input type="text" id="url" placeholder="Receipt URL" onChange={this.handleChange}/>
					<input type="button" id="go_button" value="Run" onClick={(e)=>this.handleClick(e)}/>
				</fieldset>
				<HowManyPeople addParticipants={this.props.addParticipants}/>
				<form onSubmit={this.handleSubmit}>
					{submitted ? doneParsing ?  <button type='submit' className="btn btn-success">Continue</button> : <p>Currently scanning your receipt...</p> : null }
				</form>
			</div>
		)
	}
}

function isPrice(item){
	let itemSplit = item.split('.');
	return item.indexOf('.') !== -1 && itemSplit.length === 2 && itemSplit[1].length === 2 && Number(itemSplit[0])!== NaN;
}

function recognizePrices(arr){
	let fin = [];
	let finInd = [];
	for (let i in arr){
		let val = arr[i];
		if (val.indexOf('.') !== -1){
			let testArr = val.split('.');
			if (testArr.length === 2 && testArr[1].length === 2 && Number(testArr[0])){
				fin.push(Number(val));
				finInd.push(Number(i));
			}
		}
	}
	return [fin, finInd];
}

export default SubmitReceipt;