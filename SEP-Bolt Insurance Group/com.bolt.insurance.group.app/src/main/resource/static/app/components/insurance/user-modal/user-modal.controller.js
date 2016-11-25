(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.user-modal')
		.controller('UserModalController', UserModalController);

	UserModalController.$inject = ['$uibModalInstance'];
	function UserModalController($uibModalInstance) {
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