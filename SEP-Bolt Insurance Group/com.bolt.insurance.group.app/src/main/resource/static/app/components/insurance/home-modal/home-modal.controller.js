(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.home-modal')
		.controller('HomeModalController', HomeModalController);

	HomeModalController.$inject = ['$uibModalInstance'];
	function HomeModalController($uibModalInstance) {
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