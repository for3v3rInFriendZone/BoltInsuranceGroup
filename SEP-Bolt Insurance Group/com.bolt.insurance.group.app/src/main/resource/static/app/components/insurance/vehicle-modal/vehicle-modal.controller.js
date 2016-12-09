(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.vehicle-modal')
		.controller('VehicleInsuranceController', VehicleInsuranceController);

	VehicleInsuranceController.$inject = ['$scope','localStorageService','$state'];
	function VehicleInsuranceController($scope,localStorageService,$state) {

		var vic = this;
		
		vic.homeCheckBox = localStorageService.cookie.get('homeCheckBox');
		
		vic.next = function(){
			
			console.log("payment");
			
		}
		
		vic.back = function(){
			if(vic.homeCheckBox){
				$state.go('homeinsurance');
			}else{
				$state.go('insurance-users');
			}
			
		}
		
		
	}
})();