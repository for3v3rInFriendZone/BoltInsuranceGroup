(function() {
	'use strict';

	angular
		.module('bolt-insurance-group.insurance.home-modal')
		.factory('homeModal', homeModal);

	homeModal.$inject = ['$uibModal', 'Home'];
	function homeModal($uibModal, Home) {
		return {
			open: openHomeModal,
			edit: editHomeModal
		};

		function openHomeModal() {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/components/insurance/home-modal/home-modal.html',
				controller: 'HomeModalController',
				controllerAs: 'hmc',
				resolve: {
					items: function(){
						return {
							status: 'new'
						}
					}
				}
			});
			
			return modalInstance.result.then(function(home) {
				return home;
			});
		}
		
		function editHomeModal(home){
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/components/insurance/home-modal/home-modal.html',
				controller: 'HomeModalController',
				controllerAs: 'hmc',
				resolve: {
					items: function(){
						return {
							home: home,
							status: 'edit'
						}
					}
				}
			});
			
			return modalInstance.result.then(function(editHome) {
				return editHome;
			});
		}
	}
})();