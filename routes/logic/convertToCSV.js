module.exports = function(events) {
	var masterstr = '';

	events.forEach(function(event) {
		masterstr += event.toString() + '\n';
	});

	masterstr.slice(0, -1);
	return masterstr;
};
