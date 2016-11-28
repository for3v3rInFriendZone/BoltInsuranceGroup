(function() {
	'use strict';

	angular
		.module('bolt-insurance-group.insurance.user-modal')
		.factory('userModal', userModal);

	userModal.$inject = ['$uibModal', 'User'];
	function userModal($uibModal, User) {
		return {
			open: openUserModal,
			edit: editUserModal
		};

		function openUserModal() {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/components/insurance/user-modal/user-modal.html',
				controller: 'UserModalController',
				controllerAs: 'umc',
				resolve:{
					items: function(){
						return {					
							status: 'new'
						}
					}
				}
			});
			
			return modalInstance.result.then(function(newUser) {
				return User.post(newUser);
			});
		}
		
		function editUserModal(userId){
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/components/insurance/user-modal/user-modal.html',
				controller: 'UserModalController',
				controllerAs: 'umc',
				resolve:{
					items: function(){
						return {
							id: userId,
							status: 'edit'
						}
					}
				}
			});
			
			return modalInstance.result.then(function(editUser) {
				return editUser.put();
			});
		}
	}
})();