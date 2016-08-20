angular.module('timetableCsv')

	.controller('ScheduleFormCtrl', ['$scope', 'scheduleFormFactory', function($scope, scheduleFormFactory) {
		var inputIdCount = 0;

		$scope.cycledays = '';
		$scope.timetable = '';
		$scope.activityInputs = [{id: inputIdCount, day: '', startPeriod: '', endPeriod: ''}];

		$scope.addActivityInput = function() {
			inputIdCount++;
			$scope.activityInputs.push({id: inputIdCount, day: '', startPeriod: '', endPeriod: ''});
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
				activities: $scope.activityInputs
			};

			scheduleFormFactory.post(body, function(data) {
				console.log(data);
			});
		};

		var validate = function() {
			for (var i = 0; i < $scope.activityInputs.length; i++) {
				var input = $scope.activityInputs[i];

				if (input.day == '' || input.startPeriod == '' || input.endPeriod == '') {
					return 'Please fill in all the fields for each of your activities.';
				} else if (parseInt(input.startPeriod) > parseInt(input.endPeriod)) {
					return 'Please make sure that all your activies end after they start.';
				}
			}

			return 0;
		};
	}])
;
