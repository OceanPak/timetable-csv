module.exports = function(events) {
	var masterstr = '';

	events.forEach(function(event) {
		var eventStr = '';
		event.forEach(function(property) {
			eventStr += property + ',';
		});
		eventStr = eventStr.slice(0, -1);
		masterstr += eventStr + '\n';
	});

	masterstr.slice(0, -1);
	return masterstr;
};
