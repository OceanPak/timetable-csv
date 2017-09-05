module.exports = function(input) {
	// timetable structure: nested array
	// outer array: cycle days (A1, B1, 12 in total)
	// middle array: periods (a total of 8, 6 + 2 lunch periods)
	// inner array: the two elements of each period (class name, room)
	// cycle day names are unspecified and therefore agnostic
	var timetableObj = []
	for (var i = 0; i < 12; i++) {
		var dayObj = [];
		for (var j = 0; j < 8; j++) {
			dayObj.push(['', '']);
		}
		timetableObj.push(dayObj);
	}

	// each class is written across two lines: class name, room
	// periods with no classes are represented by empty lines
	// iterate through lines of each day string: if line is empty, then period
	// is free; if not, then populate period fields
	// also check and skip day labels, when 8 period fields is reached

	// manually counting indicies
	// fieldIndex is initialised to 8 to skip the first day label
	// dayIndex is initialised to -1 to account for initial skip of day label
	var dayIndex = -1;
	var fieldIndex = 8;
	var isInsideField = false;

	input.split('\n').forEach(function(field) {
		// if end of a row is reached, then skip following day label and do nothing,
		// and increment dayIndex
		if (fieldIndex >= 8) {
			fieldIndex = 0;
			dayIndex++;
		}
		// if line is empty, then period is empty, nothing is added
		else if (field === '') {
			fieldIndex++;
		}
		// check if isInsideField; assign to either index 0 or 1, and
		// correspondingly increment or do not increment fieldIndex
		else if (!isInsideField) {
			timetableObj[dayIndex][fieldIndex][0] = field;
			isInsideField = true;
		}
		else if (isInsideField) {
			timetableObj[dayIndex][fieldIndex][1] = field;
			isInsideField = false;
			fieldIndex++;
		}
	});

	return timetableObj;
};
