var tesseract = require('node-tesseract');

tesseract.process('test.png',function(err, text) {
	if(err) {
		console.error(err);
	} else {
		console.log(text);
	}
});

var options = {
    l: 'eng',
    psm: 6,
    binary: '/usr/local/bin/tesseract'
};