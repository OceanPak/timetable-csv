module.exports = function(jdates) {
	var cdates = {};

	for (var key in jdates) {
		var timestamps = jdates[key];
		var dates = [];

		for (var i = 0; i < timestamps.length; i++) {
			dates.push(new Date(timestamps[i]));
		}

		cdates[key] = dates;
	}

	return cdates;
}
