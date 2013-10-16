'use strict';

angular.module('amiampedApp')
  .controller('MainCtrl', function ($scope) {

    $scope.drinks = {};
    $scope.startTime = 0;

    $scope.addDrink = function() {
    	var time = parseInt($scope.time);
    	if($scope.startTime == 0 || $scope.startTime > time)
    		$scope.startTime = time;

		$scope.drinks[time] = parseFloat($scope.caffeine);
		$scope.caffeine = '';
		$scope.time = '';
		$scope.calculateHalfLife();
    };

    $scope.calculateHalfLife = function(){
		//=1/(2^(1/5))*prev + new		
		var time = $scope.startTime;
		var caffeine = $scope.drinks[time];
		$scope.times = [{time: time, caffeine: caffeine}];
		//start at 4 am;
		while(true) {
			time++;
			var newCaff = $scope.drinks[time] || 0;
			caffeine = (caffeine / Math.pow(2, 1/5)) + newCaff;			
			$scope.times.push({time: time, caffeine: caffeine.toFixed(2), bonus: newCaff});
			if(caffeine < 1)
				break;
		}
    };

    //{time: time, amount: amount}
    $scope.times = [];
  });



