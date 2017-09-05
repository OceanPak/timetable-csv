module.exports = function(input) {
	// timetable structure: nested array
	// outer array: cycle days (A1, B1, 12 in total)
	// middle array: periods (a total of 8, 6 + 2 lunch periods)
	// inner array: the two elements of each period (class name, room)
	// cycle day names are unspecified and therefore agnostic
	var timetableObj = []
	for (var i = 0; i < 12; i++) {
		var dayObj = [];
		for (var j = 0; j < 6; j++) {
			dayObj.push(['', '', '']);
		}
		timetableObj.push(dayObj);
	}

	// each class is written across three lines: class name, teacher, room
	// periods with no classes are represented by two consecutive empty lines
	// iterate through lines of each day string: if two lines are empty, then period
	// is free; if not, then populate period fields
	// also check and skip day labels, when 6 period fields is reached

	// manually counting indicies
	// fieldIndex is initialised to 6 to skip the first day label
	// dayIndex is initialised to -1 to account for initial skip of day label
	var dayIndex = -1;
	var fieldIndex = 6;
	var fieldLineCounter = 0;
	var isInsideFree = false;

	input.split('\n').forEach(function(field) {
		// if end of a row is reached, then skip following day label and do nothing,
		// and increment dayIndex
		if (fieldIndex >= 6) {
			fieldIndex = 0;
			dayIndex++;
		}
		// if line is empty and not currently inside a field, then check whether
		// isInsideFree and increment fieldIndex accordingly
		else if (field === '' && fieldLineCounter == 0) {
			if (isInsideFree) {
				fieldIndex++;
			}
			isInsideFree = !isInsideFree;
		}
		// else, loop is inside a multiline period
		// use fieldLineCounter to determine which index to populate
		// if end of period is reached, reset fieldLineCounter and increment fieldIndex
		else {
			timetableObj[dayIndex][fieldIndex][fieldLineCounter] = field;
			fieldLineCounter++;
			if (fieldLineCounter > 2) {
				fieldLineCounter = 0;
				fieldIndex++;
			}
		}
	});

	return timetableObj;
};
