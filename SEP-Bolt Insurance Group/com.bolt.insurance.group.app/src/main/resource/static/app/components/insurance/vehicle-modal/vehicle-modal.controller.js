(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.vehicle-modal')
		.controller('VehicleModalController', VehicleModalController);

	VehicleModalController.$inject = ['$scope', '$uibModalInstance', 'items', 'Vehicle'];
	function VehicleModalController($scope, $uibModalInstance, items, Vehicle) {
		var vmc = this;
		vmc.ok = ok;
		vmc.cancel = cancel;
		vmc.vehicle = items.vehicle;
		vmc.status = items.status;
		
		Vehicle.getList().then(function(vehicles){
			vmc.vehicles = vehicles;
		});
		
		function ok() {
			$uibModalInstance.close(vmc.vehicle);
		}

		function cancel() {
			$uibModalInstance.dismiss();
		}
	}
})();