import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {HowManyPeople} from './index';

class SubmitReceipt extends Component{

	constructor(){
		super();
		this.state = {
			url : "",
			parsed : null,
			doneParsing : false,
			redirect : false,
			submitted : false,
			participantsSubmitted: false
		}
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.runOCR = this.runOCR.bind(this);
		this.submitted = this.submitted.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async runOCR(url){
		let result = await Tesseract.recognize(url)
		.progress(function(result) {
			console.log(result["status"] + " (" + (result["progress"] * 100) + "%)")
		})
		.catch(err => alert('Error: ', err));

		let parsed = result.text.replace(/[^a-z A-Z0-9.$]/g, '');
		let removeWhiteSpace = parsed.replace(/\s+/g, '');
		let parsedArray = parser(removeWhiteSpace)
		let sepItems = {};
		let itemList = [];
		parsedArray.forEach(item=>{
			if (!isPrice(item)){
				if (item.length > 25){itemList.push(item.substring(item.length - 25), item.length)}
				else {itemList.push(item)}
			} 
			else {
				sepItems[item] = itemList;
				itemList = [];
			}
		});
		this.setState({
			parsed : sepItems,
			doneParsing: true
		});
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
		this.props.addReceipt(this.state.parsed);
		this.setState({
			redirect : true
		});
	}

	submitted(){
		this.setState({
			participantsSubmitted : true
		});
	}

	render(){
		let doneParsing = this.state.doneParsing;
		let submitted = this.state.submitted;
		let pSubmitted = this.state.participantsSubmitted;
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
				{!pSubmitted ? <HowManyPeople addParticipants={this.props.addParticipants} submitted={this.submitted}/> : <p>Participants successfully submitted</p> }
				<form onSubmit={this.handleSubmit}>
					{submitted ? doneParsing ? !pSubmitted ? <p>Please submit participants!</p> : <button type='submit' className="btn btn-success">Continue</button> : <p>Currently scanning your receipt...</p> : null }
				</form>
			</div>
		)
	}
}

function isPrice(item){
	let itemSplit = item.split('.');
	return item.indexOf('.') !== -1 && itemSplit.length === 2 && itemSplit[1].length === 2 && Number(itemSplit[0])!== NaN;
}

function findPrices(str){
  return str.match(/\$((?:\d|\,)*\.?\d+)/g) || [];
}

function interpolatePrice(price){
  if (price.indexOf('$')!==-1){
    price = price.substring(0, price.indexOf('$')) + price.substring(price.indexOf('$')+1, price.length);
  }
  if (price.indexOf('.') === -1){
    return price.substring(0, price.length -2) + '.' + price.substring(price.length-2, price.length);
  } 
  return price;
}

function parser(str){
  let priceArray = findPrices(str);
  let finArr = [];
  for (let price of priceArray){
    let temp = str.split(price);
    price = interpolatePrice(price);
    finArr.push(temp[0], price);
    str = temp[1]
  }
  return finArr;
}



export default SubmitReceipt;