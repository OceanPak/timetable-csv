var jdates = require('./cdates.json');

module.exports = function() {
	var cdates = {};

	// stop-midterm
	var midterm = new Date(2016, 9, 24);

	// start-midterm
	var startMidterm = new Date(2016, 10, 1);

	// end-sem1
	var endSem1 = new Date(2017, 0, 10);

	for (var key in jdates) {
		var timestamps = jdates[key];
		var dates = [];

		for (var i = 0; i < timestamps.length; i++) {
			var d = new Date(timestamps[i]);
			// start-midterm
			if (d.valueOf() > startMidterm.valueOf() && d.valueOf() < endSem1.valueOf()) {
				dates.push(d);
			}
		}

		cdates[key] = dates;
	}

	return cdates;
}
