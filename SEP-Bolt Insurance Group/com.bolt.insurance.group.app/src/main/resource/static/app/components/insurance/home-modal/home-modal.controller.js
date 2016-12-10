(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.home-modal')
		.controller('HomeInsuranceController', HomeInsuranceController);

	HomeInsuranceController.$inject = ['$scope','$state','localStorageService','InsuranceProgress'];
	function HomeInsuranceController($scope,$state,localStorageService,InsuranceProgress) {
		
		var hic = this;
		
		hic.roadCheckBox = localStorageService.cookie.get('roadCheckBox');
		
		hic.next = function(){
			
			if(hic.roadCheckBox){
				$state.go('vehicleinsurance');
			}else{
				console.log('payment');
			}
			
		}
		
		hic.back = function(){
			
			$state.go('insurance-users');
			
		}
		
		InsuranceProgress.setCurrent(4);
	}
	
})();