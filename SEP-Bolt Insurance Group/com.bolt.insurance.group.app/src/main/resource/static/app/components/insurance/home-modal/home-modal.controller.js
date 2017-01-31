(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.home-modal')
		.controller('HomeInsuranceController', HomeInsuranceController);


	HomeInsuranceController.$inject = ['$http','$state', 'localStorageService', 'InsuranceProgress', '$crypto'];
	function HomeInsuranceController($http, $state, localStorageService, InsuranceProgress, $crypto) {
		
		var hic = this;
		hic.next = next;
		hic.removeErrors = removeErrors;
		hic.home = {};
		
		if(localStorageService.cookie.get('listOfUsers') == null || localStorageService.cookie.get('listOfUsers') == undefined || localStorageService.cookie.get('listOfUsers').length == 0) {
			alert('Your session has been timed out. You will be redirected to home page');
			localStorageService.cookie.clearAll();
			$state.go('home');
		}
		
		hic.roadCheckBox = localStorageService.cookie.get('roadCheckBox');
		hic.home.ownername = localStorageService.cookie.get('homeOwnerName');
		hic.home.ownersurname = localStorageService.cookie.get('homeOwnerSurname');
		
		if(localStorageService.cookie.get('homeOwnerJmbg') == null || localStorageService.cookie.get('homeOwnerJmbg') == undefined){
			hic.home.ownerjmbg = localStorageService.cookie.get('homeOwnerJmbg');
		} else{
			$http.get('https://localhost:8443/insurance/secret')
			.then(function(response) {
				hic.home.ownerjmbg = $crypto.decrypt(localStorageService.cookie.get('homeOwnerJmbg'), response.data.secret);
			});
		}
		
		hic.home.address = localStorageService.cookie.get('homeAdress');
		
		function next(){
			if(jmbgValidation(hic.home)) {
				return;
			}
			
			if(hic.form.$invalid) {
				hic.submitted = true;
				return;
			}
			
			$http.get('https://localhost:8443/insurance/secret')
			.then(function(response) {
				 localStorageService.cookie.set('homeOwnerJmbg', $crypto.encrypt(hic.home.ownerjmbg, response.data.secret), 1, true);
			});
			localStorageService.cookie.set('homeOwnerName', hic.home.ownername, 1, true);
			localStorageService.cookie.set('homeOwnerSurname', hic.home.ownersurname, 1, true);
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