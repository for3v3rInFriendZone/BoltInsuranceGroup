
(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.payment-response')
		.controller('PaymentResponseController', PaymentResponseController);


	PaymentResponseController.$inject = ['$http', '$scope', '$translate', 'localStorageService', '$crypto', 'PaymentFactory'];
	function PaymentResponseController($http, $scope, $translate, localStorageService, $crypto, PaymentFactory) {

		var prc = this;
		
		$scope.animateElementIn = function($el) {

			var animation = $el.attr('data-animation');

			// For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
			if (typeof animation !== typeof undefined && animation !== false) {
		    	$el.removeClass('not-visible');
		     	$el.addClass('animated '+animation);
			}	
  		};
		
  		$scope.newComment = function(){
  			commentModal.open().then(function(data){
  				$state.go('home');
  			});
  			
  		}

  		$scope.listOfUser = localStorageService.cookie.get('listOfUsers');
  		 
  		var myDataPromise = PaymentFactory.getKey();
  	    myDataPromise.then(function(result) {  
  	    	for(var i = 0; i < $scope.listOfUser.length; i++){
				$scope.listOfUser[i].jmbg = $crypto.decrypt($scope.listOfUser[i].jmbg, result);
				$scope.listOfUser[i].passport = $crypto.decrypt($scope.listOfUser[i].passport, result);
			}
  	    	
  	    	var payload = {
  	    		world: localStorageService.cookie.get('world'), 
  	  			money: localStorageService.cookie.get('money'),
  	  			kids: localStorageService.cookie.get('kids'),
  	  			grownups: localStorageService.cookie.get('grownups'),
  	  			olds: localStorageService.cookie.get('olds'),
  	  			dt1: localStorageService.cookie.get('date1'),
  	  			dt2: localStorageService.cookie.get('date2'),
  	  			sportCheckBox: localStorageService.cookie.get('sportCheckBox'),
  	  			selectedSport: localStorageService.cookie.get('selectedSport'),
  	  			homeCheckBox: localStorageService.cookie.get('homeCheckBox'),
  	  			roadCheckBox: localStorageService.cookie.get('roadCheckBox'),
  	  			towing: localStorageService.cookie.get('towingCheckBox'),
  	  			repair: localStorageService.cookie.get('repairCheckBox'),
  	  			hotel: localStorageService.cookie.get('hotelCheckBox'),
  	  			alternative: localStorageService.cookie.get('alternativeCheckBox'),
  	  			fire: localStorageService.cookie.get('fireCheckBox'),
  	  			flood: localStorageService.cookie.get('floodCheckBox'),
  	  			theft: localStorageService.cookie.get('theftCheckBox'),
  	  			earthshaker: localStorageService.cookie.get('earthshakerCheckBox'),
  	  			homearea: localStorageService.cookie.get('homeArea'),
  	  			ageofhome: localStorageService.cookie.get('ageOfHome'),
  	  			estimatedvalueofhome: localStorageService.cookie.get('estimatedValueOfHome'),
  	  			userList: $scope.listOfUser,
	  	  		amount: localStorageService.cookie.get('amount'),
	            homeOwnerName: localStorageService.cookie.get('homeOwnerName'),
	            homeOwnerSurname: localStorageService.cookie.get('homeOwnerSurname'),
	            homeOwnerJmbg: localStorageService.cookie.get('homeOwnerJmbg'),
	            homeAdress: localStorageService.cookie.get('homeAdress'),
	            vehicleOwnerName: localStorageService.cookie.get('vehicleOwnerName'),
	            vehicleOwnerSurname: localStorageService.cookie.get('vehicleOwnerSurname'),
	            vehicleOwnerJmbg: localStorageService.cookie.get('vehicleOwnerJmbg'),
	            vehicleType: localStorageService.cookie.get('vehicleType'),
	            vehicleYear: localStorageService.cookie.get('vehicleYear'),
	            vehiclePlates: localStorageService.cookie.get('vehiclePlates'),
	            vehicleChassis: localStorageService.cookie.get('vehicleChassis'),
	            vehicleOwnerAddress: localStorageService.cookie.get('ownerAddress'),
	            vehicleBrand: localStorageService.cookie.get('vehicleBrand'),
	            success: prc.success
  	  		}
	
    		$http.post('https://localhost:8443/insurance/', payload)
  	  		.then(function(response) {
  	  			localStorageService.cookie.clearAll();
  	  		});
  	    });
	}

})();