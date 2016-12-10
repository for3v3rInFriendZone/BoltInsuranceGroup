(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.vehicle-modal')
		.controller('VehicleInsuranceController', VehicleInsuranceController);

	VehicleInsuranceController.$inject = ['$scope','localStorageService','$state','InsuranceProgress'];
	function VehicleInsuranceController($scope,localStorageService,$state,InsuranceProgress) {

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
		
		var current = (vic.homeCheckBox)?5:4;
		InsuranceProgress.setCurrent(current);
		
	}
})();