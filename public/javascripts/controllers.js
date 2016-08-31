angular.module('timetableCsv')

	.controller('ScheduleFormCtrl', ['$scope', 'scheduleFormFactory', function($scope, scheduleFormFactory) {
		var inputIdCount = 0;

		$scope.cycledays = '';
		$scope.timetable = '';
		$scope.role = '';
		$scope.activityInputs = [];

		$scope.addActivityInput = function() {
			inputIdCount++;
			$scope.activityInputs.push({id: inputIdCount, name: '', location: '', day: '', startPeriod: '', endPeriod: ''});
		};

		$scope.removeActivityInput = function(id) {
			for (var i = 0; i < $scope.activityInputs.length; i++) {
				if ($scope.activityInputs[i].id == id) {
					$scope.activityInputs.splice(i, 1);
					return;
				}
			}
		};

		$scope.submit = function() {
			$scope.message = '';
			var message = validate();

			if (message) {
				$scope.message = message;
				return;
			}

			var body = {
				cycledays: $scope.cycledays,
				timetable: $scope.timetable,
				activities: $scope.activityInputs,
				role: $scope.role
			};

			scheduleFormFactory.post(body, function(data, err) {
				if (err) {
					$scope.message = 'An error has occurred! Please make sure your copy/pasting matches the screenshot exactly.';
					return;
				}
				var blob = new Blob([data.data], {type: 'text/csv'});
				var objectUrl = URL.createObjectURL(blob);
				window.open(objectUrl);
			});
		};

		var validate = function() {
			if ($scope.role == '') {
				return 'Please identify your role.';
			}

			for (var i = 0; i < $scope.activityInputs.length; i++) {
				var input = $scope.activityInputs[i];

				if (input.name == '' || input.day == '' || input.startPeriod == '' || input.endPeriod == '') {
					return 'Please fill in all the fields (except location, which is optional) for each of your activities.';
				} else if (parseInt(input.startPeriod) > parseInt(input.endPeriod)) {
					return 'Please make sure that all your activies end after they start.';
				}
			}

			return 0;
		};
	}])
;
