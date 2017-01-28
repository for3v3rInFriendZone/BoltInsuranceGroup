(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.home-modal')
		.controller('HomeInsuranceController', HomeInsuranceController);

	HomeInsuranceController.$inject = [ '$state', 'localStorageService', 'InsuranceProgress'];
	function HomeInsuranceController( $state, localStorageService, InsuranceProgress) {
		
		var hic = this;
		hic.next = next;
		hic.removeErrors = removeErrors;
		
		hic.roadCheckBox = localStorageService.cookie.get('roadCheckBox');
		
		function next(){
			if(jmbgValidation(hic.home)) {
				return;
			}
			
			if(hic.form.$invalid) {
				hic.submitted = true;
				return;
			}
			
			localStorageService.cookie.set('homeOwnerName', hic.home.ownername, 1, true);
			localStorageService.cookie.set('homeOwnerSurname', hic.home.ownersurname, 1, true);
			localStorageService.cookie.set('homeOwnerJmbg', hic.home.ownerjmbg, 1, true);
			localStorageService.cookie.set('homeAdress', hic.home.address, 1, true);
			
			if(hic.roadCheckBox){
				$state.go('vehicleinsurance');
			}else{
				$state.go('payment');
			}
			
		}
		
		hic.back = function(){
			
			$state.go('insurance-users');
			
		};
		
		function jmbgValidation(user) {
			hic.invalidJmbg = false;
			if(user === null || user === undefined || user.ownerjmbg === undefined) {
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
					hic.invalidJmbg = true;
				}
			} else if(k === 1) {
				hic.invalidJmbg = true;
			} else if(k > 1) {
				var m = 11 - k;
				if (m !== partsOfJmbg[12]) {
					hic.invalidJmbg = true;
				}
			}
			
			/**
			 * This part checks if days and months are valid
			 */
			var day = parseInt(jmbg.substring(0, 2));
			var month = parseInt(jmbg.substring(2, 4));
			
			if(day < 1 || day > 31) {
				hic.invalidJmbg = true;
			} else if(month < 1 || month > 12) {
				hic.invalidJmbg = true;
			}
			
			return hic.invalidJmbg;
		}
		
		function removeErrors() {
			hic.invalidJmbg = false;
		}
		
		InsuranceProgress.setCurrent(4);
	}
	
})();