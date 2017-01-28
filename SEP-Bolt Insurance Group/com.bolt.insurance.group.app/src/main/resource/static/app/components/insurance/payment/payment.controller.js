(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.payment')
		.controller('PaymentInsuranceController', PaymentInsuranceController);

	PaymentInsuranceController.$inject = ['$scope', '$http', 'localStorageService', '$state', 'InsuranceProgress', '$crypto'];
	function PaymentInsuranceController($scope, $http, localStorageService, $state, InsuranceProgress, $crypto) {

		var pic = this;
		
		if(localStorageService.cookie.get('listOfUsers') == null || localStorageService.cookie.get('listOfUsers') == undefined || localStorageService.cookie.get('listOfUsers').length == 0) {
			alert('Your session has been timed out. You will be redirected to home page');
			$state.go('home');
		}
		
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
		$scope.homeArea = localStorageService.cookie.get('homeArea');
		$scope.ageOfHome = localStorageService.cookie.get('ageOfHome');
		$scope.estimatedValueOfHome = localStorageService.cookie.get('estimatedValueOfHome');
		$scope.homeOwnerName = localStorageService.cookie.get('homeOwnerName');
		$scope.homeOwnerSurname = localStorageService.cookie.get('homeOwnerSurname');
		
		if(localStorageService.cookie.get('homeOwnerJmbg') == null || localStorageService.cookie.get('homeOwnerJmbg') == undefined){
			$scope.homeOwnerJmbg = localStorageService.cookie.get('homeOwnerJmbg');
		} else {
			$http.get('https://localhost:8443/insurance/secret')
			.then(function(response) {
				$scope.homeOwnerJmbg = $crypto.decrypt(localStorageService.cookie.get('homeOwnerJmbg'), response.data.secret);
			});
		}
		
		
		$scope.homeAdress = localStorageService.cookie.get('homeAdress');
		$scope.vehicleOwnerName = localStorageService.cookie.get('vehicleOwnerName');
		$scope.vehicleOwnerSurname = localStorageService.cookie.get('vehicleOwnerSurname');
		
		if(localStorageService.cookie.get('vehicleOwnerJmbg') == null || localStorageService.cookie.get('vehicleOwnerJmbg') == undefined){
			$scope.vehicleOwnerJmbg = localStorageService.cookie.get('vehicleOwnerJmbg');
		} else {
			$http.get('https://localhost:8443/insurance/secret')
			.then(function(response) {
				$scope.vehicleOwnerJmbg = $crypto.decrypt(localStorageService.cookie.get('vehicleOwnerJmbg'), response.data.secret);
			});
		}
		
		$scope.vehicleType = localStorageService.cookie.get('vehicleType');
		$scope.vehicleYear = localStorageService.cookie.get('vehicleYear');
		$scope.vehiclePlates = localStorageService.cookie.get('vehiclePlates');
		$scope.vehicleChassis = localStorageService.cookie.get('vehicleChassis');
	
		
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