(function() {
	'use strict';

	angular
		.module('bolt-insurance-group.insurance.home-modal')
		.factory('homeModal', homeModal);

	homeModal.$inject = ['$uibModal'];
	function homeModal($uibModal) {
		return {
			open: openHomeModal
		};

		function openHomeModal() {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/components/insurance/home-modal/home-modal.html',
				controller: 'HomeModalController',
				controllerAs: 'hmc'
			});
		}
	}
})();