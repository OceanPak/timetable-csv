var fs = require('fs');

var input = process.argv[2];
var output = '[\n\t';

input.split('\n').slice(1).forEach(function(str) {
	if (str === '') {
		return;
	}
	var line = str.split(',');
	var nums = line[1].split('/');
	var dateStr = nums[1] + '/' + nums[0] + '/' + nums[2];
	output += Date.parse(dateStr).toString() + ',\n\t';
});

output = output.slice(0, -3);
output += '\n]';

fs.writeFile('choices.json', output, function(err) {
	if (err) {
		return console.log(err);
	}
});
