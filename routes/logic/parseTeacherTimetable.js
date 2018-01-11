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
	var atEndOfPeriod = false;

	input.split('\n').forEach(function(field) {
		// if end of a row is reached, then skip following day label and do nothing,
		// and increment dayIndex
		if (fieldIndex >= 8) {
			fieldIndex = 0;
			dayIndex++;
		}
		// if atEndOfPeriod, skip
		else if (atEndOfPeriod) {
			atEndOfPeriod = false;
			return;
		}
		// if line is empty, then period is empty, nothing is added
		else if (field === '') {
			fieldIndex++;
			atEndOfPeriod = true;
		}
		// check if isInsideField; assign to either index 0 or 1, and
		// correspondingly increment or do not increment fieldIndex
		else if (!isInsideField) {
			timetableObj[dayIndex][fieldIndex][0] = field;
			isInsideField = true;
		}
		else if (isInsideField) {
			// special case 1: if period is a combined HL/SL class, three lines are used
			// check for the special case, do not increment fieldIndex if it is
			// special case 2: if period is a combined French/Spanish class, three lines are used
			// check for the special case, do not increment fieldIndex if it is
			if (isHLSL(timetableObj[dayIndex][fieldIndex][0], field)) {
				timetableObj[dayIndex][fieldIndex][0] = mergeHLSL(timetableObj[dayIndex][fieldIndex][0], field);
			} else if (isFrSp(timetableObj[dayIndex][fieldIndex][0], field)) {
				timetableObj[dayIndex][fieldIndex][0] = mergeFrSp(timetableObj[dayIndex][fieldIndex][0], field);
			} else {
				timetableObj[dayIndex][fieldIndex][1] = field;
				isInsideField = false;
				atEndOfPeriod = true;
				fieldIndex++;
			}
		}
	});

	return timetableObj;
};

function isHLSL(previousStr, currentStr) {
	// automatically false if strings are not equal in length
	if (previousStr.length != currentStr.length) {
		return false;
	}

	var numOfDifferentChars = 0;

	// iterate through each character, counting how many are different
	for (var i = 0; i < previousStr.length; i++) {
		if (previousStr[i] !== currentStr[i]) {
			numOfDifferentChars++;
		}
	}

	// needs to be only 1 different character
	if (numOfDifferentChars == 1) {
		return true;
	} else {
		return false;
	}
}

function mergeHLSL(hl, sl) {
	var indexOfDifference;

	for (var i = 0; i < hl.length; i++) {
		if (hl[i] !== sl[i]) {
			indexOfDifference = i;
			break;
		}
	}

	return hl.substring(0, indexOfDifference) + 'HL/SL' + hl.substring(indexOfDifference + 2);
}

function isFrSp(previousStr, currentStr) {
	// automatically false if strings are not equal in length
	if (previousStr.length != currentStr.length) {
		return false;
	}

	pSplit = previousStr.split(' ');
	cSplit = previousStr.split(' ');

	var pass = true;

	// all words except the second word should be the same
	for (var i = 0; i < pSplit.length; i++) {
		if (i != 1 && pSplit[i] !== cSplit[i]) {
			pass = false;
		}
	}

	return pass;
}

function mergeFrSp(fr, sp) {
	var indexOfDifference;

	for (var i = 0; i < fr.length; i++) {
		if (fr[i] !== sp[i]) {
			indexOfDifference = i;
			break;
		}
	}

	return fr.substring(0, indexOfDifference) + 'Fren/Span' + fr.substring(indexOfDifference + 4);
}
