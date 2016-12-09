(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.home-modal')
		.controller('HomeInsuranceController', HomeInsuranceController);

	HomeInsuranceController.$inject = ['$scope','$state','localStorageService'];
	function HomeInsuranceController($scope,$state,localStorageService) {
		
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
	}
	
})();