(function() {
	'use strict';

	angular
		.module('bolt-insurance-group.insurance.insurance_modal')
		.factory('insuranceModal', insuranceModal);

	insuranceModal.$inject = ['$uibModal'];
	function insuranceModal($uibModal) {
		return {
			open: openPlaceModal
		};

		function openPlaceModal() {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/components/insurance/insurance_modal/insurance_modal.html',
				controller: 'InsuranceModalController',
				controllerAs: 'imc'
			});
		}
	}
})();