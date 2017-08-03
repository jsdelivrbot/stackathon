import React, {Component} from 'react';

class SubmitReceipt extends Component{

	constructor(){
		super();
		this.state = {
			url : "",
			parsed : []
		}
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
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
			console.log('parsed array', parsedArray);
			let res = recognizePrices(parsedArray);
			console.log('prices: ', res[0]);
			console.log('price indices: ', res[1]);
			// document.getElementById("ocr_results")
			// .innerText = parsed;
			console.log('hello', parsed);
		})
		.progress(function(result) {
			// document.getElementById("ocr_status")
			// .innerText = result["status"] + " (" + (result["progress"] * 100) + "%)";
			console.log(result["status"] + " (" + (result["progress"] * 100) + "%)")
		})
		.catch(err => console.error(err))
		.then(res => console.log(res));
		return textToBeParsed;
	}

	handleClick(e){
		let res = this.runOCR(this.state.url);
	}

	handleChange(e){
		this.state.url = e.target.value;
		console.log(this.state.url)
	}

	render(){
		return (
			<div>
			<input type="text" id="url" placeholder="Image URL" onChange={this.handleChange}/>
			<input type="button" id="go_button" value="Run" onClick={(e)=>this.handleClick(e)}/>
			</div>
			)
	}
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