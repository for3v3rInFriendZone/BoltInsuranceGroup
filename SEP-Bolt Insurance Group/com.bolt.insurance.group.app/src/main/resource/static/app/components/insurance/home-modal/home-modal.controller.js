(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.home-modal')
		.controller('HomeModalController', HomeModalController);

	HomeModalController.$inject = ['$uibModalInstance', 'items', 'Home'];
	function HomeModalController($uibModalInstance, items, Home) {
		var hmc = this;
		hmc.ok = ok;
		hmc.cancel = cancel;
		hmc.home = items.home; 
		hmc.status = items.status;
		
		function ok() {
			$uibModalInstance.close(hmc.home);
		}

		function cancel() {
			console.log('USAO U CANCEL FUNKCIJU!');
			$uibModalInstance.dismiss();
		}
	}
})();