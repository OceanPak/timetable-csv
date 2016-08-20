module.exports = function(timetable, cdates) {
  var periodtimes = [
    ['07:55:00', '09:15:00'],
    ['09:20:00', '10:35:00'],
    ['10:40:00', '11:05:00'],
    ['11:05:00', '11:30:00'],
    ['11:35:00', '12:50:00'],
    ['13:45:00', '15:00:00']
  ];

  var raw = timetable.split('\n');

  var splitday = [];

  var c = 0;
  for (var i = 1; i < raw.length; i++) {
    if (raw[i].indexOf('\t') > -1) {
      splitday.push(raw.slice(c, i));
      c = i;
    }
  }
  splitday.push(raw.slice(c, raw.length));

  var masterstr = '';
  masterstr += 'Subject,Start Date,Start Time,End Date,End Time,Location,Description,All Day Event\n';

  for (i = 0; i < splitday.length; i++) {
    var day = splitday[i];

		var sday = day[0].split(' ')[1].slice(0, 2);

    var dates = cdates[sday];

		for (var j = 0; j < dates.length; j++) {
			var d = dates[j];

			var subject = 'Day ' + sday;
			var startDate = '' + (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
			var startTime = '';
			var endDate = startDate;
			var endTime = '';
			var location = '';
			var description = '';
			var allDayEvent = 'True';

			var s = subject + ',' + startDate + ',' + startTime + ',' + endDate + ',' + endTime + ',' + location + ',' + description + ',' + allDayEvent + '\n';
			masterstr += s;
		}

    day.splice(0, 1);

    var classes = [];

    var k = 0;
    for (j = 0; j < 6; j++) {
      if (day[k] != '') {
        classes[j] = day.slice(k, k + 3);
        k += 3;
      } else {
        k += 2;
      }
    }

    for (j = 0; j < dates.length; j++) {
      for (k = 0; k < classes.length; k++) {
        var d = dates[j];
        var c = classes[k];

        if (c != undefined) {
          var subject = c[0];
          var startDate = '' + (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
          var startTime = periodtimes[k][0];
          var endDate = startDate;
          var endTime = periodtimes[k][1];
          var location = c[2];
          var description = c[1];
					var allDayEvent = 'False';

          var s = subject + ',' + startDate + ',' + startTime + ',' + endDate + ',' + endTime + ',' + location + ',' + description + ',' + allDayEvent + '\n';
          masterstr += s;
        }
      }
    }
  }

  return masterstr;
};
