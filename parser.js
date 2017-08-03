function intiRec(str){
	textToBeParsed = str;
	parsed = textToBeParsed.replace(/[^a-z A-Z0-9.$]/g, '');
	parsedArray = parsed.split(' ').map(word => word.toLowerCase());
	console.log('parsed array', parsedArray);
	[prices, priceIndices] = recognizePrices(parsedArray);
	console.log('prices: ', prices);
	console.log('price indices: ', priceIndices);
	document.getElementById("ocr_results")
	.innerText = parsed;
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

function isPrice(price){
	let splitP = price.split('.');
	return splitP.length === 2 && splitP[1].length === 2 && Number(splitP[0]) && price.indexOf('.') !== -1; 
}

function recognizeItems(arr){

}