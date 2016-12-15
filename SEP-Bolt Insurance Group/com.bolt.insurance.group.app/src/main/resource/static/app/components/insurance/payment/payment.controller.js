(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.payment')
		.controller('PaymentInsuranceController', PaymentInsuranceController);

	PaymentInsuranceController.$inject = ['$scope','localStorageService', '$state', 'InsuranceProgress'];
	function PaymentInsuranceController($scope,localStorageService, $state, InsuranceProgress) {

		var pic = this;
		
		$scope.world = localStorageService.cookie.get('world');
		$scope.money = localStorageService.cookie.get('money');
		$scope.kids = localStorageService.cookie.get('kids');
		$scope.grownups = localStorageService.cookie.get('grownups');
		$scope.olds = localStorageService.cookie.get('olds');
		$scope.dt1 = new Date(parseInt(localStorageService.cookie.get('date1')));
		$scope.dt2 = new Date(parseInt(localStorageService.cookie.get('date2')));
		$scope.sportCheckBox = localStorageService.cookie.get('sportCheckBox');
		$scope.selectedSport = localStorageService.cookie.get('selectedSport');
		$scope.homeCheckBox = localStorageService.cookie.get('homeCheckBox');
		$scope.roadCheckBox = localStorageService.cookie.get('roadCheckBox');
		$scope.towing = localStorageService.cookie.get('towingCheckBox');
		$scope.repair = localStorageService.cookie.get('repairCheckBox');
		$scope.hotel = localStorageService.cookie.get('hotelCheckBox');
		$scope.alternative = localStorageService.cookie.get('alternativeCheckBox');
		$scope.fire = localStorageService.cookie.get('fireCheckBox');
		$scope.flood = localStorageService.cookie.get('floodCheckBox');
		$scope.theft = localStorageService.cookie.get('theftCheckBox');
		$scope.earthshaker = localStorageService.cookie.get('earthshakerCheckBox');
		$scope.amount = parseFloat(localStorageService.cookie.get('amount'));
		$scope.totalPrice = ($scope.amount + $scope.amount*0.2) / 120;
		
		//var current = (vic.homeCheckBox)?5:4;
		InsuranceProgress.setCurrent(6);
		
		pic.back = function() {
			var home = localStorageService.cookie.get('homeCheckBox');
			var road = localStorageService.cookie.get('roadCheckBox');
			
			if(road){
				$state.go('vehicleinsurance');
			}else if(home){
				$state.go('homeinsurance');
			}else{
				$state.go('insurance-users');
			}
		}
		
	}
})();