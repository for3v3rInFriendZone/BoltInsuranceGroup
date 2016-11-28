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
				//return User.post(newUser);
				return newUser;
			});
		}
		
		function editUserModal(listOfUsers, userId){
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/components/insurance/user-modal/user-modal.html',
				controller: 'UserModalController',
				controllerAs: 'umc',
				resolve:{
					items: function(){
						return {
							id: userId,
							list: listOfUsers,
							status: 'edit'
						}
					}
				}
			});
			
			return modalInstance.result.then(function(editUser) {
				//return editUser.put();
				return editUser;
			});
		}
	}
})();