(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.insurance_modal')
		.controller('InsuranceModalController', InsuranceModalController);

	InsuranceModalController.$inject = ['$uibModalInstance'];
	function InsuranceModalController($uibModalInstance) {
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