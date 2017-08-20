var fs = require('fs');

var input = process.argv[2];
var output = '{\n\t'

input.split('\n').forEach(function(str) {
	var cycleDayStr = str.substr(4, 2);
	var datesStr = str.substr(6);

	output += '\"' + cycleDayStr + '\": [\n\t\t'

	datesStr.split('   ').forEach(function(dayStr) {
		if (dayStr === '') {
			return;
		}

		var dayStrWithYear = dayStr.substr(4);

		if (new Date(Date.parse(dayStr)).getMonth() > 6) {
			dayStrWithYear += ' 2017';
		} else {
			dayStrWithYear += ' 2018';
		}

		output += Date.parse(dayStrWithYear).toString() + ',\n\t\t'
	});

	output = output.slice(0, -4);
	output += '\n\t],\n\t'
});

output = output.slice(0, -3);
output += '\n}';

fs.writeFile('cdates.json', output, function(err) {
	if (err) {
		return console.log(err);
	}
});
