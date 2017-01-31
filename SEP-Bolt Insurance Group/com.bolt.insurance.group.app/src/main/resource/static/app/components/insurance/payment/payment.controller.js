(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.payment')
		.controller('PaymentInsuranceController', PaymentInsuranceController);


	PaymentInsuranceController.$inject = [ '$http', 'localStorageService', '$state', 'InsuranceProgress', '$crypto'];
	function PaymentInsuranceController( $http, localStorageService, $state, InsuranceProgress, $crypto) {

		var pic = this;
		
		if(localStorageService.cookie.get('listOfUsers') == null || localStorageService.cookie.get('listOfUsers') == undefined || localStorageService.cookie.get('listOfUsers').length == 0) {
			alert('Your session has been timed out. You will be redirected to home page');
			$state.go('home');
		}
		
		pic.world = localStorageService.cookie.get('world');
		pic.money = localStorageService.cookie.get('money');
		pic.kids = localStorageService.cookie.get('kids');
		pic.grownups = localStorageService.cookie.get('grownups');
		pic.olds = localStorageService.cookie.get('olds');
		pic.dt1 = new Date(parseInt(localStorageService.cookie.get('date1')));
		pic.dt2 = new Date(parseInt(localStorageService.cookie.get('date2')));
		pic.sportCheckBox = localStorageService.cookie.get('sportCheckBox');
		pic.selectedSport = localStorageService.cookie.get('selectedSport');
		pic.homeCheckBox = localStorageService.cookie.get('homeCheckBox');
		pic.roadCheckBox = localStorageService.cookie.get('roadCheckBox');
		pic.towing = localStorageService.cookie.get('towingCheckBox');
		pic.repair = localStorageService.cookie.get('repairCheckBox');
		pic.hotel = localStorageService.cookie.get('hotelCheckBox');
		pic.alternative = localStorageService.cookie.get('alternativeCheckBox');
		pic.fire = localStorageService.cookie.get('fireCheckBox');
		pic.flood = localStorageService.cookie.get('floodCheckBox');
		pic.theft = localStorageService.cookie.get('theftCheckBox');
		pic.earthshaker = localStorageService.cookie.get('earthshakerCheckBox');
		pic.amount = parseFloat(localStorageService.cookie.get('amount'));
		pic.totalPrice = (pic.amount + pic.amount*0.2) / 120;
		pic.homeArea = localStorageService.cookie.get('homeArea');
		pic.ageOfHome = localStorageService.cookie.get('ageOfHome');
		pic.estimatedValueOfHome = localStorageService.cookie.get('estimatedValueOfHome');
		pic.homeOwnerName = localStorageService.cookie.get('homeOwnerName');
		pic.homeOwnerSurname = localStorageService.cookie.get('homeOwnerSurname');
		
		if(localStorageService.cookie.get('homeOwnerJmbg') == null || localStorageService.cookie.get('homeOwnerJmbg') == undefined){
			pic.homeOwnerJmbg = localStorageService.cookie.get('homeOwnerJmbg');
		} else {
			$http.get('https://localhost:8443/insurance/secret')
			.then(function(response) {
				pic.homeOwnerJmbg = $crypto.decrypt(localStorageService.cookie.get('homeOwnerJmbg'), response.data.secret);
			});
		}
		
		
		pic.homeAdress = localStorageService.cookie.get('homeAdress');
		pic.vehicleOwnerName = localStorageService.cookie.get('vehicleOwnerName');
		pic.vehicleOwnerSurname = localStorageService.cookie.get('vehicleOwnerSurname');
		
		if(localStorageService.cookie.get('vehicleOwnerJmbg') == null || localStorageService.cookie.get('vehicleOwnerJmbg') == undefined){
			pic.vehicleOwnerJmbg = localStorageService.cookie.get('vehicleOwnerJmbg');
		} else {
			$http.get('https://localhost:8443/insurance/secret')
			.then(function(response) {
				pic.vehicleOwnerJmbg = $crypto.decrypt(localStorageService.cookie.get('vehicleOwnerJmbg'), response.data.secret);
			});
		}
		
		pic.vehicleType = localStorageService.cookie.get('vehicleType');
		pic.vehicleYear = localStorageService.cookie.get('vehicleYear');
		pic.vehiclePlates = localStorageService.cookie.get('vehiclePlates');
		pic.vehicleChassis = localStorageService.cookie.get('vehicleChassis');

	
		
	
		
		var current = (pic.homeCheckBox && pic.roadCheckBox)?6:
			(!pic.homeCheckBox && !pic.roadCheckBox)?4:5;
		
		
		InsuranceProgress.setCurrent(current);
		
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