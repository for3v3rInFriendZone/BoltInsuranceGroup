(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.vehicle-modal')
		.controller('VehicleModalController', VehicleModalController);

	VehicleModalController.$inject = ['$uibModalInstance'];
	function VehicleModalController($uibModalInstance) {
		var pac = this;
		pac.ok = ok;
		pac.cancel = cancel;

		function ok() {
			$uibModalInstance.dismiss();
		}

		function cancel() {
			$uibModalInstance.dismiss();
		}
	}
})();