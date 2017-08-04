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

// function recognizeItems(arr){

// }

// input : {9: [1, 2, 3], 6: [1,3, 2], 3: [3], 4: [2,1 ,3]}
// output : { '1': 6.333333333333333, '2': 6.333333333333333, '3': 9.333333333333332 }
// function divideTotal(items){
// 	let divided = {};
// 	for (let i of Object.keys(items)){
// 	  for (let j of items[i]){
// 	    if (!divided[j]){
// 	      divided[j] = 0;
// 	    }
// 	    divided[j]+= Number(i)/parseFloat(items[i].length);
// 	  }
// 	}
// 	return divided;
// };