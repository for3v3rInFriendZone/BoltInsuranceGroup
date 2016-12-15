(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.vehicle-modal')
		.controller('VehicleInsuranceController', VehicleInsuranceController);

	VehicleInsuranceController.$inject = ['$scope','localStorageService', '$state', 'InsuranceProgress'];
	function VehicleInsuranceController($scope,localStorageService, $state, InsuranceProgress) {

		var vic = this;
		
		vic.homeCheckBox = localStorageService.cookie.get('homeCheckBox');
		
		vic.next = function(){
			$state.go('payment');
			
		}
		
		vic.back = function(){
			if(vic.homeCheckBox){
				$state.go('homeinsurance');
			}else{
				$state.go('insurance-users');
			}
			
		}
		
		vic.submitForm = function() {
			
			if(vic.form.$invalid) {
				return;
			}
		}
		
		var current = (vic.homeCheckBox)?5:4;
		InsuranceProgress.setCurrent(current);
		
	}
})();