var dates = [
	'8/29/2016',
	'9/2/2016',
	'9/9/2016',
	'9/23/2016',
	'10/7/2016',
	'10/14/2016',
	'11/4/2016',
	'11/18/2016',
	'12/2/2016',
	'12/9/2016',
	'1/13/2017',
	'1/20/2017',
	'2/10/2017',
	'2/17/2017',
	'3/10/2017',
	'3/24/2017',
	'4/7/2017',
	'4/21/2017'
];

var oDates = [];

dates.forEach(function(d, i, arr) {
	var components = d.split('/');
	var od = new Date(parseInt(components[2]), parseInt(components[0]) - 1, parseInt(components[1]));
	oDates.push(od.valueOf());
});

console.log(oDates);
