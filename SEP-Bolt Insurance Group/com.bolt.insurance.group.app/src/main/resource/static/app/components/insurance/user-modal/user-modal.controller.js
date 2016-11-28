(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.user-modal')
		.controller('UserModalController', UserModalController);

	UserModalController.$inject = ['$uibModalInstance', 'items', 'User'];
	function UserModalController($uibModalInstance, items, User) {
		var umc = this;
		umc.ok = ok;
		umc.cancel = cancel;
		umc.editId = items.id;
		umc.status = items.status;
		
		/**
		 * This is because modal dialog is opened to insert new user OR to edit user.
		 * So it needs to know which operation is going to be.
		 */
		if(umc.editId === undefined){
			return;
		}
		User.get(umc.editId).then(function(data){
			umc.user = data;
		});
	
		
		function ok() {
			$uibModalInstance.close(umc.user);
		}

		function cancel() {
			$uibModalInstance.dismiss();
		}
	}
})();