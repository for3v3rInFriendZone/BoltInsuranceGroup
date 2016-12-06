(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.total-price')
		.controller('TotalPriceController', TotalPriceController);

	TotalPriceController.$inject = ['$scope', '$translate', 'localStorageService', '$http', '$state'];
	function TotalPriceController($scope, $translate, localStorageService, $http, $state) {
		var tpc = this;

		var payload = {
				world: localStorageService.cookie.get('world'), 
				money: localStorageService.cookie.get('money'),
				kids: localStorageService.cookie.get('kids'),
				grownups: localStorageService.cookie.get('grownups'),
				olds: localStorageService.cookie.get('olds'),
				dt1: new Date(parseInt(localStorageService.cookie.get('date1'))),
				dt2: new Date(parseInt(localStorageService.cookie.get('date2'))),
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
				estimatedvalueofhome: localStorageService.cookie.get('estimatedValueOfHome')	
		}
		
		$http.post('https://localhost:8443/insurance/checkPrice',
				payload)
		.success(function(data, status, header){
			var aaa = data;
		});
		
		$scope.world = localStorageService.cookie.get('world');
		$scope.money = localStorageService.cookie.get('money');
		$scope.kids = localStorageService.cookie.get('kids');
		$scope.grownups = localStorageService.cookie.get('grownups');
		$scope.olds = localStorageService.cookie.get('olds');
		$scope.dt1 = new Date(parseInt(localStorageService.cookie.get('date1')));
		$scope.dt2 = new Date(parseInt(localStorageService.cookie.get('date2')));
		$scope.sportCheckBox = localStorageService.cookie.get('sportCheckBox');
		$scope.selectedSport = localStorageService.cookie.get('selectedSport');
		$scope.homeCheckBox = localStorageService.cookie.get('homeCheckBox');
		$scope.roadCheckBox = localStorageService.cookie.get('roadCheckBox');
		
		tpc.next = function() {
			$state.go('insurance-users');
		}
		
	}
})();