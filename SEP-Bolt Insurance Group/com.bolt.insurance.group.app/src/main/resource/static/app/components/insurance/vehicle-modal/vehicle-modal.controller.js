(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.vehicle-modal')
		.controller('VehicleInsuranceController', VehicleInsuranceController);

	VehicleInsuranceController.$inject = ['$http', '$scope','localStorageService', '$state', 'InsuranceProgress'];
	function VehicleInsuranceController($http, $scope,localStorageService, $state, InsuranceProgress) {

		var vic = this;
		vic.vehicle = {};
		
		vic.homeCheckBox = localStorageService.cookie.get('homeCheckBox');
		vic.vehicle.ownername = localStorageService.cookie.get('vehicleOwnerName');
		vic.vehicle.ownersurname = localStorageService.cookie.get('vehicleOwnerSurname');
		vic.vehicle.ownerjmbg = localStorageService.cookie.get('vehicleOwnerJmbg');
		vic.vehicle.typeofvehicle = localStorageService.cookie.get('vehicleType');
		vic.vehicle.yearofmanufacture = localStorageService.cookie.get('vehicleYear');
		vic.vehicle.licenceplatesnumber = localStorageService.cookie.get('vehiclePlates');
		vic.vehicle.numberofchassis = localStorageService.cookie.get('vehicleChassis');
		vic.vehicle.ownerAddress = localStorageService.cookie.get('ownerAddress');
		vic.vehicle.vehicleBrand = localStorageService.cookie.get('vehicleBrand');
		
		$http.get('https://localhost:8443/vehicleType')
		.then(function(data){
			vic.vehicleTypes = data.data;
		});
		
		vic.next = function(){
			
			if(jmbgValidation(vic.vehicle)) {
				return;
			}
			
			if(vic.form.$invalid) {
				vic.submitted = true;
				return;
			}
			
			localStorageService.cookie.set('vehicleOwnerName', vic.vehicle.ownername, 1, true);
			localStorageService.cookie.set('vehicleOwnerSurname', vic.vehicle.ownersurname, 1, true);
			localStorageService.cookie.set('vehicleOwnerJmbg', vic.vehicle.ownerjmbg, 1, true);
			localStorageService.cookie.set('vehicleType', vic.vehicle.typeofvehicle, 1, true);
			localStorageService.cookie.set('vehicleYear', vic.vehicle.yearofmanufacture, 1, true);
			localStorageService.cookie.set('vehiclePlates', vic.vehicle.licenceplatesnumber, 1, true);
			localStorageService.cookie.set('vehicleChassis', vic.vehicle.numberofchassis, 1, true);
			localStorageService.cookie.set('ownerAddress', vic.vehicle.ownerAddress, 1, true);
			localStorageService.cookie.set('vehicleBrand', vic.vehicle.vehicleBrand, 1, true);
			
			
			$state.go('payment');
		}
		
		vic.back = function(){
			if(vic.homeCheckBox){
				$state.go('homeinsurance');
			}else{
				$state.go('insurance-users');
			}
			
		}
		
		function jmbgValidation(user) {
			vic.invalidJmbg = false;
			if(user == null || user == undefined || user.ownerjmbg == undefined) {
				return;
			}
			
			var jmbg = user.ownerjmbg;
			
			
			/**
			 * This part checks if the last number is valid by defined algorithm.
			 */
			var partsOfJmbg = jmbg.split('');
			for(var i=0; i<partsOfJmbg.length; i++) {
				partsOfJmbg[i] = parseInt(partsOfJmbg[i]);
			}
			
			var s = 7*partsOfJmbg[0] + 6*partsOfJmbg[1] + 5*partsOfJmbg[2] + 4*partsOfJmbg[3] + 3*partsOfJmbg[4] + 2*partsOfJmbg[5] + 7*partsOfJmbg[6] + 6*partsOfJmbg[7] + 5*partsOfJmbg[8] + 4*partsOfJmbg[9] + 3*partsOfJmbg[10] + 2*partsOfJmbg[11];
			var k = s%11;
			if(k === 0) {
				if(partsOfJmbg[12] !== 0) {
					vic.invalidJmbg = true;
				}
			} else if(k === 1) {
				vic.invalidJmbg = true;
			} else if(k > 1) {
				var m = 11 - k;
				if (m !== partsOfJmbg[12]) {
					vic.invalidJmbg = true;
				}
			}
			
			/**
			 * This part checks if days and months are valid
			 */
			var day = parseInt(jmbg.substring(0, 2));
			var month = parseInt(jmbg.substring(2, 4));
			
			if(day < 1 || day > 31) {
				vic.invalidJmbg = true;
			} else if(month < 1 || month > 12) {
				vic.invalidJmbg = true;
			}
			
			return vic.invalidJmbg;
		}
		
		var current = (vic.homeCheckBox)?5:4;
		InsuranceProgress.setCurrent(current);
	}
})();