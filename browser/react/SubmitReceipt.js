import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {HowManyPeople} from './index';

class SubmitReceipt extends Component{

	constructor(){
		super();
		this.state = {
			url : "",
			parsed : null
		}
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmibt = this.handleSubmit.bind(this);
		this.runOCR = this.runOCR.bind(this);
		// this.recognizePrices = this.recognizePrices.bind(this);
	}

	runOCR(url){
		let textToBeParsed; 
		Tesseract.recognize(url)
		.then(function(result) {
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
			// parsedArray.forEach(item=>console.log('Is it a price? ', isPrice(item)));
			// document.getElementById("ocr_results")
			// .innerText = parsed;
		})
		.progress(function(result) {
			// document.getElementById("ocr_status")
			// .innerText = result["status"] + " (" + (result["progress"] * 100) + "%)";
			console.log(result["status"] + " (" + (result["progress"] * 100) + "%)")
		})
		.catch(err => console.error('errors: ', err))
		.then(res => console.log('result: ', res));
		return textToBeParsed;
	}

	handleClick(e){
		this.runOCR(this.state.url);
	}

	handleChange(e){
		this.state.url = e.target.value;
		console.log(this.state.url)
	}

	handleSubmit(e){

	}

	render(){
		return (
			<div>
					<fieldset>
						<legend>Receipt</legend>
						<input type="text" id="url" placeholder="Receipt URL" onChange={this.handleChange}/>
						<Link to='/submit-form'><input type="button" id="go_button" value="Run" onClick={(e)=>this.handleClick(e)}/></Link>
					</fieldset>
					<HowManyPeople />
					<button type='submit' className='btn btn-success'>Submit</button>
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