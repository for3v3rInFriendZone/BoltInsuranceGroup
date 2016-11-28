(function() {
	'use strict';

	angular
		.module('bolt-insurance-group.insurance.vehicle-modal')
		.factory('vehicleModal', vehicleModal);

	vehicleModal.$inject = ['$uibModal', 'Vehicle'];
	function vehicleModal($uibModal, Vehicle) {
		return {
			open: openVehicleModal,
			edit: editVehicleModal
		};

		function openVehicleModal() {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/components/insurance/vehicle-modal/vehicle-modal.html',
				controller: 'VehicleModalController',
				controllerAs: 'vmc',
				resolve: {
					items: function(){
						return {
							status: 'new'
						}
					}
				}
			});
			
			return modalInstance.result.then(function(vehicle) {
				return vehicle;
			});
		}
		
		function editVehicleModal(vehicle){
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/components/insurance/vehicle-modal/vehicle-modal.html',
				controller: 'VehicleModalController',
				controllerAs: 'vmc',
				resolve: {
					items: function(){
						return {
							vehicle: vehicle,
							status: 'edit'
						}
					}
				}
			});
			
			return modalInstance.result.then(function(editVehicle) {
				return editVehicle;
			});
		}
	}
})();