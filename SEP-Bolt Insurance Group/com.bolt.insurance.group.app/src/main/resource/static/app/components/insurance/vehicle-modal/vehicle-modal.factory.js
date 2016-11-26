(function() {
	'use strict';

	angular
		.module('bolt-insurance-group.insurance.vehicle-modal')
		.factory('vehicleModal', vehicleModal);

	vehicleModal.$inject = ['$uibModal'];
	function vehicleModal($uibModal) {
		return {
			open: openVehicleModal
		};

		function openVehicleModal() {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/components/insurance/vehicle-modal/vehicle-modal.html',
				controller: 'VehicleModalController',
				controllerAs: 'vmc'
			});
		}
	}
})();