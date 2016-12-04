(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.vehicle-modal')
		.controller('VehicleInsuranceController', VehicleInsuranceController);

	VehicleInsuranceController.$inject = ['$scope'];
	function VehicleInsuranceController($scope) {
		console.log('USAO U VIC!');
	}
})();