var jdates = require('./cdates.json');

module.exports = function() {
	var cdates = {};

	var startMidterm = new Date(2016, 9, 24);

	var endMidterm = new Date(2016, 9, 31);

	var endSem1 = new Date(2017, 0, 11);

	var startSem2 = new Date(2017, 0, 10);

	var endSem2 = new Date(2017, 5, 17);

	for (var key in jdates) {
		var timestamps = jdates[key];
		var dates = [];

		for (var i = 0; i < timestamps.length; i++) {
			var d = new Date(timestamps[i]);
			if (d.valueOf() > startSem2.valueOf() && d.valueOf() < endSem2.valueOf()) {
				dates.push(d);
			}
		}

		cdates[key] = dates;
	}

	return cdates;
}
