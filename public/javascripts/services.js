angular.module('timetableCsv')

	.factory('scheduleFormFactory', ['$http', function($http) {
		var o = {};

		o.post = function(body, callback) {
			$http.post('/getcsv', body).then(function(res) {
				callback(res, null);
			}, function(err) {
				callback(null, err);
			});
		};

		return o;
	}])
;
