(function() {
	'use strict';

	angular
		.module('bolt-insurance-group.insurance.user-modal')
		.factory('userModal', userModal);

	userModal.$inject = ['$uibModal'];
	function userModal($uibModal) {
		return {
			open: openUserModal
		};

		function openUserModal() {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/components/insurance/user-modal/user-modal.html',
				controller: 'UserModalController',
				controllerAs: 'umc'
			});
		}
	}
})();