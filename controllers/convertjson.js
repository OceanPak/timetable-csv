var jdates = require('./cdates.json');

module.exports = function() {
	var cdates = {};

	// stop-midterm
	var midterm = new Date(2016, 9, 24);

	// start-midterm
	var startMidterm = new Date(2016, 9, 9);

	for (var key in jdates) {
		var timestamps = jdates[key];
		var dates = [];

		for (var i = 0; i < timestamps.length; i++) {
			var d = new Date(timestamps[i]);
			// start-midterm
			if (d.valueOf() > startMidterm.valueOf()) {
				dates.push(d);
			}
		}

		cdates[key] = dates;
	}

	return cdates;
}
