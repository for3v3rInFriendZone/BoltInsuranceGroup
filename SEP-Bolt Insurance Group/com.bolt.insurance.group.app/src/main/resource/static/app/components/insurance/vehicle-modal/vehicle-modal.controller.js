(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.vehicle-modal')
		.controller('VehicleModalController', VehicleModalController);

	VehicleModalController.$inject = ['$scope', '$uibModalInstance', 'Vehicle'];
	function VehicleModalController($scope, $uibModalInstance, Vehicle) {
		var pac = this;
		pac.ok = ok;
		pac.cancel = cancel;
		
		Vehicle.getList().then(function(vehicles){
			pac.vehicles = vehicles;
		});

		function ok() {
			$uibModalInstance.dismiss();
		}

		function cancel() {
			$uibModalInstance.dismiss();
		}
	}
})();